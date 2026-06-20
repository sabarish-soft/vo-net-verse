#!/usr/bin/env node
const puppeteer = require('puppeteer');
const { spawnSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'prototype', 'recordings');
fs.mkdirSync(OUT_DIR, { recursive: true });
const demoPath = path.join(__dirname, '..', 'prototype', 'demo.html');
const url = 'file://' + demoPath;

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(url);
  await page.waitForTimeout(500);

  // Start the demo on the page
  const playExists = await page.$('#play');
  if (playExists) await page.click('#play');

  const duration = 10; // seconds
  const fps = 15;
  const frames = duration * fps;

  // detect ffmpeg
  let hasFfmpeg = true;
  try {
    spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  } catch (e) {
    hasFfmpeg = false;
  }

  if (hasFfmpeg) {
    const mp4Path = path.join(OUT_DIR, 'demo.mp4');
    console.log('Recording to', mp4Path);
    const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-vcodec', 'png', '-r', String(fps), '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', mp4Path], { stdio: ['pipe', 'inherit', 'inherit'] });

    for (let i = 0; i < frames; i++) {
      const buf = await page.screenshot({ type: 'png' });
      ff.stdin.write(buf);
      await new Promise(r => setTimeout(r, 1000 / fps));
    }
    ff.stdin.end();
    await new Promise((resolve, reject) => ff.on('close', code => code === 0 ? resolve() : reject(new Error('ffmpeg exit ' + code))));
    console.log('Saved', mp4Path);

    // convert to gif
    const gifPath = path.join(OUT_DIR, 'demo.gif');
    console.log('Converting to gif', gifPath);
    spawnSync('ffmpeg', ['-y', '-i', mp4Path, '-vf', 'fps=15,scale=640:-1:flags=lanczos', gifPath], { stdio: 'inherit' });
    console.log('Saved', gifPath);
  } else {
    console.log('ffmpeg not found — saving frames to', OUT_DIR);
    for (let i = 0; i < frames; i++) {
      const buf = await page.screenshot({ type: 'png' });
      const fname = path.join(OUT_DIR, `frame_${String(i).padStart(4, '0')}.png`);
      fs.writeFileSync(fname, buf);
      await new Promise(r => setTimeout(r, 1000 / fps));
    }
    console.log('Frames saved. Use ffmpeg to assemble into a video or gif. Example:');
    console.log(`ffmpeg -framerate ${fps} -i frame_%04d.png -c:v libx264 -pix_fmt yuv420p demo.mp4`);
  }

  await browser.close();
  console.log('Done');
})().catch(err => { console.error(err); process.exit(1); });
