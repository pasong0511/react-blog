import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const BlogForm = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    //생성 버튼 클릭 후 데이터 생성 및 리스트 페이지로 이동
    const onSubmit = () => {
        console.log(title, body);
        axios
            .post("http://localhost:3001/posts", {
                title,
                body,
                createdAt: Date.now(), //생성 시간 추가
            })
            .then(() => {
                history.push("/blogs"); //성공시 목록으로 이동
            });
    };

    return (
        <div>
            <h1>Create a blog post</h1>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    className="form-control"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea
                    className="form-control"
                    value={body}
                    onChange={(event) => {
                        setBody(event.target.value);
                    }}
                    rows="20"
                />
            </div>
            <button className="btn btn-primary" onClick={onSubmit}>
                Post
            </button>
        </div>
    );
};

export default BlogForm;
