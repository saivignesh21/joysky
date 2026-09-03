# JoySky

JoySky is a stranger-chat application with interest-based matching, real-time messaging, and browser video chat.

## Features

- Interest-based stranger matching
- Real-time text chat with Socket.IO
- WebRTC video signaling with `simple-peer`
- Local camera preview
- Responsive React interface

## Repository structure

```text
joysky/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── socket/
├── .gitignore
└── README.md
```

## Requirements

- Node.js 18 or newer
- npm
- A browser with camera and microphone permissions

## Run locally

Install dependencies in both applications:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Start the backend in one terminal:

```bash
cd backend
npm start
```

The backend listens on `http://localhost:5000`.

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in two browser windows to test matching and video chat. Allow camera and microphone access when prompted. Video calls require both peers to be connected through the signaling server; production deployments should use HTTPS.

## Available scripts

### Frontend

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview a production build |

### Backend

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Socket.IO server |

## Verify changes locally

Run the frontend checks before opening a pull request:

```bash
cd frontend
npm run lint
npm run build
```

To test matching and chat manually, start the backend and frontend, then open the frontend URL in two separate browser windows. Use different browser profiles if camera permissions or existing Socket.IO sessions interfere with the test.

## Development notes

- The frontend currently connects to `http://localhost:5000` from `frontend/src/socket/socket.js`.
- Authentication, reporting, translation, and moderation are planned features and are not implemented yet.
- Do not commit `node_modules`, build output, local environment files, or logs.

## Contributing

Create a focused branch, keep changes scoped, run the relevant frontend checks, and open a pull request with a clear description.
