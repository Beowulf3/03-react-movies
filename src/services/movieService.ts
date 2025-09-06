import axios from "axios";
import type { Movie } from "../types/movie";

const moviedbKey = import.meta.env.VITE_MOVIEDB_KEY;
export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';


interface FetchMovies {
    results: Movie[]; 
}

export default async function fetchMovies(userQuery: string){
    const response = await axios.get<FetchMovies>('https://api.themoviedb.org/3/search/movie', {
        params: {
            method: 'GET',
            query: `${userQuery}`,
            include_adult: false,
            page: 1,
            language: 'en-US',
            
        },
        headers: {
            Authorization: `Bearer ${moviedbKey}`
        }
    });
    console.log(response);
    return response.data;
}