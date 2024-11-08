import "./PageChange.scss";

export default function PageChanger({
  currentPage = 0,
  maxPages = 0,
  onPageChange = (value) => {},
}) {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            className={currentPage - 3 < 1 ? "page-item disabled" : "page-item"}
          >
            <a
              className="page-link"
              aria-label="back3"
              onClick={() => onPageChange(currentPage - 3)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            className={currentPage - 1 < 1 ? "page-item disabled" : "page-item"}
          >
            <a
              className="page-link"
              aria-label="back1"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <span aria-hidden="true">&lsaquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link">{currentPage}</a>
          </li>
          <li
            className={
              currentPage + 1 > maxPages ? "page-item disabled" : "page-item"
            }
          >
            <a
              className="page-link"
              aria-label="For1"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span aria-hidden="true">&rsaquo;</span>
            </a>
          </li>
          <li
            className={
              currentPage + 3 > maxPages ? "page-item disabled" : "page-item"
            }
          >
            <a
              className="page-link"
              aria-label="For3"
              onClick={() => onPageChange(currentPage + 3)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
