import propTypes from "prop-types";

//currentPage현재 페이지 numberOfPages: 페이지내이션 범위
const Pagination = ({ currentPage, numberOfPages, onClick, limit }) => {
    //현재 페이지 / 최대 개수
    const currentSet = Math.ceil(currentPage / limit);
    const lastSet = Math.ceil(numberOfPages / limit);
    const startPage = limit * (currentSet - 1) + 1; //페이지네이션 넘어갔을때 시작 페이지 번호
    const numberOfPageForSet =
        currentSet === lastSet ? numberOfPages % limit : limit;

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {/* currentSet가 1이 아닌 경우에만 Previous 버튼 활성화 */}
                {currentSet !== 1 && (
                    <li className="page-item">
                        <div
                            className="page-link cursor-pointer"
                            onClick={() => onClick(startPage - limit)}
                        >
                            Previous
                        </div>
                    </li>
                )}
                {Array(numberOfPageForSet) //1, 2, 3, 4, 5를 채워줄거임
                    .fill(startPage) //배열에 빈 1을 채워줌, 페이지 네이션 맨 앞 시작 번호
                    .map((value, index) => value + index)
                    .map((pageNumber) => {
                        return (
                            <li
                                key={pageNumber}
                                className={`page-item ${
                                    currentPage === pageNumber ? "active" : ""
                                }`}
                            >
                                <div
                                    className="page-link cursor-pointer"
                                    onClick={() => {
                                        onClick(pageNumber); //페이지 네이션 getPost 요청
                                    }}
                                >
                                    {pageNumber}
                                </div>
                            </li>
                        );
                    })}
                {currentSet !== lastSet && (
                    <li className="page-item">
                        <div
                            className="page-link cursor-pointer"
                            onClick={() => onClick(startPage + limit)}
                        >
                            Next
                        </div>
                    </li>
                )}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    currentPage: propTypes.number,
    numberOfPages: propTypes.number.isRequired,
    onClick: propTypes.func.isRequired,
};

Pagination.defaultProps = {
    currentPage: 1, //디폴트 커런트 페이지는 1
    limit: 5,
};

export default Pagination;
