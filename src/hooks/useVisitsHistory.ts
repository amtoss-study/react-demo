import { useState, useCallback } from 'react'

import { HistoryItem } from '../types';
import { get, post, patch, del } from '../api'

const useVisitsHistory = () => {
    const [history, setHistory] = useState<HistoryItem[]>([])

    const loadHistory = useCallback(() => get("visits").then(data => setHistory(data)), [])

    const addToHistory = (nameValue: string) => {
        post("visits", { name: nameValue, timestamp: Date.now() })
            .then(data => setHistory([...history, data]))
    }

    const removeFromHistory = (id: number) => {
        del(`visits/${id}`).then(() => setHistory(history.filter(item => item.id !== id)))
    }

    const editHistoryItem = (id: number, nameValue: string) => {
        patch(`visits/${id}`, { name: nameValue })
            .then(data => setHistory(history.map(item => {
                if (item.id === id) {
                    return data
                }
                return item
            })))
    }

    return { history, loadHistory, addToHistory, removeFromHistory, editHistoryItem }
}

export default useVisitsHistory
