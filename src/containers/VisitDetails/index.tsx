import React from "react";
import { useSelector, useDispatch } from "react-redux";

import NameForm from "components/NameForm";
import { loadVisit, editVisit } from "./slice";
import { getVisitId, getVisit, getIsLoading, getError } from "./selectors";

const VisitDetails = () => {
  const dispatch = useDispatch();
  const visitId = useSelector(getVisitId);
  const visit = useSelector(getVisit);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const [isEditing, setEditing] = React.useState(false);

  React.useEffect(() => {
    if (visitId) {
      dispatch(loadVisit(visitId));
    }
  }, [dispatch, visitId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (visit === undefined) {
    return <p>Visit not found</p>;
  }
  const { id, timestamp, name } = visit;
  const onEdit = (nameValue: string) => {
    dispatch(editVisit(id, nameValue));
    setEditing(false);
  };
  return (
    <div>
      <p>{new Date(timestamp).toLocaleString()}</p>
      {isEditing && <NameForm initialValue={name} onSubmit={onEdit} />}
      {!isEditing && (
        <>
          <p>{name}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VisitDetails;
