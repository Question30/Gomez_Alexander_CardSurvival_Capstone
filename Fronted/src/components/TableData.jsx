import React from "react";

function TableData({ score, username, index }) {
  return (
    <tr>
      <td className="border-2 border-slate-950">{index + 1}</td>
      <td className="border-2 border-slate-950">{username}</td>
      <td className="border-2 border-slate-950">{score}</td>
    </tr>
  );
}

export default TableData;
