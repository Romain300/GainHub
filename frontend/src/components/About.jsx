import styles from "../styles/About.module.css";
import { Link } from "react-router-dom";

function About() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}> 
                <h1>About GainHub</h1> 
                <p className={styles.intro}> GainHub is a workout tracking app designed to help you organize your training, track your progress, and stay consistent. </p> 
            </section>

            <section className={styles.features}>
                <div className={styles.card}> 
                    <h2>Track Workouts</h2> 
                    <p> Record your exercises, sets, reps, and weights so you always know what you did during your training sessions. </p> 
                </div>

                <div className={styles.card}> 
                    <h2>Build Your Routine</h2> 
                    <p> Create and manage your workouts so your training stays structured and easy to follow. </p> 
                </div>

                <div className={styles.card}> 
                    <h2>Track Progress</h2> 
                    <p> Follow your strength and performance over time and see how your training is progressing. </p> 
                </div>
            </section>

            <section className={styles.cta}> 
                <h2>Ready to start?</h2> 
                <p>Build your routine and start tracking your gains.</p> 
                <Link to="/signIn" className="button"> Create an account </Link> 
            </section>
        </div>
    );
};

export default About;

//Finishing about