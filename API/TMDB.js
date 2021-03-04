const API_TOKEN = '6dbc6176862220c2bb03b35d3c483dbb'


export function getFilms(filmRecherché,page){

    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+API_TOKEN+'&language=fr-FR&query='+filmRecherché+'&page='+page+'&include_adult=true'
    return fetch(url)
       .then((response) => response.json())
       .catch((error) => console.log("Erreur de recherche du film"))
}

export function getImages(nom){
    return 'https://image.tmdb.org/t/p/w300'+nom
}

export function getFilm(id){
    const url = 'https://api.themoviedb.org/3/search/movie'+id+'?api_key='+API_TOKEN+'&language=fr-FR'
    return fetch(url)
       .then((response) => response.json())
       .catch((error) => console.log("Erreur de recuperation du film"))
}