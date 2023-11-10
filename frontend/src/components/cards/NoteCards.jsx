import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNoteId,
  dropdown,
  getColor,
  getCurrentColor,
} from "../../app/index";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardIcon, NoteDropdown, Tooltip } from "../index";
import {
  useDeleteTodoMutation,
  useGetTodoListQuery,
  useUpdateTodoMutation,
} from "../../services/crudApi";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import FormatColorResetOutlinedIcon from "@mui/icons-material/FormatColorResetOutlined";

const TodoCards = (props) => {
  const { title, desc, id, pinned, isArchived, color } = props;
  const dispatch = useDispatch();
  const [updateNote] = useUpdateTodoMutation();
  const { refetch } = useGetTodoListQuery();
  const dropdownActive = useSelector((state) => state.dropdown.active);
  const dropdownId = useSelector((state) => state.dropdown.id);
  const dropdownCaller = useSelector((state) => state.dropdown.calledBy);
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

  const dropdownHandler = (e, id, calledBy) => {
    dispatch(dropdown({ id: id, calledBy: calledBy }));

    if (calledBy === "colors") dispatch(getCurrentColor({ id: id }));
  };

  const deleteTodoHandler = async (id) => {
    try {
      const todo = await deleteNote(id);
      refetch();
    } catch (error) {
      console.log("Error occurred while deleting the todo", error);
    }
  };

  const noteColorHandler = async (id, color) => {
    dispatch(getColor({ id: id, color: color }));
    dispatch(getCurrentColor({ id: id }));

    try {
      const noteObj = {
        id: id,
        color: color,
      };

      const response = await updateNote(noteObj);
    } catch (error) {
      console.log("Error occurred while updating color ", error);
    }
  };

  const cardMenuIconStyle = {
    className: "text-slate-200 p-1 rounded-sm text-xl cursor-pointer",
    fontSize: "1.8rem",
  };

  const dropdownColors = [
    {
      icon: <FormatColorResetOutlinedIcon />,
      name: "Default",
      color: "",
    },
    {
      color: "rgb(119, 23, 46)",
      name: "Coral",
    },
    {
      color: "rgb(105, 43, 23)",
      name: "Peach",
    },
    {
      color: "rgb(124, 74, 3)",
      name: "Sand",
    },
    {
      color: "rgb(38, 77, 59)",
      name: "Mint",
    },
    {
      color: "rgb(12, 98, 93)",
      name: "Sage",
    },
    {
      color: "rgb(37, 99, 119)",
      name: "Fog",
    },
    {
      color: "rgb(40, 66, 85)",
      name: "Storm",
    },
    {
      color: "rgb(71, 46, 91)",
      name: "Dusk",
    },
    {
      color: "rgb(108, 57, 79)",
      name: "Blossom",
    },
    {
      color: "rgb(75, 68, 58)",
      name: "Clay",
    },
    {
      color: "rgb(35, 36, 39)",
      name: "Chalk",
    },
  ];

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

  const cardMenus = [
    {
      icon: (
        <ImageOutlinedIcon
          className={`${cardMenuIconStyle.className}`}
          style={{ fontSize: cardMenuIconStyle.fontSize }}
        />
      ),
      name: "image",
    },
    {
      icon: (
        <PaletteOutlinedIcon
          className={`${cardMenuIconStyle.className}`}
          style={{ fontSize: cardMenuIconStyle.fontSize }}
        />
      ),
      name: "colors",
      onClick: (e) => dropdownHandler(e, id, "colors"),
      dropdownItem: dropdownColors,
    },
    {
      icon: (
        <ArchiveOutlinedIcon
          className={`${cardMenuIconStyle.className}`}
          style={{ fontSize: cardMenuIconStyle.fontSize }}
        />
      ),
      name: "archive",
      onClick: (e) => archiveHandler(e),
    },
    {
      icon: (
        <MoreVertIcon
          className={`${cardMenuIconStyle.className}`}
          style={{ fontSize: cardMenuIconStyle.fontSize }}
        />
      ),
      name: "more",
      onClick: (e) => dropdownHandler(e, id, "more"),
      dropdownItem: dropdownLinks,
    },
  ];

  return (
    <div
      id={id}
      className={`${
        color ? null : "bg-slate-900"
      } border border-slate-700 rounded-md px-6 py-5 w-full hover:shadow-lg group hover:border-slate-600 hover:bg-slate-800 cursor-default
              `}
      style={{ wordWrap: "break-word", backgroundColor: color ? color : null }}
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
              className={`rounded-sm transition-all duration-200 group-hover:opacity-100 opacity-0 hover:bg-slate-600 hover:bg-opacity-50 p-1 cursor-pointer ${
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
          onClick={(e) => e.stopPropagation()}
        >
          {cardMenus?.map((item) => (
            <div key={item.name} className={`relative group/${item.name}`}>
              <div
                className="rounded-sm transition-all duration-200 hover:bg-slate-600 hover:bg-opacity-50 cursor-pointer p-1 "
                onClick={item.onClick}
              >
                {item.icon}
              </div>
              <Tooltip tip={item.name} onHover={item.name} />

              <div>
                {dropdownActive &&
                  dropdownId === id &&
                  dropdownCaller === item.name && (
                    <NoteDropdown
                      item={item.dropdownItem}
                      id={id}
                      caller={item.name}
                      action={item.name === "colors" && noteColorHandler}
                    />
                  )}
              </div>
            </div>
          ))}

          {/* MORE ICON */}
          {/* <div>
            <div
              className="relative group/more"
              onClick={(e) => dropdownHandler(e, id, "more")}
            >
              <CardIcon
                icon={
                  <MoreVertIcon
                    className="text-slate-200 p-1 rounded-sm text-xl cursor-pointer "
                    style={{ fontSize: "1.8rem" }}
                  />
                }
              />
              <Tooltip tip="More" />
            </div>
            <div>
              {dropdownActive &&
                dropdownId === id &&
                dropdownCaller === "more" && (
                  <NoteDropdown
                    item={dropdownLinks}
                    id={id}
                    caller={dropdownCaller}
                  />
                )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
