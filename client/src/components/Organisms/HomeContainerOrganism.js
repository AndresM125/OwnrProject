import React, { useContext } from "react";
import AnimalsContext from "../../contexts/animals";
import ButtonAtom from "../Atoms/ButtonAtom";
import CarouselMolecule from "../Molecules/CarouselMolecule";
import { ACTION_TOGGLE_CATEGORY } from "../../contexts/animals";

const HomeContainerOrganism = () => {
  const { isLoadingAnimalPhotos, animalPhotos, selectedCategoriesDispatcher, selectedCategories,
    isLoadingCategories, categories } = useContext(AnimalsContext);

  if (isLoadingAnimalPhotos || isLoadingCategories) {
    return (<div className="flex flex-col items-center w-screen min-h-screen gap-2 bg-gray-500">
      Loading... Please wait
    </div>)
  };

  return (
    <>
      <div className="flex flex-col items-center w-screen min-h-screen gap-2 bg-gray-500">

        {
          categories.length > 0 &&
          <div className="flex flex-row gap-2 m-4">
            {categories.map(category =>
              <ButtonAtom
                key={category.id}
                style={selectedCategories.indexOf(category.id) != -1 ? "bg-violet-700" : "bg-white"}
                onClick={_ => { selectedCategoriesDispatcher({ type: ACTION_TOGGLE_CATEGORY, payload: category.id }) }} >
                {category.category}
              </ButtonAtom>
            )}
          </div>
        }

        {
          animalPhotos.length > 0 && selectedCategories.length > 0 ?
            <div className="m-4">
              <CarouselMolecule images={animalPhotos.map(x => x.photo_url)} />
            </div> :
            <>No photos</>
        }

      </div>
    </>
  )
};

export default HomeContainerOrganism