import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NameForm from "components/NameForm";
import { getVisitById } from "containers/Entities/Visits/selectors";
import { State } from "store";
import { loadVisit, editVisit } from "./slice";
import { getIsLoading, getError } from "./selectors";

const VisitDetails = () => {
  const dispatch = useDispatch();
  const { visitId } = useParams<{ visitId?: string }>();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const visit = useSelector((state: State) =>
    getVisitById(state, Number(visitId))
  );
  const [isEditing, setEditing] = React.useState(false);

  React.useEffect(() => {
    if (visitId) {
      dispatch(loadVisit(Number(visitId)));
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
