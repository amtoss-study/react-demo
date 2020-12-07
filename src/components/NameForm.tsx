import React from "react";

type Props = {
  onSubmit: (nameValue: string) => void;
  initialValue?: string;
};

const NameForm = ({ onSubmit, initialValue = "" }: Props) => {
  const [nameValue, setNameValue] = React.useState(initialValue);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(nameValue);
    setNameValue("");
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <input name="name" value={nameValue} onChange={handleChange} />
      <button type="submit" disabled={!nameValue || nameValue === initialValue}>
        Submit
      </button>
    </form>
  );
};

export default NameForm;
