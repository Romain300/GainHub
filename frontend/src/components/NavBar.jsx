import styles from "../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";
import useAuth from "./useAuth";

function NavBar() {
    const { token, user } = useAuth();
    return (
        <nav className={styles.navbar}>

            <div className={styles.logo}>
                Gainhub
            </div>

            { token && user && (
                <div className={styles.links}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => 
                            isActive ? styles.active : ""
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/workouts"
                        className={({ isActive }) => 
                            isActive ? styles.active : ""
                        }
                    >
                        Workouts
                    </NavLink>
                    <NavLink
                        to="/exercises"
                        className={({ isActive }) => 
                            isActive ? styles.active : ""
                        }
                    >
                        Exercises
                    </NavLink>
                    <NavLink
                        to="/progress"
                        className={({ isActive }) => 
                            isActive ? styles.active : ""
                        }
                    >
                        Progress
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) => 
                            isActive ? styles.active : ""
                        }
                    >
                        Profile
                    </NavLink>
                </div>
            )}

            { !token && !user && (
                <div className={styles.links}>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => 
                            isActive ? styles.active : ""
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/"
                        className={({ isActive }) => 
                            isActive ? styles.active : ""
                        }
                    >
                        Log In
                    </NavLink>
                    <NavLink
                        to="/signIn"
                        className={({ isActive }) => 
                            isActive ? styles.active : ""
                        }
                    >
                        Sign Up
                    </NavLink>
                </div>
            )}
        </nav>
    )
};

export default NavBar;



