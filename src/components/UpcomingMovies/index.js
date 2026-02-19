import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'
import './index.css'
const UpcomingMovies = () => {
  const [upcoming, setUpcomingData] = useState({})
  const [loading, setLoading] = useState(true)
  const getUpdatedData = reponseData => ({
    totalPages: reponseData.total_pages,
    totalResults: reponseData.total_results,
    results: reponseData.results.map(each => ({
      id: each.id,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      title: each.title,
      voteAverage: each.vote_average,
    })),
  })
  const getUpcomingData = async (page = 1) => {
    const API_KEY = '271f70e72561c45129e7ee0db8937424'
    const api = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(api)
    const data = await response.json()
    const updatedData = getUpdatedData(data)
    console.log(data)
    setUpcomingData(updatedData)
    setLoading(false)
  }

  useEffect(() => {
    getUpcomingData()
  }, [])
  const renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )
  const renderUpcoming = () => {
    const {results} = upcoming
    return (
      <ul>
        {results.map(each => (
          <MovieCard key={each.id} movieDetails={each} />
        ))}
      </ul>
    )
  }
  return (
    <div className="route-page-body">
      <Navbar />
      {loading ? renderLoader() : renderUpcoming()}
      <Pagination
        totalPages={upcoming.totalPages}
        apiCallBack={getUpcomingData}
      />
    </div>
  )
}
export default UpcomingMovies
