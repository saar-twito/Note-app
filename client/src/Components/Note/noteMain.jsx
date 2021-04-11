// Imports
import React from "react";
import Joi from "joi-browser";
import NoteForm from "./noteForm";
import NoteList from "./NoteList";
import { getStatuses } from "../../service/status";
import http from "../../service/note";
import _ from "lodash";

// Style
import { BsFillPersonFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { AiOutlineSend } from "react-icons/ai";
import "../Forms/style.css";

class NoteMain extends NoteForm {
  state = {
    statuses: [],
    filters: [],
    originalNotes: [],
    data: { status: "", topic: "", note: "" },
    errors: {},
    selectedFilter: "All",
    sortedNotes: [],
  };

  schema = {
    status: Joi.string().required().label("Status"),
    topic: Joi.string().max(20).required().label("Topic"),
    note: Joi.string().max(100).required().label("Note"),
  };

  async componentDidMount() {
    let { sortedNotes, filters } = this.state;
    try {
      const { data: statuses } = await getStatuses();
      const { data: originalNotes } = await http.getNotes();
      sortedNotes = [...originalNotes];
      filters = this.prepareFilters(statuses);

      this.setState({ statuses, originalNotes, sortedNotes, filters });
    } catch (ex) {
      toast.error(ex.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }
  }

  handleDelete = async (noteId) => {
    let { originalNotes, sortedNotes } = this.state;
    sortedNotes = originalNotes.filter((note) => note._id !== noteId);
    this.setState({ sortedNotes });

    try {
      await http.deleteNote(noteId);
      this.synchronizeOriginalAndSortedNotes(sortedNotes);
    } catch (ex) {
      toast.warn(ex.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
      this.setState({ sortedNotes: originalNotes });
    }
  };

  handleUpdate = async (givenNote) => {
    let { data, originalNotes, sortedNotes } = this.state;
    sortedNotes = originalNotes.filter((note) => note._id !== givenNote._id);
    data = _.pick(givenNote, ["status", "topic", "note"]);
    this.setState({ data, sortedNotes });

    try {
      await http.deleteNote(givenNote._id);
      this.synchronizeOriginalAndSortedNotes(sortedNotes);
    } catch (ex) {
      toast.error(ex.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
      this.setState({ sortedNotes: originalNotes, data: this.resetNoteForm() });
    }
  };

  resetNoteForm = () => ({ status: "", topic: "", note: "" });

  doSubmit = async () => {
    let { data, selectedFilter, originalNotes, sortedNotes } = this.state;
    try {
      const { data: note } = await http.createNote({ ...data });
      originalNotes = sortedNotes = [...originalNotes, { ...note }];
      this.setState({
        sortedNotes,
        selectedFilter,
        originalNotes,
        data: this.resetNoteForm(),
      });
    } catch (ex) {
      toast.error(ex.response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
      sortedNotes = [...originalNotes];
      this.setState({ sortedNotes });
    }
  };

  handleSort = (filterBy) => {
    let { originalNotes, sortedNotes, selectedFilter } = this.state;
    if (filterBy === "All") {
      selectedFilter = filterBy;
      this.setState({ selectedFilter, sortedNotes: originalNotes });
    } else {
      sortedNotes = originalNotes.filter((note) => note.status === filterBy);
      selectedFilter = filterBy;
      this.setState({ sortedNotes, selectedFilter });
    }
  };

  prepareFilters = (statuses) => {
    let filters = [];
    for (const iterator of statuses) filters.push(iterator.status);
    filters.push("All");
    return filters;
  };

  synchronizeOriginalAndSortedNotes = (sortedNotes) => {
    this.setState({ originalNotes: sortedNotes });
  };

  render() {
    const { errors, data, sortedNotes, statuses, filters } = this.state;
    return (
      <>
        <ToastContainer />
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <form className="form" onSubmit={this.handleSubmit}>
                <h1>Crate a note</h1>
                {this.renderSelect(
                  "status",
                  "Choose a status from this menu",
                  statuses
                )}
                {this.renderInput(
                  <BsFillPersonFill />,
                  "topic",
                  "Topic",
                  "Subject"
                )}
                {this.renderNoteInput(
                  "note",
                  "Note",
                  "Write here your note",
                  errors,
                  data
                )}
                {this.renderButton(
                  <AiOutlineSend style={{ marginRight: "10px" }} />,
                  "Save note"
                )}
              </form>
            </div>
            <div className="col-sm-12 col-md-6 mt-5">
              <NoteList
                filters={filters}
                sortedNotes={sortedNotes}
                onUpdate={this.handleUpdate}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NoteMain;
