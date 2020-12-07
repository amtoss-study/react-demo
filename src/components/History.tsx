import React from "react";
import { Link } from "react-router-dom";

import { HistoryItem } from "../types";

type Props = {
  history: HistoryItem[];
  loadHistory: () => void;
  isLoading: boolean;
  removeFromHistory: (timestamp: number) => void;
  error?: string;
};

const History = ({
  history,
  loadHistory,
  isLoading,
  removeFromHistory,
  error,
}: Props) => {
  return (
    <div>
      <h3>History of visits</h3>
      <ol>
        {history.map(({ id, timestamp, name }) => {
          const dateStr = new Date(timestamp).toLocaleString();
          return (
            <li key={id}>
              <Link to={`/visits/${id}`}>
                {dateStr} - {name}
              </Link>
              <button
                style={{ marginLeft: "20px" }}
                onClick={() => removeFromHistory(id)}
              >
                x
              </button>
            </li>
          );
        })}
      </ol>
      {history.length === 0 && !isLoading && <p>No visits yet</p>}
      {!isLoading && <button onClick={loadHistory}>Reload history</button>}
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default History;
