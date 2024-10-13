import React from "react";
import TertiaryBtn from "../buttons/TertiaryBtn";
import { useDispatch, useSelector } from "react-redux";
import { getModalStatus } from "../../app/slices/modal/confirmationModalSlice";

const ConfirmationModal = (props) => {
  const { body, action } = props;
  const dispatch = useDispatch();
  const confirmationModalStatus = useSelector(
    (state) => state.confirmationModal.isActive
  );

  const closeConfirmationModalHandler = () => {
    dispatch(getModalStatus(false));
  };

  const clickOutsideHandler = (e) => {
    if (confirmationModalStatus) {
      dispatch(getModalStatus(false));
    }
  };

  return (
    <div
      className="absolute w-full h-full bg-black bg-opacity-40 flex justify-center items-center"
      onClick={(e) => {
        e.stopPropagation();
        clickOutsideHandler();
      }}
    >
      <div
        className="w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 shadow-2xl text-gray-200 rounded-md overflow-hidden p-5 pt-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center gap-5">
          <div className="">
            <p className="text-sm text-gray-300">{body}</p>
          </div>
          <div className="flex items-center justify-end">
            <TertiaryBtn text="Cancel" action={closeConfirmationModalHandler} />
            <TertiaryBtn
              text="Delete"
              textColor="text-red-500"
              hoverColor="hover:bg-red-400 hover:text-red-300"
              action={() => {
                action();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
