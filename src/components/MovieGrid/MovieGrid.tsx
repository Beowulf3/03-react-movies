import { BASE_IMG_URL } from '../../services/movieService'
import type { Movie } from '../../types/movie'
import css from './MovieGrid.module.css'
import noImage from '../../assets/noPhoto.png'

interface MovieGridProps {
	onSelect: (movie: Movie) => void,
	movies: Movie[]
}


export default function MovieGrid({ onSelect, movies }: MovieGridProps) {

	return (
		<ul className={css.grid}>
			{movies.map((movie) => (
				<li onClick={()=>onSelect(movie)} key={movie.id}>
					<div className={css.card}>
						<img
							className={css.image}
							src={movie.poster_path ? `${BASE_IMG_URL}${ movie.poster_path}`: noImage}
							alt={movie.title}
							loading="lazy"
						/>
						<h2 className={css.title}>{movie.title}</h2>
					</div>
				</li>
			))}
		</ul>
	)
}

