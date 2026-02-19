import {Link} from 'react-router-dom'
import './index.css'
const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails
  return (
    <li className="movie-card">
      <img alt={title} src={posterPath} />
      <h1>{title}</h1>
      <p>Rating: {voteAverage}</p>
      <Link to={`/movie/${id}`}>
        <button>View Details</button>
      </Link>
    </li>
  )
}
export default MovieCard
