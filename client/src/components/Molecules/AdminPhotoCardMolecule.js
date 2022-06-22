import React from "react";
import ButtonAtom from "../Atoms/ButtonAtom";

const AdminPhotoCardMolecule = ({src, onDelete}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded shadow-md">
      <img src={src}/>
      <ButtonAtom onClick={onDelete} style={"bg-red-500 w-full m-4"}>
        Delete
      </ButtonAtom>
    </div>
  )
}

export default AdminPhotoCardMolecule