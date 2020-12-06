import { useState, useCallback } from 'react'

import { HistoryItem } from '../types';
import { get, post, patch, del } from '../api'

const useVisitsHistory = () => {
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)

    const loadHistory = useCallback(() => {
        setIsLoading(true)
        setError(undefined)
        get("visits")
            .then(setHistory)
            .catch(setError)
            .finally(() => setIsLoading(false))
    }, [])

    const addToHistory = (nameValue: string) => {
        setIsLoading(true)
        setError(undefined)
        post("visits", { name: nameValue, timestamp: Date.now() })
            .then(data => {
                setHistory([...history, data])
            })
            .catch(setError)
            .finally(() => setIsLoading(false))
    }

    const removeFromHistory = (id: number) => {
        // Optimistic update
        setHistory(history.filter(item => item.id !== id))
        del(`visits/${id}`).catch(error => {
            setError(error)
            // Cancel update on error
            setHistory(history)
        })
    }

    const editHistoryItem = (id: number, nameValue: string) => {
        setIsLoading(true)
        setError(undefined)
        patch(`visits/${id}`, { name: nameValue })
            .then(data => {
                setHistory(history.map(item => {
                    if (item.id === id) {
                        return data
                    }
                    return item
                }))
            })
            .catch(setError)
            .finally(() => setIsLoading(false))
    }

    return { history, loadHistory, isLoading, error, addToHistory, removeFromHistory, editHistoryItem }
}

export default useVisitsHistory
