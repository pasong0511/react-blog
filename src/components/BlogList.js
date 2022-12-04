import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import propTypes from "prop-types";
import Pagination from "./Pagination";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "./Toast";
import { v4 as uuid4 } from "uuid";

const BlogList = ({ isAdmin }) => {
    const history = useHistory(); //useHistory 사용하기 위해서 선언
    const location = useLocation(); //url의 ?뒤를 가져올 수 있다.
    const params = new URLSearchParams(location.search); //=숫자가져오기 URLSearchParams : URL의 파라미터 값을 확인하고 싶을때
    const pageParam = params.get("page");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [toasts, setToasts] = useState([]);

    const [searchText, setSearchText] = useState("");

    const limit = 5;

    //페이지네이션 개수
    useEffect(() => {
        //numberOfPosts: db에서 가져온 데이터 개수 / limit:최대페이지에서 보여줄 개수
        setNumberOfPages(Math.ceil(numberOfPosts / limit));
    }, [numberOfPosts]);

    const onClickPageButton = (page) => {
        history.push(`${location.pathname}?page=${page}`); //url가 변경된다.
        setCurrentPage(page);
        getPosts(page);
    };

    //axios에서 파라미터를 넘길떄 params로 묶어서 넘겨줄 수 있다.
    //버튼 클릭해서 currentPage에서 넘어온 매개변수가 page임
    //useCallback : 함수를 기억했다가 컴포넌트가 렌더링 되었어도 새로운 함수를 생성하지 않고 기억된 함수를 사용한다.
    //useEffect에서 무한 렌더링 되는 것을 방지해준다.
    const getPosts = useCallback(
        (page = 1) => {
            let params = {
                _page: page,
                _limit: limit,
                _sort: "id",
                _order: "desc",
                title_like: searchText,
            };

            //isAdmin가 admin아 아닌 경우 publish:true만 보여줌
            if (!isAdmin) {
                params = { ...params, publish: true };
            }

            axios
                .get(`http://localhost:3001/posts`, {
                    params: params,
                })
                .then((res) => {
                    setNumberOfPosts(res.headers["x-total-count"]);
                    setPosts(res.data);
                    setLoading(false); //데이터 응답이 다 와서 로딩을 false로 변경
                });
        },
        [isAdmin, searchText]
    );

    useEffect(() => {
        setCurrentPage(parseInt(pageParam) || 1); //아무것도 없을때 페이지는 1
        getPosts(parseInt(pageParam) || 1);
    }, []); //pageParam이 변경될때마다 데이터 get

    const addToast = (toast) => {
        const toastWithId = {
            ...toast,
            id: uuid4(), //id 추가
        };
        setToasts((prev) => [...prev, toastWithId]); //기존에 있던거 넣어주고, 새로운 것도 넣어줌
    };

    const deleteToast = (id) => {
        console.log("클릭한 햄토스트", id);

        const filteredToasts = toasts.filter((toast) => {
            return toast.id !== id;
        });

        setToasts(filteredToasts); //지운 토스트 결과 업데이트
    };

    const deleteBlog = (e, id) => {
        e.stopPropagation();

        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            //성공후 데이터 리랜더링을 위해서 posts에 있는 id값을 제거해주지
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            addToast({ text: "Successfullty deleted", type: "success" });
        });
    };

    //로딩이 true이면 스피너 보여줌
    if (loading) {
        return <LoadingSpinner />;
    }

    const renderBlogList = () => {
        return posts.map((post) => {
            return (
                <Card
                    key={post.id}
                    title={post.title}
                    onClick={() => history.push(`/blogs/${post.id}`)}
                >
                    {isAdmin ? (
                        <div>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) => deleteBlog(e, post.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ) : null}
                </Card>
            );
        });
    };

    //검색 & 엔터 버튼 눌렀을때
    //엔터를 눌렀을때만 검색
    const onSearch = (e) => {
        if (e.key === "Enter") {
            history.push(`${location.pathname}?page=1`);
            setCurrentPage(1);
            getPosts(1);
        }
    };
    // toasts={[
    //     { text: "으어엉", type: "danger" },
    //     { text: "우아앙", type: "success" },
    // ]}
    return (
        <div>
            <Toast toasts={toasts} deleteToast={deleteToast} />
            <input
                type="text"
                placeholder="search..."
                className="form-control"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={onSearch}
            />
            <hr />
            {posts.length === 0 ? (
                <div>No blog posts found</div>
            ) : (
                <>
                    {renderBlogList()}
                    {/* numberOfPages가 1보다 큰 경우에만 페이지네이션을 보여줌 */}
                    {numberOfPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            onClick={onClickPageButton}
                        />
                    )}
                </>
            )}
        </div>
    );
};

BlogList.propTypes = {
    isAdmin: propTypes.bool,
};

BlogList.defaultProps = {
    isAdmin: false,
};

export default BlogList;
