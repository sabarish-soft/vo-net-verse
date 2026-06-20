# Von Neumann: Rise of the Network

A galactic civilization-building design inspired by Bobiverse, Rise of Nations, Dyson Sphere Program, and Civilization. Players guide a single probe into a galaxy-spanning network through exploration, expansion, resource management, technological advancement, and self-replication.

## Key Concepts
- Exploration, Expansion, Resource Management, Research, Self-replication
- Territorial influence and system specialization (Mining, Research, Industrial, Energy, Logistics)
- Age progression (Pioneer → Transcendence) unlocking new capabilities
- Trade networks and logistics instead of military combat
- Compute Capacity as a citizen-equivalent resource

## Features
- Galactic Ages with distinct goals and unlocks
- Matter, Energy, and Knowledge as core resources
- System specialization and infrastructure (factories, data centers, relays)
- Wonders (Dyson Swarm, Replication Nexus, Galactic Archive, etc.)
- Strategic rare resources and long-term megaprojects

## Installation / Getting Started
This repository currently contains the game concept and design notes. A playable build or engine-specific source may be added later. To get started contributing or to run a prototype (when available):

1. Clone the repository

```bash
git clone https://github.com/sabarish-soft/vo-net-verse.git
cd vo-net-verse
```

2. Check the project root for an engine or prototype folder (e.g., `Unity/`, `Godot/`, `prototype/`) and follow that folder's README for build/run instructions.

3. If no prototype exists yet, see the `GAME_CONCEPT.md` for design guidance and open an issue or feature request to propose an implementation.

## How to Play (Conceptual)
The goal is to grow from a single probe into a resilient, highly productive network across the galaxy by balancing expansion, logistics, and research.

- Start in the Pioneer Age: build basic probes, mine local systems, and colonize nearby stars.
- Specialize systems: assign worlds as Mining, Research, Industrial, Energy, or Logistics to optimize the network.
- Manage three core resources:
	- Matter: builds structures, probes, and habitats.
	- Energy: harvested from stars; required for manufacturing and megastructures.
	- Knowledge: produced by research centers to advance Ages and unlock technologies.
- Build and maintain trade routes to move resources efficiently; poor connectivity reduces output.
- Pursue Wonders (one at a time) to gain long-term bonuses and further strategic goals.
- Monitor Compute Capacity to ensure your AI network can manage the growing civilization.

Victory paths (conceptual):
- Economic/Production dominance via Dyson Swarms and megafactories.
- Technological transcendence by building the Consciousness Repository and networked AI achievements.

## Developer Notes
- See `GAME_CONCEPT.md` for detailed systems and progression plans.
- Suggested early prototype scope: procedural starfield, probe entities, basic mining, and simple logistics.
- Contributions welcome: open issues, propose systems, or submit PRs for prototypes.

## License
TBD — add a license when the project moves beyond concept stage.

---

For the full design, read [GAME_CONCEPT.md](GAME_CONCEPT.md).

## Prototype: Quick QA and Demo
I added a minimal browser prototype to demonstrate core systems and a scripted demo for recording.

- Prototype files: [prototype/index.html](prototype/index.html) and [prototype/demo.html](prototype/demo.html)
- State persistence: localStorage key `von_state_v1` (save/load from the UI).

How to run locally:

```bash
# from repository root
python3 -m http.server 8000 --directory prototype
# then open http://localhost:8000/index.html or demo.html in your browser
```

Recording a demo GIF (suggested):

- Use the `demo.html` scripted page and a screen recorder (Peek on Linux) or `ffmpeg`.
- Example `ffmpeg` workflow (adjust display/region):

```bash
# record a 10s mp4 of your desktop (change display and geometry as needed)
ffmpeg -video_size 1280x720 -framerate 15 -f x11grab -i :0.0 -t 10 demo.mp4
# convert to gif
ffmpeg -i demo.mp4 -vf "fps=15,scale=640:-1:flags=lanczos" -loop 0 demo.gif
```

Notes: If you prefer a single-step GIF recorder, use an OS tool (Peek on Linux) or a browser extension that records tabs to GIF. If you'd like, I can add an example `docker` or `node` script that runs a headless browser and produces a GIF automatically.

Automated headless recorder

I added a Node-based recorder that runs the scripted demo headlessly and produces an MP4 (and GIF, if `ffmpeg` is installed).

1. Install dependencies:

```bash
cd vo-net-verse
npm install
```

2. Run the recorder:

```bash
npm run record
```

Output is written to `prototype/recordings/` (files: `demo.mp4`, `demo.gif` or `frame_*.png` if `ffmpeg` is missing).

If `npm install` fails due to network or environment restrictions, you can still run `demo.html` locally via the manual `python3 -m http.server` method above and record with your preferred screen capture tool.

## GitHub Pages
You can publish the demo using GitHub Pages by serving the `docs/` folder from the `main` branch. I added the prototype files to `docs/` so Pages can serve them directly.

- Files served: `docs/index.html` and `docs/demo.html`
- A `.nojekyll` file is included to avoid Jekyll processing.

Expected Pages URL (after enabling Pages in repository Settings):

https://sabarish-soft.github.io/vo-net-verse/

Visit `/demo.html` to load the scripted demo: `https://sabarish-soft.github.io/vo-net-verse/demo.html`
