import {AdvancedMarker, APIProvider, InfoWindow, Map, Pin} from "@vis.gl/react-google-maps";
import {useState} from "react";
import COUNTRIES from '../../../../countries.json'
import {Select} from "antd";
import styles from './MapComponent.module.css'
import {InfoWindowContent} from "./InfoWindowContent";

export const MapComponent = ({data}) => {
    const [open, setOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);

    const countriesForMap = COUNTRIES.map(country => country["Country"]);

    const filteredCountries = data?.countries.filter(country =>
        countriesForMap.includes(country.name)
    );

    const combinedCountryData = filteredCountries?.map(filteredCountry => {
        const countryInfo = COUNTRIES.find(countryItem => countryItem.Country === filteredCountry.name);
        return {
            ...filteredCountry,
            Latitude: countryInfo?.Latitude,
            Longitude: countryInfo?.Longitude,
        };
    });

    const markers = combinedCountryData?.map((country, index) => ({
        name: country?.name,
        code: country?.code,
        capital: country?.capital,
        languages: country?.languages,
        currency: country?.currency,
        emoji: country?.emoji,
        awsRegion: country?.awsRegion,
        position: { lat: country?.Latitude, lng: country.Longitude },
        onClick: () => {
            setOpenIndex(index);
            setOpen(!open)
            setSelectedCountryCode(country?.name)
        },
        children: (
            <Pin background={"#604B61"} borderColor={"#362A36"} glyphColor={"#B58DB6"} />
        ),
    }));

    const firstCountryPosition = markers?.[0]?.position;

    const countryOptions = combinedCountryData?.map((country) => (
        <Select.Option key={country.code} value={country.code}>
            {country.name}
        </Select.Option>
    ));

    const [selectedCountryCode, setSelectedCountryCode] = useState(null);

    return <div  className={styles.container}>
        <Select
            placeholder='Choose a country'
            className={styles.selectContainer}
            onChange={(value) => {
                const index = combinedCountryData.findIndex((country) => country.code === value);
                setOpenIndex(index);
                setOpen(true);
                setSelectedCountryCode(value);
            }}
            value={selectedCountryCode}
        >
            {countryOptions}
        </Select>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div className={styles.mapContainer}>
                <Map zoom={3} center={firstCountryPosition} mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}>
                    {markers?.map((marker, index) => (
                        <div key={marker?.code}>
                            <AdvancedMarker onClick={marker.onClick} onTouchStart={marker.onClick} {...marker} />
                            {open && openIndex === index &&
                            <InfoWindow position={marker.position} onCloseClick={() => {
                                setSelectedCountryCode(null)
                                setOpen(false);
                            }}>
                                <InfoWindowContent marker={marker} />
                            </InfoWindow>
                            }
                        </div>
                    ))}
                </Map>
        </div>
        </APIProvider>
    </div>
}

