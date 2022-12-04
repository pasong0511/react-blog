import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const ShowPage = () => {
    //json db의 :id와 파라미터를 맞춰줘야한다.
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPosts = () => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPost(res.data); //받아온 데이터 post에 넣기
            setLoading(false);
        });
    };

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

    return (
        <div>
            <div className="d-flex">
                <h1 className="flex-grow-1">{post.title}</h1>
                <div>
                    <Link className="btn btn-primary" to={`/blogs/${id}/edit`}>
                        수정
                    </Link>
                </div>
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
