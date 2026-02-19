import './App.css'
import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import UpcomingMovies from './components/UpcomingMovies'
import SearchedMovies from './components/SearchedMovies'
import SingleMovieDetails from './components/SingleMovieDetails'
import SearchMoviesContext from './context/SearchMoviesContext'

import './App.css'
const API_KEY = '271f70e72561c45129e7ee0db8937424'

// write your code here
const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')
  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })
  const onTriggerSearchingQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`

    const response = await fetch(apiUrl)
    const data = await response.json()
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }
  return (
    <SearchMoviesContext.Provider
      value={{
        searchResponse,
        searchInput,
        apiStatus,
        onTriggerSearchingQuery,
        onChangeSearchInput,
      }}
    >
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={UpcomingMovies} />
        <Route exact path="/search" component={SearchedMovies} />
        <Route exact path="/movie/:id" component={SingleMovieDetails} />
      </Switch>
    </SearchMoviesContext.Provider>
  )
}

export default App
