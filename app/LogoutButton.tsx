"use client"

function LogoutButton() {
	return (
		<button
			onClick={() => console.log("Sign out clicked!!!!!!!")}
			className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
		>
			Sign out
		</button>
	)
}

export default LogoutButton