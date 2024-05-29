'use client';

import WebSocketComponent from '../../components/Websocket';

export default function Home() {
    return (
        <div>
            <h1>Next.js WebSocket Client</h1>
            <WebSocketComponent room={1} />
        </div>
    );
}