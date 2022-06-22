import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import useAnimalPhotos from '../hooks/useAnimalPhotos';
import useCategories from '../hooks/useCategories';

export const AdminContext = createContext();

export const AdminProvider = ({children}) => {
  const [isLoadingAnimalPhotos, animalPhotos, reloadAnimalPhotos, setCategoryIds] = useAnimalPhotos();
  const [isLoadingCategories, categories, reloadCategories] = useCategories();

  return (
    <AdminContext.Provider
      value={{
        isLoadingAnimalPhotos, animalPhotos, reloadAnimalPhotos,
        isLoadingCategories, categories, reloadCategories
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContext