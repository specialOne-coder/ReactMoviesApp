
const initialeState = { favoritesFilm:[]}

function toggleFavorite(state=initialeState,action){
    let nextState
    switch (action.type) {
        case "Toggle_Favorite":
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
            //si le film est la le supprimer sinnon l'ajouter
            if(favoriteFilmIndex !== -1){
               nextState = {
                   ...state,
                   favoritesFilm:state.favoritesFilm.filter((item,index)=> index !== favoriteFilmIndex)
               }
            }else{
                nextState={
                    ...state,
                    favoritesFilm:[...state.favoritesFilm,action.value]
                }
            }
            return nextState || state
        default:
            return state
            break;
    }
}

export default toggleFavorite