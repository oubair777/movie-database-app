import React from 'react'
const SearchMoviesContext = React.createContext({
    apiStatus: 'INITIAL',
    onTriggerSearchingQuery: () => {},
    onChangeSearchInput: () => {},
    searchInput: '',
  })

export default SearchMoviesContext
