"use client"
import {useEffect} from "react";
import {useQuery} from "@apollo/client";
import GET_COUNTRIES_DATA_QUERY from "@/lib/server/schemas/countries/getCountries.schema";
import {MapComponent} from '@/app/components/MapComponent';
import {Loader} from "@/app/components/Loader/";
import styles from './page.module.css'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const HomePage = () => {
    const { data, isLoading, isError, error } = useQuery(GET_COUNTRIES_DATA_QUERY);

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [isError, error]);

    return (
        <div className={styles.container}>
            <ToastContainer />
            <h1 className={styles.heading}>Countries App</h1>
            {!isLoading && data ? <div className={styles.mapContainer}><MapComponent data={data} /></div>
                : <Loader />
            }
            <ToastContainer />
        </div>
    );
}

export default HomePage