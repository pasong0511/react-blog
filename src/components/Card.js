import PropTypes from "prop-types";

//children을 통해서 내부 컴포넌트를 받아올 수 있다.
//자식으로 onClick함수를 받아서 넣어주자
const Card = ({ title, onClick, children }) => {
    return (
        <div className="card mb-3 cursor-pointer" onClick={onClick}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>{title}</div>
                    {children && <div>{children}</div>}
                </div>
            </div>
        </div>
    );
};

//PropsType를 이용해서 타압을 체크해서 props를 전달할 수 있다.
Card.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
    onClick: PropTypes.func,
};

//defaultProps를 이용해서 기본 값을 지정해줄 수 있다.
Card.defaultProps = {
    //title: "Title",
    children: null,
    onClick: () => {}, //빈 onClick이 넘어온 경우 기본값
};

export default Card;
