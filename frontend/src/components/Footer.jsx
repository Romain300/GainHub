import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";
import useAuth from "./useAuth";

function Footer() {
    const { token, user } = useAuth();
    
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.brand}>
                    <h3>Gainhub</h3>
                    <p>Track your workouts. Build your strength.</p>
                </div>

                {token && user && ( 
                    <div className={styles.links}> 
                        <Link to="/">Dashboard</Link> 
                        <Link to="/workouts">Workouts</Link> 
                        <Link to="/exercises">Exercises</Link> 
                        <Link to="/progress">Progress</Link> 
                        <Link to="/profile">Profile</Link> 
                    </div> 
                )}

                {!token && !user && (
                    <div className={styles.links}> 
                        <Link to="/about">About</Link> 
                        <Link to="/">Log In</Link> 
                        <Link to="/signIn">Sign Up</Link> 
                    </div>
                )}

            </div>

            <div className={styles.bottom}> 
                <p>© 2026 GainHub. All rights reserved.</p> 
            </div>

        </footer>
    );
};

export default Footer;