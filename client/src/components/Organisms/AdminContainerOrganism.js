import React, { useContext, useState } from "react";
import AdminContext from "../../contexts/admin";
import ButtonAtom from "../Atoms/ButtonAtom";
import AdminPhotoCardMolecule from "../Molecules/AdminPhotoCardMolecule";
import AuthService from "../../auth/authService";

const AdminContainerOrganism = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addPhotoFormData, setAddPhotoFormData] = useState({ categoryId: null, photoUrl: "" });

  const {
    isLoadingAnimalPhotos, animalPhotos, reloadAnimalPhotos,
    isLoadingCategories, categories, reloadCategories
  } = useContext(AdminContext);

  const [newCategoryName, setNewCategoryName] = useState("");

  const createCategoryOnClick = () => {
    setIsLoading(true);
    fetch('/api/categories',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AuthService.getAuthHeader()
        },
        body: JSON.stringify({ category: newCategoryName })
      })
      .then(response => response.json())
      .then(result => {
        reloadCategories();
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
    setNewCategoryName("");
  };

  const addPhotoOnClick = () => {
    setIsLoading(true);
    fetch('/api/photos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AuthService.getAuthHeader()
        },
        body: JSON.stringify({ category_id: addPhotoFormData.categoryId, photo_url: addPhotoFormData.photoUrl })
      })
      .then(response => response.json())
      .then(result => {
        reloadAnimalPhotos();
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
    setAddPhotoFormData({ categoryId: null, photoUrl: "" });
  };

  const deletePhotoOnClick = (id) => {
    setIsLoading(true);
    fetch(`/api/photos/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AuthService.getAuthHeader()
        }
      })
      .then(result => {
        reloadAnimalPhotos();
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  const deleteCategoryOnClick = (id) => {
    setIsLoading(true);
    fetch(`/api/categories/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AuthService.getAuthHeader()
        }
      })
      .then(result => {
        reloadCategories();
        reloadAnimalPhotos();
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };


  if (isLoadingAnimalPhotos || isLoadingCategories || isLoading) {
    return (<>Loading...</>)
  }

  return (
    <div className="flex flex-col justify-center p-4">

      <div className="p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-medium">Add New Photo:</h1>
        <form className="flex flex-col mt-4">
          <label for="addPhoto">
            Photo URL:
          </label>
          <input
            className="mt-1 bg-gray-200"
            name="addPhoto"
            type="text"
            value={addPhotoFormData.photoUrl}
            onChange={e => { setAddPhotoFormData({ ...addPhotoFormData, photoUrl: e.target.value }); }} />
          <h2 className="mt-2 text-lg">Select a category for the photo:</h2>
          <div className="flex flex-row mt-2">
            {categories.map(category =>
              <ButtonAtom
                style={`mr-2 ${category.id === addPhotoFormData.categoryId ? "bg-green-500" : "bg-gray-200"}`}
                onClick={_ => { setAddPhotoFormData({ ...addPhotoFormData, categoryId: category.id }) }}>
                {category.category}
              </ButtonAtom>)}
          </div>
          <ButtonAtom style="bg-green-500 mt-2" onClick={_ => {addPhotoOnClick()}}>
            Add Photo
          </ButtonAtom>
        </form>
      </div>

      <div className="p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-medium">Add New Category:</h1>
        <form className="flex flex-col mt-4">
          <label for="newCategory">
            Category Name:
          </label>
          <input className="mt-1 bg-gray-200" name="newCategory" type="text" value={newCategoryName} onChange={e => { setNewCategoryName(e.target.value); }} />
          <ButtonAtom style="bg-green-500 mt-2" onClick={_ => {createCategoryOnClick()}}>
            Add Category
          </ButtonAtom>
        </form>
      </div>

      {categories.map(function (elem) {
        var photosForCategory = animalPhotos.filter(animal => animal.category_id === elem.id);
        return (
          <div className="flex flex-col mt-4">
            <h1 className="text-2xl font-medium">{elem.category} Photos:</h1>
            <ButtonAtom style="mt-4 bg-yellow-500 w-[200px]" onClick={_ => {deleteCategoryOnClick(elem.id)}}>
              Delete Category
            </ButtonAtom>
            {
              photosForCategory.length == 0 ?
                <>No photos for category found</> :
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {photosForCategory.map(animal =>
                    <AdminPhotoCardMolecule
                      key={animal.id}
                      src={animal.photo_url}
                      onDelete={_ => { deletePhotoOnClick(animal.id) }}
                    />)}
                </div>
            }
          </div>
        )
      })}
    </div>
  )
}

export default AdminContainerOrganism