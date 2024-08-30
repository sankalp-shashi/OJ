const RegisterBox = (props) => {
    return (
        <div id = "RegisterBox" className = "p-19 justify-center items-center flex flex-col space-y-4">
            <input
                type="text"
                className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Username"
                value={props.username}
                onChange={(e) => props.setUsername(e.target.value)}
                onKeyDown={(e) => {if (e.key === 'Enter') props.emailRef.current.focus();}} // Change focus to email on enter
            />
            <input
                ref={props.emailRef} // Attach ref to the email input
                type="email"
                className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Email"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
                onKeyDown={(e) => {if (e.key === 'Enter') props.passwordRef.current.focus();}} // Change focus to password on enter
            />
            <input
                ref={props.passwordRef} // Attach ref to the password input
                type="password"
                className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Password"
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
            />
            <div>
                <button
                className="mx-5 bg-indigo-600 text-white rounded-md px-4 py-2 mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onClick={() => props.onRegisterButtonClick(false)}
                >
                Sign Up as a User
                </button>
                <button
                className="ml-5 bg-indigo-600 text-white rounded-md px-4 py-2 mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onClick={() => props.onRegisterButtonClick(true)}
                >
                Sign Up as an Admin
                </button>
            </div>
            {props.error && <div className="text-red-500 mt-4">{props.error}</div>}
        </div>
    )
}
export default RegisterBox;