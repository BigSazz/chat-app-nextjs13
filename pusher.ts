import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
	appId: process.env.PUSHER_NODE_APP_ID!,
	key: process.env.PUSHER_NODE_KEY!,
	secret: process.env.PUSHER_NODE_SECRET!,
	cluster: "mt1",
	useTLS: true
});

export const clientPusher = new ClientPusher('08cdc53ab15d056baf71', {
	cluster: 'mt1'
});