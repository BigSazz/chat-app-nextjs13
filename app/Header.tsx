import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton';

function Header() {
	const session = true;

	return (
		<header className={`${session ? "justify-between" : "justify-center"} sticky top-0 z-50 bg-white flex items-center p-10 shadow-sm`}>
			{session ? (
				<>
					<div className='flex space-x-2'>
						<Image
							src='https://links.papareact.com/5me'
							width={50}
							height={50}
							className='rounded-ful mx-2 object-contain'
							alt='profile'
						/>

						<div>
							<p className='text-blue-400'>Logged in as:</p>
							<p className='font-bold text-lg'>Osaze Oviawe</p>
						</div>
					</div>

					<LogoutButton />
				</>
			) : (
				<div className='flex flex-col items-center space-y-5'>
					<div className='flex space-x-2 items-center'>
						<Image
							src="https://links.papareact.com/jne"
							alt="logo"
							height={10}
							width={50}
						/>

						<p className='text-blue-400'>Welcome to Meta Messenger</p>
					</div>

					<Link href='/auth/signin' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Sign In</Link>
				</div>
			)}
		</header>
	)
}

export default Header