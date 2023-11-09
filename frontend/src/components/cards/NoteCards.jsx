import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoteId, dropdown } from "../../app/index";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardIcon, NoteDropdown } from "../index";
import {
  useDeleteTodoMutation,
  useGetTodoListQuery,
  useUpdateTodoMutation,
} from "../../services/crudApi";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const TodoCards = (props) => {
  const { title, desc, id, pinned, isArchived } = props;
  const dispatch = useDispatch();
  const [updateNote] = useUpdateTodoMutation();
  const { refetch } = useGetTodoListQuery();
  const dropdownActive = useSelector((state) => state.dropdown.active);
  const dropdownId = useSelector((state) => state.dropdown.id);
  const [deleteNote] = useDeleteTodoMutation();

  const openUpdateInput = (id) => {
    dispatch(getNoteId({ id: id }));
  };

  const archiveHandler = async (e) => {
    const noteObj = {
      id: id,
      archived: true,
    };

    try {
      const response = await updateNote(noteObj);
      refetch();
    } catch (error) {
      console.log("Error occurred while archiving the note ", error);
    }
  };

  const pinNoteHandler = async (e, id) => {
    e.stopPropagation();
    const noteObj = {
      id: id,
      pin: true,
    };

    try {
      const response = await updateNote(noteObj);
      refetch();
    } catch (error) {
      console.log("Error occurred while pinning the note ", error);
    }
  };

  const dropdownHandler = (e, id) => {
    e.stopPropagation();
    dispatch(dropdown({ id: id }));
  };

  const deleteTodoHandler = async (id) => {
    try {
      const todo = await deleteNote(id);
      refetch();
    } catch (error) {
      console.log("Error occurred while deleting the todo", error);
    }
  };

  const dropdownLinks = [
    {
      name: "Delete",
      action: deleteTodoHandler,
    },
    {
      name: "Add labels",
      action: "",
    },
    {
      name: "Make a copy",
      action: "",
    },
  ];

  return (
    <div
      id={id}
      className={`bg-slate-900 border border-slate-700 rounded-md px-6 py-5 w-full hover:shadow-lg group hover:border-slate-600 hover:bg-slate-800 cursor-default
              `}
      style={{ wordWrap: "break-word" }}
      onClick={(e) => openUpdateInput(id)}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <li
              className="list-none text-white font-medium break-words text-xl"
              style={{ wordBreak: "break-word" }}
            >
              {title}
            </li>
            <div
              className={`rounded-sm transition-all duration-200 group-hover:opacity-100 opacity-0 hover:bg-slate-700 cursor-pointer ${
                dropdownActive && dropdownId === id ? "opacity-100" : ""
              }`}
            >
              {!pinned ? (
                <PushPinOutlinedIcon
                  className={`text-slate-200 p-1`}
                  style={{ fontSize: "1.8rem" }}
                  onClick={(e) => pinNoteHandler(e, id)}
                />
              ) : (
                <PushPinIcon
                  className={`text-slate-200 p-1`}
                  style={{ fontSize: "1.8rem" }}
                  onClick={(e) => pinNoteHandler(e, id)}
                />
              )}
            </div>
          </div>
          <p className="text-slate-400 font-normal text-sm pointer-events-none">
            {desc}
          </p>
        </div>

        <div
          className={`flex justify-between rounded-md mt-3 gap-1 opacity-0 group-hover:opacity-100 ${
            dropdownActive && dropdownId === id ? "opacity-100" : ""
          }`}
        >
          <CardIcon
            icon={
              <ImageOutlinedIcon
                className="text-slate-200 p-1 rounded-sm text-xl cursor-pointer"
                style={{ fontSize: "1.8rem" }}
              />
            }
          />

          <CardIcon
            icon={
              <PaletteOutlinedIcon
                className="text-slate-200 p-1 rounded-sm text-xl cursor-pointer"
                style={{ fontSize: "1.8rem" }}
              />
            }
          />
          <CardIcon
            icon={
              !isArchived ? (
                <ArchiveOutlinedIcon
                  className=" text-slate-200 p-1 rounded-sm text-xl cursor-pointer"
                  style={{ fontSize: "1.8rem" }}
                />
              ) : (
                <UnarchiveOutlinedIcon
                  className=" text-slate-200 p-1 rounded-sm text-xl cursor-pointer"
                  style={{ fontSize: "1.8rem" }}
                />
              )
            }
            onClick={(e) => {
              e.stopPropagation();
              archiveHandler(e);
            }}
          />
          <div className="relative" onClick={(e) => dropdownHandler(e, id)}>
            <CardIcon
              icon={
                <MoreVertIcon
                  className="text-slate-200 p-1 rounded-sm text-xl cursor-pointer"
                  style={{ fontSize: "1.8rem" }}
                />
              }
            />
            {dropdownActive && dropdownId === id && (
              <NoteDropdown links={dropdownLinks} id={id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
