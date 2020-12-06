import React from 'react'
import { Link } from 'react-router-dom'

import { HistoryItem } from '../types'

type Props = {
    history: HistoryItem[]
    loadHistory: () => void
    removeFromHistory: (timestamp: number) => void
}

const History = ({ history, loadHistory, removeFromHistory }: Props) => {
    return (
        <div>
            <h3>History of visits</h3>
            <ol>
                {history.map(({ id, timestamp, name }) => {
                    const dateStr = new Date(timestamp).toLocaleString()
                    return (
                        <li key={id}>
                            <Link to={`/visits/${id}`}>{dateStr} - {name}</Link>
                            <button
                                style={{ marginLeft: '20px' }}
                                onClick={() => removeFromHistory(id)}
                            >
                                x
                            </button>
                        </li>
                    )
                })}
            </ol>
            <button onClick={loadHistory}>Reload history</button>
        </div>
    )
}

export default History
