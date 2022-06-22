import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import useAnimalPhotos from '../hooks/useAnimalPhotos';
import useCategories from '../hooks/useCategories';

export const AnimalsContext = createContext();

export const ACTION_TOGGLE_CATEGORY = "ACTION_TOGGLE_CATEGORY";

function selectedCategoriesReducer(state, action) {
  switch (action.type) {
    case ACTION_TOGGLE_CATEGORY:
      if (state.indexOf(action.payload) != -1) {
        return state.filter(id => id != action.payload)
      } else {
        return [...state, action.payload]
      }
    default:
      throw new Error();
  }
}

export const AnimalsProvider = ({children}) => {
  const [isLoadingAnimalPhotos, animalPhotos, reloadAnimalPhotos, setCategoryIds] = useAnimalPhotos();
  const [isLoadingCategories, categories, reloadCategories] = useCategories();
  const [selectedCategories, selectedCategoriesDispatcher] = useReducer(selectedCategoriesReducer, []);

  useEffect(() => {
    setCategoryIds(selectedCategories);
  }, [selectedCategories]);

  return (
    <AnimalsContext.Provider
      value={{
        isLoadingAnimalPhotos, animalPhotos, reloadAnimalPhotos,
        isLoadingCategories, categories, reloadCategories,
        selectedCategories, selectedCategoriesDispatcher
      }}
    >
      {children}
    </AnimalsContext.Provider>
  )
}

export default AnimalsContext