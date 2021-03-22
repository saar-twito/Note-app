import React from "react";
import TableHeader from "./NoteTable/tableHeader";
import TableBody from "./NoteTable/tableBody";
import Sort from "./sort";

const noteList = ({
  sortedNotes,
  statuses,
  filters,
  onUpdate,
  onDelete,
  onSort,
}) => {
  return (
    <>
      <Sort statuses={statuses} filters={filters} onSort={onSort} />
      <table className="table table-striped table-borderless table-active table-hover container mt-2">
        <TableHeader />
        <TableBody
          onUpdate={onUpdate}
          onDelete={onDelete}
          notes={sortedNotes}
        />
      </table>
    </>
  );
};

export default React.memo(noteList);
