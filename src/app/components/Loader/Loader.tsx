import styles from './Loader.module.css';


export const Loader = () => {
    return <div className={styles.loaderContainer}>
        <h1 className={styles.heading}/>
        <img
            className={styles.loaderImage}
            src="static/Loading.png"
            alt="Loading"
        />
    </div>
}