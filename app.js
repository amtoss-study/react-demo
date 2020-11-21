const App = () => {
    const [name, setName] = React.useState("")
    return (
        <React.Fragment>
            <NameForm setName={setName} />
            <Greeting name={name} />
        </React.Fragment>
    )
}

const NameForm = ({ setName }) => {
    const [nameValue, setNameValue] = React.useState("")
    const handleSubmit = event => {
        event.preventDefault()
        setName(nameValue)
    }
    const handleChange = event => {
        setNameValue(event.target.value)
    }
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <h3>What is your name?</h3>
            <input name="name" value={nameValue} onChange={handleChange} />
            <p>Current value: { nameValue }</p>
            <button type="submit">Submit</button>
        </form>
    )
}

const Greeting = ({ name }) => <p>Hello { name }</p>

ReactDOM.render(<App />, document.getElementById("react-root"))
