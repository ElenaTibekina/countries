import styles from './InfoWindowContent.module.css'

export const InfoWindowContent = ({marker}) => {
    return <div className={styles.infoWindowContent}>
        <h2>{marker.name} {marker.emoji}</h2>
        <p>
            <strong>Capital:</strong> {marker.capital}
        </p>
        <p>
            <strong>Languages:</strong> {marker.languages.map(lang => lang.name).join(', ')}
        </p>
        <p>
            <strong>Currency:</strong> {marker.currency}
        </p>
        <p>
            <strong>Country Code:</strong> {marker.code}
        </p>
    </div>
}