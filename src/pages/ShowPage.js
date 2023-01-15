import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useToast from "../hooks/toast";

const ShowPage = () => {
    //json db의 :id와 파라미터를 맞춰줘야한다.
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();
    const [error, setError] = useState("");

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    //const [timer, setTimer] = useState(0);

    const getPosts = () => {
        axios
            .get(`http://localhost:3001/posts/${id}`)
            .then((res) => {
                setPost(res.data); //받아온 데이터 post에 넣기
                setLoading(false);
            })
            .catch((e) => {
                setError("서버 에러");
                addToast({
                    text: "서버 에러",
                    type: "danger",
                });
                setLoading(false);
            });
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log("hello");
    //         setTimer((prev) => prev + 1);
    //     }, 1000);

    //     //페이지 unmount되었을때 실행
    //     return () => {
    //         clearInterval(interval); //setInterval종료
    //     };
    // }, []);

    //시간 치환
    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    useEffect(() => {
        getPosts(id);
    }, [id]); //<- 의존성 배열(id가 변경되면 렌더링 된다.)

    //로딩중인 경우
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="d-flex">
                <h1 className="flex-grow-1">{post.title}</h1>
                {/* Edit 버튼도 로그인을 한 경우에만 가능하게 */}
                {isLoggedIn ? (
                    <div>
                        <Link
                            className="btn btn-primary"
                            to={`/blogs/${id}/edit`}
                        >
                            수정
                        </Link>
                    </div>
                ) : null}
            </div>

            <small className="text-muted">
                Create At : {printDate(post.createdAt)}
            </small>
            <hr />
            <div>{post.body}</div>
        </div>
    );
};

export default ShowPage;
