'use client'

import { FormEvent, useState } from "react";
import { v4 as uuid } from 'uuid';
import { Message } from "../typings";
import useSWR from 'swr';
import fetcher from "../utils/fetchMessages";

function ChatInput() {
	const [input, setInput] = useState('');
	const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

	// console.log("messages", { messages });

	const addMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!input) return;

		const messageToSend = input;

		setInput('');

		// console.log("Access to input!!!!", { messageToSend, input });
		const id = uuid();

		const message: Message = {
			id,
			message: messageToSend,
			created_at: Date.now(),
			username: 'Lara Croft',
			profilePic: 'https://i.pravatar.cc/150?img=32',
			email: 'lara@croft.com',
		};

		const uploadMessageToUpstash = async () => {
			const data = await fetch('/api/addMessage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',

				},
				body: JSON.stringify({
					message
				}),
			}).then((res) => res.json());

			return [...messages!, data.message];
		};

		await mutate(uploadMessageToUpstash, {
			optimisticData: [...messages!, message],
			rollbackOnError: true,
		});
	};

	return (
		<form onSubmit={addMessage} className='flex w-full bg-white fixed bottom-0 z-50 px-10 py-5 space-x-2 border-t border-gray-100'>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Type a message..."
				className='flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed'
			/>
			<button
				type="submit"
				disabled={!input}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'
			>
				Send
			</button>
		</form>
	)
}

export default ChatInput