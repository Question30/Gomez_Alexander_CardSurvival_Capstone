import React from "react";
import TableData from "./TableData";

function Leaderboard({ heading, colNames, scores }) {
  return (
    <table className="w-3/4 border-2 border-collapse border-slate-950">
      <tr>
        <th className="bg-gray-300 border-2 border-slate-950" colspan="3">
          {heading}
        </th>
      </tr>
      <tr>
        {colNames.map((name) => (
          <td className="border-2 border-slate-950">{name}</td>
        ))}
      </tr>
      {scores.map((score, index) => (
        <>
          <TableData score={score} index={index} />
        </>
      ))}
    </table>
  );
}

export default Leaderboard;
