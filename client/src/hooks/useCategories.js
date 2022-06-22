import { useEffect, useState } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadFromServerFlag, setReloadFromServerFlag] = useState(false);

  const reloadFromServer = () => {
    setReloadFromServerFlag(x => !x);
  };

  useEffect(() => {
    setIsLoading(true);
    // TODO: Move into service
    fetch('/api/categories')
      .then(response => response.json())
      .then(result => {
        setCategories(result);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, [reloadFromServerFlag]);

  return [isLoading, categories, reloadFromServer];
}