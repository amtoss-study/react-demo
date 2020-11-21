const App = () => {
    const [history, setHistory] = React.useState(JSON.parse(localStorage.getItem('history')) || [])
    const setHistoryPersistent = newHistory => {
        setHistory(newHistory)
        localStorage.setItem('history', JSON.stringify(newHistory))
    }
    const addToHistory = nameValue => {
        setHistoryPersistent([...history, { name: nameValue, timestamp: Date.now() }])
    }
    const removeFromHistory = timestamp => {
        setHistoryPersistent(history.filter(item => item.timestamp !== timestamp))
    }
    return (
        <React.Fragment>
            <NameForm onSubmit={addToHistory} />
            <History history={history} removeFromHistory={removeFromHistory} />
        </React.Fragment>
    )
}

const NameForm = ({ onSubmit }) => {
    const [nameValue, setNameValue] = React.useState("")
    const handleSubmit = event => {
        event.preventDefault()
        onSubmit(nameValue)
        setNameValue("")
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

const History = ({ history, removeFromHistory }) => {
    return (
        <div>
            <h3>History of visits</h3>
            <ol>
                {history.map(({ timestamp, name }) => {
                    const dateStr = new Date(timestamp).toLocaleString()
                    return (
                        <li key={timestamp}>
                            <span style={{ marginRight: '20px' }}>{dateStr} - {name}</span>
                            <button onClick={() => removeFromHistory(timestamp)}>x</button>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("react-root"))
