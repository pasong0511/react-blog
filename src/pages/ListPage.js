import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ListPage = () => {
    const history = useHistory(); //useHistory 사용하기 위해서 선언
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        axios.get("http://localhost:3001/posts").then((res) => {
            setPosts(res.data);
        });
    };

    const deleteBlog = (e, id) => {
        e.stopPropagation();
        console.log("삭제버튼 클릭", id);
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
            <div>
                {posts.map((post) => {
                    return (
                        <Card key={post.id} title={post.title} onClick={() => history.push("/blogs/edit")}>
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
                })}
            </div>
        </div>
    );
};

export default ListPage;
