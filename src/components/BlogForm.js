import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { bool } from "prop-types";

const BlogForm = ({ editing }) => {
    const history = useHistory();
    const { id } = useParams(); //수정시 URL 파라미터에서 id 값 가져오기

    const [title, setTitle] = useState("");
    const [originalTitle, setOriginalTitle] = useState("");
    const [body, setBody] = useState("");
    const [originalBody, setOriginalBody] = useState("");
    const [publish, setPublish] = useState(false);
    const [originalPublish, setOriginalPublish] = useState("");

    //수정시 기존 데이터를 가져오기 위해서 get 요청
    useEffect(() => {
        if (editing) {
            axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
                setTitle(res.data.title);
                setOriginalTitle(res.data.title);
                setBody(res.data.body);
                setOriginalBody(res.data.body);
                setPublish(res.data.publish);
                setOriginalPublish(res.data.publish);
            });
        }
    }, [id]);

    const isEdting = () => {
        //기존 값과 수정 값에 변경사항이 없는 경우
        return title !== originalTitle || body !== originalBody || publish !== originalPublish;
    };

    //Cancel 버튼 눌렀을 때 페이지 이동
    const goBack = () => {
        if (editing) {
            history.push(`/blogs/${id}`);
        } else {
            history.push(`/blogs`);
        }
    };

    const onChangePublish = (e) => {
        setPublish(e.target.checked);
    };

    //생성 버튼 클릭 후 데이터 생성 및 리스트 페이지로 이동
    const onSubmit = () => {
        //수정인 경우
        if (editing) {
            axios
                .patch(`http://localhost:3001/posts/${id}`, {
                    title: title,
                    body: body,
                    publish: publish,
                })
                .then((res) => {
                    history.push(`/blogs/${id}`);
                });
        } else {
            console.log(title, body);
            axios
                .post("http://localhost:3001/posts", {
                    title,
                    body,
                    publish: publish,
                    createdAt: Date.now(), //생성 시간 추가
                })
                .then(() => {
                    history.push("/blogs"); //성공시 목록으로 이동
                });
        }
    };

    return (
        <div>
            <h1>{editing ? "Edit" : "Create"} a blog post</h1>
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
                    rows="15"
                />
            </div>

            <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" checked={publish} onChange={onChangePublish} />
                <label className="form-check-label">Publish</label>
            </div>

            <button className="btn btn-primary" onClick={onSubmit} disabled={editing && !isEdting()}>
                {editing ? "Edit" : "Post"}
            </button>
            <button className="btn btn-danger ms-2" onClick={goBack}>
                Cancel
            </button>
        </div>
    );
};

BlogForm.prototype = {
    editing: bool,
};

BlogForm.defalutProps = {
    editing: false,
};

export default BlogForm;
