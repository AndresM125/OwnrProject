import React, { useEffect, useState } from "react";
import ButtonAtom from "../Atoms/ButtonAtom";

const CarouselMolecule = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [images]);

  if (images.length == 0) {
    return <>
      No photos
    </>
  }

  //TODO: Improve design, prevent elements from getting moved around
  return (
    <>
      <div className="flex flex-row items-center">
        {
          imageIndex > 0 &&
          <ButtonAtom style={"bg-white"} onClick={_ => setImageIndex(x => x - 1)}>
            Previous
          </ButtonAtom>
        }
        <img className="w-[500px] ml-8 mr-8" src={images[imageIndex]}></img>
        {
          imageIndex < (images.length - 1) &&
          <ButtonAtom style={"bg-white"} onClick={_ => setImageIndex(x => x + 1)}>
            Next
          </ButtonAtom>
        }
      </div>
    </>
  )
}

export default CarouselMolecule