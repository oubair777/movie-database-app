import {useState, useEffect} from 'react'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'
import Loader from 'react-loader-spinner'
import './index.css'
const Popular = () => {
  const [popularResponse, setResponse] = useState({})
  const [isloading, setLoading] = useState(true)
  const getUpdatedData = reponseData => ({
    totalPages: reponseData.total_pages,
    totalResults: reponseData.total_results,
    results: reponseData.results.map(each => ({
      id: each.id,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      voteAverage: each.vote_average,
      title: each.title,
    })),
  })
  const getPopularData = async (page = 1) => {
    const API_KEY = '271f70e72561c45129e7ee0db8937424'
    const api = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(api)
    const data = await response.json()
    console.log(data)
    const newData = getUpdatedData(data)
    setResponse(newData)
    setLoading(false)
  }
  useEffect(() => {
    getPopularData()
  }, [])
  const renderPopular = () => {
    const {results} = popularResponse
    return (
      <ul>
        {results.map(each => (
          <MovieCard key={each.id} movieDetails={each} />
        ))}
      </ul>
    )
  }
  const renderLoad = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  return (
    <div className="route-page-body">
      <Navbar />
      {isloading ? renderLoad() : renderPopular()}
      <Pagination
        totalPages={popularResponse.totalPages}
        apiCallBack={getPopularData}
      />
    </div>
  )
}
export default Popular
