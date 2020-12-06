import { useState, useCallback } from 'react'

import { HistoryItem } from '../types';
import { get, post, patch, del } from '../api'

const useVisitsHistory = () => {
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)

    const loadHistory = useCallback(async () => {
        setIsLoading(true)
        setError(undefined)
        try {
            const data = await get("visits")
            setHistory(data)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const addToHistory = async (nameValue: string) => {
        setIsLoading(true)
        setError(undefined)

        try {
            const data = await post("visits", { name: nameValue, timestamp: Date.now() })
            setHistory([...history, data])
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const removeFromHistory = (id: number) => {
        // Optimistic update
        setHistory(history.filter(item => item.id !== id))
        try {
            del(`visits/${id}`)
        } catch (error) {
            setError(error)
            // Cancel update on error
            setHistory(history)
        }
    }

    const editHistoryItem = async (id: number, nameValue: string) => {
        setIsLoading(true)
        setError(undefined)
        try {
            const data = await patch(`visits/${id}`, { name: nameValue })
            setHistory(history.map(item => item.id === id ? data : item))
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { history, loadHistory, isLoading, error, addToHistory, removeFromHistory, editHistoryItem }
}

export default useVisitsHistory
