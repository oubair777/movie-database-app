import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'

const API_KEY = '271f70e72561c45129e7ee0db8937424'

const SingleMovieDetails = () => {
  const {id} = useParams()

  const [movieData, setMovieData] = useState(null)
  const [castData, setCastData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true)

      const movieApi = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      const castApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`

      const movieResponse = await fetch(movieApi)
      const movieJson = await movieResponse.json()

      const castResponse = await fetch(castApi)
      const castJson = await castResponse.json()

      const updatedMovie = {
        title: movieJson.title,
        posterPath: `https://image.tmdb.org/t/p/w500${movieJson.poster_path}`,
        rating: movieJson.vote_average,
        duration: movieJson.runtime,
        genres: movieJson.genres.map(each => each.name).join(', '),
        releaseDate: movieJson.release_date,
        overview: movieJson.overview,
      }

      const updatedCast = castJson.cast.map(each => ({
        id: each.id,
        name: each.original_name,
        character: each.character,
        profilePath: each.profile_path
          ? `https://image.tmdb.org/t/p/w200${each.profile_path}`
          : null,
      }))

      setMovieData(updatedMovie)
      setCastData(updatedCast)
      setLoading(false)
    }

    getMovieDetails()
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loader-container">
          <Loader type="TailSpin" color="#032541" />
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="movie-details-container">
        <div className="movie-info">
          <img src={movieData.posterPath} alt={movieData.title} />
          <div>
            <h1>{movieData.title}</h1>
            <p>
              <strong>Rating:</strong> {movieData.rating}
            </p>
            <p>
              <strong>Duration:</strong> {movieData.duration} mins
            </p>
            <p>
              <strong>Genres:</strong> {movieData.genres}
            </p>
            <p>
              <strong>Release Date:</strong> {movieData.releaseDate}
            </p>
            <p>{movieData.overview}</p>
          </div>
        </div>

        <h2 className="cast-heading">Cast</h2>
        <ul className="cast-grid">
          {castData.map(each => (
            <li key={each.id} className="cast-card">
              {each.profilePath && (
                <img src={each.profilePath} alt={each.name} />
              )}
              <p>{each.name}</p>
              <p className="character">{each.character}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default SingleMovieDetails
