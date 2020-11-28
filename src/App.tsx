import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Nav from './components/Nav'
import NameForm from './components/NameForm'
import History from './components/History'
import useVisitsHistory from './hooks/useVisitsHistory';

const App = () => {
    const { history, addToHistory, removeFromHistory } = useVisitsHistory()
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
