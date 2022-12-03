import BlogList from "../components/BlogList";

const AdminPage = () => {
    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1>Admin</h1>
            </div>
            <BlogList isAdmin={true} />
        </div>
    );
};

export default AdminPage;
