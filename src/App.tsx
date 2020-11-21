import React from 'react'

import { HistoryItem } from './types'
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
        <React.Fragment>
            <NameForm onSubmit={addToHistory} />
            <History history={history} removeFromHistory={removeFromHistory} />
        </React.Fragment>
    )
}

export default App
