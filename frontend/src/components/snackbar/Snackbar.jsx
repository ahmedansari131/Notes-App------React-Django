import { CloseOutlined } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSnackbar } from "../../app/slices/snackbar/snackbarSlice";

const Snackbar = () => {
  const isActive = useSelector((state) => state.snackbar.active);
  const message = useSelector((state) => state.snackbar.message);
  const dispatch = useDispatch();

  const closeSnackbar = () => {
    dispatch(toggleSnackbar({ status: false, message: message }));
  };

  useEffect(() => {
    const statusTimeoutId = setTimeout(() => {
      dispatch(toggleSnackbar({ status: false, message: message }));
    }, 5000);

    const messageTimeoutId = setTimeout(() => {
      dispatch(toggleSnackbar({ status: false, message: null }));
    }, 6000);

    return () => {
      clearTimeout(statusTimeoutId);
      clearTimeout(messageTimeoutId);
    };
  }, [isActive, message]);

  return (
    <div
      className={`absolute left-0 bottom-0 translate-x-6 bg-slate-950 p-3 px-5 text-sm text-gray-300 rounded-md shadow-2xl flex justify-between items-center gap-20 z-50 transition-all duration-300 ${
        isActive ? "-translate-y-6 opacity-100" : " opacity-0"
      }`}
    >
      <div className="">{message && message}</div>

      <div className="flex items-center gap-3 ">
        <div className="text-green-300 cursor-pointer hover:bg-slate-800 py-2 px-4 rounded-sm ">
          Undo
        </div>
        <div
          className="py-1 hover:bg-slate-800 px-1 rounded-sm"
          onClick={closeSnackbar}
        >
          <CloseOutlined style={{ fontSize: "1.4rem" }} />
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
