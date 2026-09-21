# Manipur Tourism — Stitch-faithful MERN conversion

This project preserves the supplied Stitch design's palette, typography, layout, imagery, cards, booking console, ILP panel, flight radar, handloom section, dispatch card, header and footer.

The original static booking tabs were converted into real React state-driven tabs while retaining their visual design.

## Run

### Client
cd client
npm install
npm run dev

Open http://localhost:5173

### Server
Open another terminal:
cd server
npm install
copy .env.example to .env
npm run dev

API health: http://localhost:5000/api/health

## Architecture
client/ = React + Vite + Tailwind
server/ = Node + Express + Mongoose
MongoDB is accessed only by the server.
