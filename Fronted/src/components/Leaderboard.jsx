import React from "react";
import TableData from "./TableData";

function Leaderboard({ heading, colNames, scores }) {
  return (
    <table className="w-3/4 border-2 border-collapse border-slate-950">
      <thead>
        <tr>
          <th className="bg-gray-300 border-2 border-slate-950" colSpan="3">
            {heading}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {colNames.map((name, index) => (
            <td key={index} className="border-2 border-slate-950">
              {name}
            </td>
          ))}
        </tr>
        {scores.map((score, index) => (
          <TableData score={score} index={index} key={index} />
        ))}
      </tbody>
    </table>
  );
}

export default Leaderboard;
