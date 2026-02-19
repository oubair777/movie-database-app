import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'
import SearchMoviesContext from '../../context/SearchMoviesContext'
import './index.css'
const SearchedMovies = () => {
  const renderEmptyView = () => (
    <div className="search-results-container no-results">
      <h1>No results found.</h1>
      <p>Do not get worried, Try to search again.</p>
    </div>
  )
  const renderMoviesList = (searchResponse, onTriggerSearchQuery) => {
    const {results, totalPages} = searchResponse
    if (results.length === 0) {
      return renderEmptyView()
    }
    return (
      <>
        <ul className="search-results-container">
          {results.map(each => (
            <MovieCard key={each.id} movieDetails={each} />
          ))}
        </ul>
        <Pagination
          totalPages={totalPages}
          apiCallBack={onTriggerSearchQuery}
        />
      </>
    )
  }
  const renderLoad = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )
  const renderSearchResultsView = value => {
    const {searchResponse, apiStatus} = value
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoad()
      case 'SUCCESS':
        return renderMoviesList(searchResponse)
      default:
        return renderEmptyView()
    }
  }
  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchQuery} = value

        return (
          <>
            <Navbar />
            {renderSearchResultsView(value)}
          </>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}
export default SearchedMovies
