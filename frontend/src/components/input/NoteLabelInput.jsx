import React, { useEffect, useState } from "react";
import { useCreateNoteLabelMutation } from "../../services/crudApi";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import LabelIcon from "@mui/icons-material/Label";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
import { labelActive } from "../../app/slices/label/labelSlice";
import { getModalStatus } from "../../app/slices/modal/confirmationModalSlice";

const NoteLabelInput = (props) => {
  const { labelId } = props;
  const [message, setMessage] = useState("");
  const [createLabel, { isError, isSuccess }] = useCreateNoteLabelMutation();
  const [labelName, setLabelName] = useState("");
  const labels = useSelector((state) => state.noteLabel.noteLabels);
  const dispatch = useDispatch();
  const labelActiveStatus = useSelector((state) => state.noteLabel.labelId);

  const createNoteLabel = async (labelName, labelId) => {
    setMessage("");
    if (labelName === "") return;
    const data = {
      id: labelId,
      name: labelName,
    };
    try {
      const response = await createLabel(data);
      if (response.error) {
        setMessage(response.error?.data?.name[0]);
      }
    } catch (error) {
      console.log("Error occurred while creating the label ", error);
    }
  };

  const getLabelInputValue = () => {
    const label = labels?.find((label) => label.id === labelId);
    setLabelName(label);
  };

  useEffect(() => {
    getLabelInputValue();
  }, []);

  return (
    <>
      <div
        className="flex items-center gap-4 group"
        onClick={() => dispatch(labelActive({ id: labelId }))}
      >
        <span
          className="relative"
          onClick={() => {
            setMessage("");
            !labelId && setLabelName({ ...labelName, name: "" });
          }}
        >
          {labelId ? (
            <div className="relative">
              <div>
                <LabelIcon
                  className={`text-slate-400 hover:bg-slate-500 p-1 rounded-sm cursor-pointer ${
                    labelActiveStatus === labelId ? "opacity-0 invisible" : ""
                  } group-hover:opacity-0 group-hover:invisible `}
                  style={{ fontSize: "1.8rem" }}
                />
              </div>

              <div onClick={() => dispatch(getModalStatus(true))}>
                <DeleteIcon
                  className={`text-slate-400 hover:bg-slate-500 p-1 rounded-sm cursor-pointer ${
                    labelActiveStatus === labelId
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }  absolute top-0 left-0 group-hover:opacity-100 group-hover:visible`}
                  style={{ fontSize: "1.8rem" }}
                />
              </div>
            </div>
          ) : (
            <>
              <CloseRoundedIcon
                className={`text-slate-400 hover:bg-slate-500 p-1 rounded-sm cursor-pointer ${
                  labelActiveStatus
                    ? "opacity-0 invisible"
                    : "opacity-100 visible"
                }`}
                style={{ fontSize: "1.8rem" }}
              />

              <AddOutlinedIcon
                className={`text-slate-400 hover:bg-slate-500 p-1 rounded-sm cursor-pointer absolute top-0 left-0  ${
                  labelActiveStatus
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
                style={{ fontSize: "1.8rem" }}
              />
            </>
          )}
        </span>
        <input
          id={labelId}
          className={`${
            (labelId &&
              labelId === labelName.id &&
              labelActiveStatus !== labelId) ||
            (!labelId && labelActiveStatus)
              ? "border-none selection:bg-none"
              : "border-b border-slate-400"
          }  bg-transparent outline-none placeholder:font-normal pb-1 placeholder:text-sm`}
          type="text"
          name="noteLabel"
          placeholder={`${labelId ? "Add label" : "Create new label"}`}
          value={labelName ? labelName.name : ""}
          onChange={(e) => {
            setLabelName({ ...labelName, name: e.target.value });
          }}
          onClick={() => {
            dispatch(labelActive({ labelId: labelId }));
          }}
        />
        <span>
          <div className="group relative">
            {labelId && labelActiveStatus !== labelId ? (
              <div
                onClick={() => {
                  dispatch(labelActive({ id: labelId }));
                }}
              >
                <ModeEditOutlineOutlinedIcon
                  className="text-slate-400 hover:bg-slate-500 p-1 rounded-sm cursor-pointer"
                  style={{ fontSize: "1.8rem" }}
                />
              </div>
            ) : (
              <div
                onClick={() => {
                  dispatch(labelActive({ id: labelId }));
                  createNoteLabel(labelName.name, labelName.id);
                }}
              >
                <DoneOutlinedIcon
                  className={`text-slate-400 hover:bg-slate-500 p-1 rounded-sm cursor-pointer ${
                    !labelId && labelActiveStatus
                      ? "opacity-0 invisible"
                      : "opacity-100 visible"
                  }`}
                  style={{ fontSize: "1.8rem" }}
                />
              </div>
            )}
          </div>
        </span>
      </div>
    </>
  );
};

export default NoteLabelInput;
