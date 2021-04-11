import React from "react";
import { IconContext } from "react-icons";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const TableBody = ({ notes, onDelete, onUpdate }) => (
  <IconContext.Provider value={{ size: "1.5rem" }}>
    <tbody>
      {notes.map((note) => (
        <tr key={note._id}>
          <td>{note.date}</td>
          <td>{note.status}</td>
          <td>{note.topic}</td>
          <td>{note.note}</td>
          <td>
            <button
              onClick={() => onDelete(note._id)}
              type="button"
              className="btn btn-danger"
            >
              <MdDelete />
            </button>
          </td>
          <td>
            <button
              onClick={() => onUpdate(note)}
              type="button"
              className="btn btn-warning"
              style={{ color: "white" }}
            >
              <AiFillEdit />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </IconContext.Provider>
);

export default TableBody;
