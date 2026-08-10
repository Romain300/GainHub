import useAuth from "./useAuth";

function Dashboard() {
    const auth = useAuth();
    return (
        <>
            <h1>
                Welcome {auth.user.username}
            </h1>
            <button onClick={auth.logout}>Log out</button>
        </>
    )
};

export default Dashboard;