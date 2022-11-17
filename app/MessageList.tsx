'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import { clientPusher } from '../pusher';
import { Message } from '../typings';
import fetcher from "../utils/fetchMessages";
import MessageComponent from './MessageComponent';

type Props = {
	initialMessages: Message[];
}

function MessageList({ initialMessages }: Props) {
	const { data: messages, error, mutate } = useSWR<Message[]>('/api/getMessages', fetcher);

	useEffect(() => {
		// console.log("channel", { clientPusher });
		const channel = clientPusher.subscribe('messages');

		channel.bind('new-message', async (data: Message) => {
			//if you sent the message, don't add it to the list
			if (messages?.find((message) => message.id === data.id)) return;

			if (!messages) {
				mutate(fetcher);
			} else {
				mutate(fetcher, {
					optimisticData: [...messages!, data],
					rollbackOnError: true,
				});
			}

		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		}
	}, [messages, mutate, clientPusher]);

	return (
		<div className='pb-32 space-y-5 px-5 pt-8 max-w-2xl xl:max-w-4xl mx-auto'>
			{(messages || initialMessages)?.map((message) => (
				<MessageComponent key={message?.id} message={message} />
			))}
		</div>
	)
}

export default MessageList