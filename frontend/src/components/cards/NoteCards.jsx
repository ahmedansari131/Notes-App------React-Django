import React, { useState, useEffect, useRef, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dropdown,
  getColor,
  getCurrentColor,
  getNoteId,
} from "../../app/index";
import { NoteLabel, LinearLoader, PinNote, NoteOptions } from "../index";
import {
  useUpdateNoteMutation,
  useUploadNoteImageMutation,
  useDeleteTodoMutation,
  useCreateNoteMutation,
  selectAllNotes,
} from "../../services/crudApi";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormatColorResetOutlinedIcon from "@mui/icons-material/FormatColorResetOutlined";
import { frameActiveHandler } from "../../app/slices/modalFrame/modalFrameSLice";
import { toggleSnackbar } from "../../app/slices/snackbar/snackbarSlice";

const NoteCards = (props) => {
  const {
    title,
    desc,
    id: noteId,
    pinned,
    isArchived,
    color,
    label,
    image,
  } = props;
  const [file, setFile] = useState({
    id: null,
    filePath: null,
    imagePreview: null,
  });
  const dispatch = useDispatch();
  const [uploadNoteImage, { isLoading: imageLoading }] =
    useUploadNoteImageMutation({
      fixedCacheKey: "shared-image-uploading-status",
    });
  const [updateNote] = useUpdateNoteMutation();
  const [duplicateNote] = useCreateNoteMutation();
  const [deleteNote] = useDeleteTodoMutation();
  const imageFileRef = useRef(null);
  const generateId = useId();
  const allNotes = useSelector(selectAllNotes);

  const openUpdateInput = (id) => {
    dispatch(frameActiveHandler(true));
    dispatch(getNoteId({ id: id }));
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

  const archiveHandler = async (e) => {
    const noteObj = {
      id: noteId,
      archived: true,
    };

    try {
      const response = await updateNote(noteObj);
      if (response.data) {
        dispatch(
          toggleSnackbar({ status: true, message: response.data.Message })
        );
      } else {
        dispatch(toggleSnackbar({ status: true, message: response.error }));
      }
    } catch (error) {
      console.log("Error occurred while archiving the note ", error);
    }
  };

  // useEffect(() => {
  //   if (file?.filePath !== null) {
  //     const formData = new FormData();
  //     formData.append("image", file.filePath);
  //     formData.append("id", file.id);

  //     fileUploadHandler(formData);
  //   }
  // }, [file]);

  // const fileHandler = (e, id) => {
  //   if (e.target.files[0] !== null) {
  //     setFile({
  //       id: id,
  //       filePath: e.target.files[0],
  //       imagePreview: URL.createObjectURL(e.target.files[0]),
  //     });
  //   }
  // };

  // const fileUploadHandler = async (data) => {
  //   try {
  //     const response = await uploadNoteImage(data);
  //     if (response.data) {
  //       setFile({ id: null, filePath: null, imagePreview: null });
  //     }
  //   } catch (error) {
  //     console.log("Error occurred while uploading the image ", error);
  //   }
  // };

  const deleteTodoHandler = async (id) => {
    try {
      const todo = await deleteNote(id);
    } catch (error) {
      console.log("Error occurred while deleting the todo", error);
    }
  };

  const labelDropdownHandler = (labelId) => {
    dispatch(
      dropdown({
        id: labelId,
        parentId: noteId,
      })
    );
  };

  const masterDropdownHandler = (dropdownId = null) => {
    dispatch(dropdown({ id: dropdownId, parentId: noteId }));
  };

  const getNoteFromState = () => {
    return allNotes.data.find((note) => note.id === dropdownParentId);
  };

  const noteDuplicationHandler = async () => {
    const noteObj = getNoteFromState();
    try {
      const response = await duplicateNote(noteObj);
      console.log("object ", response);
    } catch (error) {
      console.log("Error occurred while duplicating the note ", error);
    }
  };

  const moreLinks = [
    {
      name: "Delete",
      func: deleteTodoHandler,
      subName: "DELETE",
    },
    {
      name: "Add labels",
      func: labelDropdownHandler,
      subName: "LABELS",
    },
    {
      name: "Make a copy",
      func: noteDuplicationHandler,
      subName: "DUPLICATE",
    },
  ];

  const colorsOpt = [
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

  const cardMenuIconStyle = {
    className: "text-slate-200 p-1 rounded-sm text-xl cursor-pointer",
    fontSize: "1.8rem",
  };

  const cardMenus = [
    // {
    //   icon: (
    //     <ImageOutlinedIcon
    //       className={`${cardMenuIconStyle.className}`}
    //       style={{ fontSize: cardMenuIconStyle.fontSize }}
    //     />
    //   ),
    //   name: "IMAGE",
    //   onClick: () => imageFileRef.current.click(),
    // },
    {
      icon: (
        <PaletteOutlinedIcon
          className={`${cardMenuIconStyle.className}`}
          style={{ fontSize: cardMenuIconStyle.fontSize }}
        />
      ),
      name: "COLORS",
      id: `colors-${generateId}`,
      dropdownItem: colorsOpt,
      onClick: () => masterDropdownHandler(`colors-${generateId}`),
      noteColorHandler: noteColorHandler,
    },
    {
      icon: isArchived ? (
        <UnarchiveOutlinedIcon
          className={`${cardMenuIconStyle.className}`}
          style={{ fontSize: cardMenuIconStyle.fontSize }}
        />
      ) : (
        <ArchiveOutlinedIcon
          className={`${cardMenuIconStyle.className}`}
          style={{ fontSize: cardMenuIconStyle.fontSize }}
        />
      ),
      name: "ARCHIVE",
      onClick: (e) => archiveHandler(e),
    },
    {
      icon: (
        <MoreVertIcon
          className={`${cardMenuIconStyle.className}`}
          style={{ fontSize: cardMenuIconStyle.fontSize }}
        />
      ),
      name: "MORE",
      id: `more-${generateId}`,
      dropdownItem: moreLinks,
      subDropdownItemName: "noteLabelDropdown",
      onClick: () => masterDropdownHandler(`more-${generateId}`),
    },
  ];

  return (
    <div
      id={noteId}
      className={`pb-4 border border-slate-700 rounded-md w-64 hover:shadow-lg group hover:border-slate-600 hover:bg-slate-800 cursor-default break-inside-avoid-column mb-4 ${
        color ? null : " bg-slate-900 "
      }
              `}
      style={{
        wordWrap: "break-word",
        backgroundColor: color ? color : null,
        border: color ? color : "",
      }}
      onClick={(e) => openUpdateInput(noteId)}
    >
      <input
        ref={imageFileRef}
        type="file"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => fileHandler(e, noteId)}
        className="hidden"
        accept=".jpg, .jpeg, .png"
        multiple={false}
      />
      <div className="flex flex-col h-full justify-between relative ">
        <div className="w-full overflow-hidden">
          <div className="relative">
            {imageLoading && file.id === noteId && (
              <span className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-60"></span>
            )}
            <img
              className={`rounded-t-md`}
              src={!imageLoading ? image : file.imagePreview}
            />
          </div>
          {imageLoading && file.id === noteId && <LinearLoader />}
        </div>

        <div className="flex flex-col gap-3 pt-7 px-5">
          <div className="flex items-start justify-between">
            <li
              className="list-none text-white font-medium break-words text-xl w-44"
              style={{ wordBreak: "break-word" }}
            >
              {title}
            </li>
            <PinNote id={noteId} pinnedStatus={pinned} />
          </div>
          <div>
            <p className="text-slate-400 font-normal text-sm pointer-events-none">
              {desc}
            </p>
          </div>

          {label !== "" && (
            <div>
              <NoteLabel label={label} />
            </div>
          )}
        </div>

        <div className="px-5">
          <NoteOptions
            archived={isArchived}
            noteId={noteId}
            noteColorHandler={noteColorHandler}
            archiveHandler={archiveHandler}
            cardMenus={cardMenus}
            moreLinks={moreLinks}
            colorsOpt={colorsOpt}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCards;
