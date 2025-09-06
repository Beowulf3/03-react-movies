
import { useEffect, useState} from 'react';
import fetchMovies from '../../services/movieService'
import MovieGrid from '../MovieGrid/MovieGrid';
import SearchBar from '../SearchBar/SearchBar'
import css from './App.module.css'
import type { Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';


function App() {
    const [movies, setMovie] = useState<Movie[]>([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = (newQuery: string) => {
        setMovie([]);
        setQuery(newQuery);
    }

    const handleOpenModal = (movie: Movie) => {
        setSelectedMovie(movie);
        openModal();
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    useEffect(() => {
        if (!query) return;
        async function fetchData() {
            setIsloading(true);
            try {
                const response = await fetchMovies(query);
                if (response.results.length === 0) {
                    toast.error('No movies found for your request.');
                    return;
                }
                setMovie(response.results);
                console.log(movies);     
                setError(null)
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Something went wrong';
                setError(message);
                setMovie([]);
                toast.error(message);
            }
            finally {
                setIsloading(false);
            }
        }
        fetchData();
    },[query])
    
    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            {isLoading ? <Loader /> : error ? <ErrorMessage /> : <MovieGrid onSelect={handleOpenModal} movies={movies} />}
            {isModalOpen && selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toasterId="default"
                toastOptions={{
                    duration: 5000,
                    removeDelay: 1000,
                    style: {
                    background: '#363636',
                    color: '#fff',
                    },
                }}
            />
        </div>
    )
    
}
export default App
