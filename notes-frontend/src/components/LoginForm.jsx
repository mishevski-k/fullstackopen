const LoginForm = ({username, setUsername, password, setPassword, handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                username
                <input type='text' value={username} onChange={({target}) => setUsername(target.value)}></input>
            </div>
            <div>
                password
                <input type='password' value={password} onChange={({target}) => setPassword(target.value)}></input>
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm;