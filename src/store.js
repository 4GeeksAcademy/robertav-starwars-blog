export const initialStore = () => {
  return {
    favoritos: JSON.parse(localStorage.getItem('favoritos')) || [],
    cache: JSON.parse(localStorage.getItem('cache')) || {
      people: [],
      vehicles: [],
      planets: []
    }
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      const isAlreadyFavorite = store.favoritos.some(
        fav => fav.uid === action.payload.uid && fav.type === action.payload.type
      );
      if (!isAlreadyFavorite) {
        const updatedFavorites = [...store.favoritos, action.payload];
        localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
        return { ...store, favoritos: updatedFavorites };
      }
      return store;
    }
    case 'REMOVE_FAVORITE': {
      const filteredFavorites = store.favoritos.filter(
        fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
      );
      localStorage.setItem('favoritos', JSON.stringify(filteredFavorites));
      return { ...store, favoritos: filteredFavorites };
    }
    case 'SET_CACHE': {
      const updatedCache = { ...store.cache, ...action.payload };
      localStorage.setItem('cache', JSON.stringify(updatedCache));
      return { ...store, cache: updatedCache };
    }
    default:
      throw new Error('Unknown action.');
  }
}
