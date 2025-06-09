export const initialStore = () => {
    return {
        favoritos: []
    }
}

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case 'ADD_FAVORITE':
            const isAlreadyFavorite = store.favoritos.some(fav => fav.uid === action.payload.uid && fav.type === action.payload.type);
            if (!isAlreadyFavorite) {
                return {
                    ...store,
                    favoritos: [...store.favoritos, action.payload]
                };
            }
            return store;
        case 'REMOVE_FAVORITE':
            return {
                ...store,
                favoritos: store.favoritos.filter(fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type))
            };
        default:
            throw Error('Unknown action.');
    }
}