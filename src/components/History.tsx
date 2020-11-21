import React from 'react'

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
                            <span style={{ marginRight: '20px' }}>{dateStr} - {name}</span>
                            <button onClick={() => removeFromHistory(timestamp)}>x</button>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default History
