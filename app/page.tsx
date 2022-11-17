import { Message } from '../typings';
import ChatInput from './ChatInput'
import MessageList from './MessageList'

async function page() {
	const data = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/getMessages`).then((res) => res.json());

	const messages: Message[] = data.messages;

	return (
		<div>
			<MessageList initialMessages={messages} />
			<ChatInput />
		</div>
	)
}

export default page