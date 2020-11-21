import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { HistoryItem } from './types'
import Nav from './Nav'
import NameForm from './NameForm'
import History from './History'

const App = () => {
    const [history, setHistory] = React.useState<HistoryItem[]>(JSON.parse(localStorage.getItem('history') || "[]"))
    const setHistoryPersistent = (newHistory: HistoryItem[]) => {
        setHistory(newHistory)
        localStorage.setItem('history', JSON.stringify(newHistory))
    }
    const addToHistory = (nameValue: string) => {
        setHistoryPersistent([...history, { name: nameValue, timestamp: Date.now() }])
    }
    const removeFromHistory = (timestamp: number) => {
        setHistoryPersistent(history.filter(item => item.timestamp !== timestamp))
    }
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path="/history">
                    <History history={history} removeFromHistory={removeFromHistory} />
                </Route>
                <Route path="/">
                    <NameForm onSubmit={addToHistory} />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
