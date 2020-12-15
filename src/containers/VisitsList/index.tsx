import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NameForm from "components/NameForm";
import { getVisitDetailsLink } from "urls";
import { getVisits, getIsLoading, getError } from "./selectors";
import { loadVisits, addVisit, removeVisit } from "./slice";

const VisitsList = () => {
  const dispatch = useDispatch();
  const visits = useSelector(getVisits);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const dispatchLoadVisits = React.useCallback(() => {
    dispatch(loadVisits());
  }, [dispatch]);

  React.useEffect(() => {
    dispatchLoadVisits();
  }, [dispatchLoadVisits]);

  return (
    <div>
      <h3>What is your name?</h3>
      <NameForm
        onSubmit={(name: string) => {
          dispatch(addVisit(name));
        }}
      />
      <h3>History of visits</h3>
      <ol>
        {visits.map(({ id, timestamp, name }) => {
          const dateStr = new Date(timestamp).toLocaleString();
          return (
            <li key={id}>
              <Link to={getVisitDetailsLink(id)}>
                {dateStr} - {name}
              </Link>
              <button
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  dispatch(removeVisit(id));
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ol>
      {visits.length === 0 && !isLoading && <p>No visits yet</p>}
      {!isLoading && (
        <button onClick={dispatchLoadVisits}>Reload history</button>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VisitsList;
