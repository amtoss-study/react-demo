import { useState } from 'react'

import { HistoryItem } from '../types';

const useVisitsHistory = () => {
    const [history, setHistory] = useState<HistoryItem[]>(JSON.parse(localStorage.getItem('history') || "[]"))
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
    const editHistoryItem = (timestamp: number, nameValue: string) => {
        setHistoryPersistent(history.map(item => {
            if (item.timestamp === timestamp) {
                return { timestamp, name: nameValue }
            }
            return item
        }))
    }
    return { history, addToHistory, removeFromHistory, editHistoryItem }
}

export default useVisitsHistory
