'use client';

import WebSocketComponent from '../../../components/Websocket';
import { useEffect, useState } from 'react';

export default function WebsocketPage({ params, searchParams }) {
    const id = params.id
    const [roomId, setRoomId] = useState<number | null>(null);

    useEffect(() => {
        if (id && !isNaN(Number(id))) {
            setRoomId(Number(id));
        } else {
            console.error("ID is not a valid number");
        }
    }, [id]);

    return (
        <div>
            <h1>Next.js WebSocket Client</h1>
            <WebSocketComponent room={roomId} />
        </div>
    );
};