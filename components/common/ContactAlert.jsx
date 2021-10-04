import { useState } from "react";
import PropTypes from "prop-types";

export default function ContactAlert({ alertState }) {

  const success = "Success: Email sent!";
  const error = "Error: Sorry there was an error please try again!"

  return (
    <>
    {alertState.type ==="success" ? (
      <p
        className={`${
          alertState.open
            ? "absolute transition-all ease-in-out top-2 left-20 right-20 bg-green-600/[0.8] p-2 border-2 border-green-800 text-white shadow-md flex justify-center "
            : "hidden"
        }`}
      >
        {success}
      </p>
    ) : (
      <p
        className={`${
          alertState.open
            ? "absolute transition-all ease-in-out top-2 left-20 right-20 bg-red-600/[0.8] p-2 border-2 border-red-800 text-white shadow-md flex justify-center "
            : "hidden"
        }`}
      >
        {error}
      </p>
    )}
    </>
  );
}

ContactAlert.PropTypes = {
  alertState: PropTypes.shape({
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    open: PropTypes.bool.isRequired,
  }),
}