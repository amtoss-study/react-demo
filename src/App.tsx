import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Nav from './components/Nav'
import NameForm from './components/NameForm'
import History from './components/History'
import VisitDetails from './components/VisitDetails';
import useVisitsHistory from './hooks/useVisitsHistory';

const App = () => {
    const { history, loadHistory, isLoading, addToHistory, removeFromHistory, editHistoryItem } = useVisitsHistory()
    React.useEffect(() => {
        loadHistory()
    }, [loadHistory])
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path="/visits/:visitId">
                    <VisitDetails history={history} editHistoryItem={editHistoryItem} isLoading={isLoading} />
                </Route>
                <Route path="/">
                    <h3>What is your name?</h3>
                    <NameForm onSubmit={addToHistory} />
                    <History
                        history={history}
                        loadHistory={loadHistory}
                        isLoading={isLoading}
                        removeFromHistory={removeFromHistory}
                    />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
