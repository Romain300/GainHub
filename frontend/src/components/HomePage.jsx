import Dashboard from "./Dashboard";
import LogForm from "./LogForm";
import useAuth from "./useAuth";

function HomePage() {
    const { token, user } = useAuth();

    return (token && user) ? <Dashboard /> : <LogForm />
};

export default HomePage;