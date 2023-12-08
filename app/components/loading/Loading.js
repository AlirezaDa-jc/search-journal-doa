import React from "react";
import styles from "./Loading.module.css"
import {useSelector} from "react-redux";

const Loading = () => {
    const isLoading = useSelector((state) => {
        return state.applicationReducer.isLoading;
    });

    let
        loading = isLoading ?
            <div className={styles.container}>
                <div className={styles.img}/>
            </div>
            : null;

    return (
        <div>
            {loading}
        </div>
    )
}

export default Loading;
