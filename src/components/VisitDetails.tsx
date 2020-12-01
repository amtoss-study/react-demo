import React from 'react'
import { useParams } from 'react-router-dom'

import NameForm from './NameForm'
import { HistoryItem } from '../types'

type Props = {
    history: HistoryItem[],
    editHistoryItem: (timestamp: number, nameValue: string) => void
}

const VisitDetails = ({ history, editHistoryItem }: Props) => {
    const [isEditing, setEditing] = React.useState(false)
    const { visitId } = useParams<{ visitId?: string }>()
    const visit = history.find(item => item.timestamp.toString() === visitId)
    if (visit === undefined) {
        return <p>Visit not found</p>
    }
    const { timestamp, name } = visit
    const onEdit = (nameValue: string) => {
        editHistoryItem(timestamp, nameValue)
        setEditing(false)
    }
    return (
        <div>
            <p>{new Date(timestamp).toLocaleString()}</p>
            {isEditing && (
                <NameForm initialValue={name} onSubmit={onEdit} />
            )}
            {!isEditing && (
                <>
                    <p>{name}</p>
                    <button onClick={() => setEditing(true)}>Edit</button>
                </>
            )}
        </div>
    )
}

export default VisitDetails
