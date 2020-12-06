import { useState, useCallback } from 'react'

import { HistoryItem } from '../types';
import { get, post, patch, del } from '../api'

const useVisitsHistory = () => {
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const loadHistory = useCallback(() => {
        setIsLoading(true)
        get("visits").then(data => {
            setHistory(data)
            setIsLoading(false)
        })
    }, [])

    const addToHistory = (nameValue: string) => {
        setIsLoading(true)
        post("visits", { name: nameValue, timestamp: Date.now() })
            .then(data => {
                setHistory([...history, data])
                setIsLoading(false)
            })
    }

    const removeFromHistory = (id: number) => {
        del(`visits/${id}`).then(() => setHistory(history.filter(item => item.id !== id)))
    }

    const editHistoryItem = (id: number, nameValue: string) => {
        setIsLoading(true)
        patch(`visits/${id}`, { name: nameValue })
            .then(data => {
                setHistory(history.map(item => {
                    if (item.id === id) {
                        return data
                    }
                    return item
                }))
                setIsLoading(false)
            })
    }

    return { history, loadHistory, isLoading, addToHistory, removeFromHistory, editHistoryItem }
}

export default useVisitsHistory
