import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LoadingSpiner from "../components/LoadingSpiner";

const ListPage = () => {
    const history = useHistory(); //useHistory 사용하기 위해서 선언
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPosts = () => {
        axios.get("http://localhost:3001/posts").then((res) => {
            setPosts(res.data);
            setLoading(false); //데이터 응답이 다 와서 로딩을 false로 변경
        });
    };

    const deleteBlog = (e, id) => {
        e.stopPropagation();
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            //성공후 데이터 리랜더링을 위해서 posts에 있는 id값을 제거해주지
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

            // setPosts((prevPosts) => {
            //     return prevPosts.filter((post) => {
            //         return post.id !== id;
            //     });
            // });
        });
    };

    const renderBlogList = () => {
        //로딩이 true이면 스피너 보여줌
        if (loading) {
            return <LoadingSpiner />;
        }

        if (posts.length === 0) {
            return <div>데이터 없음</div>;
        }

        return posts
            .filter((post) => post.publish === true)
            .map((post) => {
                return (
                    <Card key={post.id} title={post.title} onClick={() => history.push(`/blogs/${post.id}`)}>
                        <div>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={
                                    //이벤트를 넘겨주기 위해서 화살표 함수 사용
                                    (e) => deleteBlog(e, post.id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </Card>
                );
            });
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1>Blogs</h1>
                <div>
                    <Link to="/blogs/create" className="btn btn-success">
                        Create New
                    </Link>
                </div>
            </div>
            <div>{renderBlogList()}</div>
        </div>
    );
};

export default ListPage;
