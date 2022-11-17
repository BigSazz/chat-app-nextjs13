import Image from 'next/image';
import { Message } from '../typings';

type Props = {
	message: Message;
}

function MessageComponent({ message }: Props) {
	const isUser = true;

	return (
		<div className={`flex w-fit ${isUser && "ml-auto"}`}>
			<div className={`flex-shrink-0 ${isUser && "order-2"}`}>
				<Image
					src={message?.profilePic}
					alt="profile picture"
					width={50}
					height={10}
					className="rounded-full mx-2"
				/>
			</div>

			<div>
				<p className={`text-[0.65rem] px-[2px] pb-[2px] font-semibold ${isUser ? 'text-violet-500 text-right' : 'text-blue-500 text-left'}`}>{message?.username}</p>
				<div className='flex items-end'>
					<div className={`px-3 py-2 rounded-lg w-fit text-white ${isUser ? 'bg-violet-400 ml-auto order-2' : 'bg-blue-400'}`}>
						<p className="text-sm">{message?.message}</p>
					</div>

					<p className={`text-[0.65rem] italic px-2 text-gray-300 ${isUser && 'text-right'}`}>{new Date(message?.created_at).toLocaleString()}</p>
				</div>
			</div>
		</div>
	)
}

export default MessageComponent