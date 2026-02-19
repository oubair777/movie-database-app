import {useState} from 'react'
import './index.css'
const Pagination = props => {
  const {apiCallBack, totalPages} = props
  const [page, setPage] = useState(1)
  const nextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1
      setPage(newPage)
      apiCallBack(newPage)
    }
  }
  const prevPage = () => {
    if (page > 1) {
      const newPage = page - 1
      setPage(newPage)
      apiCallBack(newPage)
    }
  }
  return (
    <div className="pagination-container">
      <button
        type="button"
        onClick={prevPage}
        disabled={page === 1}
        className="control-btn"
      >
        Prev
      </button>

      <p className="page-no">{page}</p>

      <button
        type="button"
        className="control-btn"
        onClick={nextPage}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  )
}
export default Pagination
