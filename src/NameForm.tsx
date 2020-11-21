import React from 'react'

type Props = {
    onSubmit: (nameValue: string) => void
}

const NameForm = ({ onSubmit }: Props) => {
    const [nameValue, setNameValue] = React.useState("")
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(nameValue)
        setNameValue("")
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value)
    }
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <h3>What is your name?</h3>
            <input name="name" value={nameValue} onChange={handleChange} />
            <p>Current value: { nameValue }</p>
            <button type="submit">Submit</button>
        </form>
    )
}

export default NameForm
