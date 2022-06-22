import React from "react";

const ButtonAtom = (props) => {
  return (
    <button type={props.type != null ? props.type : "button"} onClick={props.onClick} className={`p-4 rounded ${props.style}`}>
      {props.children}
    </button>
  )
}

export default ButtonAtom