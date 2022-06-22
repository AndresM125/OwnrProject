import { useEffect, useState } from "react";

export default function useAnimalPhotos() {
  const [animalPhotos, setAnimalPhotos] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadFromServerFlag, setReloadFromServerFlag] = useState(false);

  const shuffleArray = (arr) => {
    return arr
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  const reloadFromServer = () => {
    setReloadFromServerFlag(x => !x);
  };

  useEffect(() => {
    setIsLoading(true);
    // TODO: Move into service
    fetch('/api/photos/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categoryIds: categoryIds })
      })
      .then(response => response.json())
      .then(result => {
        if (categoryIds.length > 1) {
          setAnimalPhotos(shuffleArray(result));
        } else {
          setAnimalPhotos(result);
        }
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, [categoryIds, reloadFromServerFlag]);

  return [isLoading, animalPhotos, reloadFromServer, setCategoryIds];
}