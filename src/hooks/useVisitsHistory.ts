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
    return { history, addToHistory, removeFromHistory }
}

export default useVisitsHistory
