import React from 'react'
import { Link } from 'react-router-dom'

import { HistoryItem } from '../types'

type Props = {
    history: HistoryItem[]
    removeFromHistory: (timestamp: number) => void
}

const History = ({ history, removeFromHistory }: Props) => {
    return (
        <div>
            <h3>History of visits</h3>
            <ol>
                {history.map(({ timestamp, name }) => {
                    const dateStr = new Date(timestamp).toLocaleString()
                    return (
                        <li key={timestamp}>
                            <Link to={`/visits/${timestamp}`}>{dateStr} - {name}</Link>
                            <button
                                style={{ marginLeft: '20px' }}
                                onClick={() => removeFromHistory(timestamp)}
                            >
                                x
                            </button>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default History
