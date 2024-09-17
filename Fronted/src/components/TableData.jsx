import React from "react";

function TableData({ score, index }) {
  return (
    <tr>
      <td className="border-2 border-slate-950">{index + 1}</td>
      {Object.keys(score).map((key, index) => (
        <td key={index} className="border-2 border-slate-950">
          {score[key]}
        </td>
      ))}
    </tr>
  );
}

export default TableData;
