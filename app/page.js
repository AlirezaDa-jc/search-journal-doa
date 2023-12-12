'use client'
import Header from "@/app/components/header/Header";
import JournalsList from "@/app/components/journal_list/JournalsList";
import React from "react";
import styles from "./page.module.css";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import DarkModeSwitch from "@/app/components/dark_mode_switch/DarkModeSwitch";
import {useDispatch, useSelector} from "react-redux";
import {setDarkMode} from "@/app/redux/ApplicationReducer";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#e91e63",
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
        },
        secondary: {
            main: "#f48fb1",
        },
    },
});

export default function Home() {
    const darkMode = useSelector((state) => state.applicationReducer.darkMode);
    const noFetch = useSelector((state) => state.applicationReducer.noFetch);
    const dispatch = useDispatch();

    const handleThemeChange = () => {
        localStorage.setItem('dark', !darkMode)
        dispatch(setDarkMode(!darkMode));
    };

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline/>
            <div className={styles.container}>
                <div className={noFetch ? `${styles.fullWidthHeader} ${styles.headerContainer}` :
                    `${styles.normalHeader} ${styles.headerContainer}`
                }>
                    <Header/>
                </div>
                <div className={noFetch ? `${styles.emptyList}` : `${styles.filledList}`}>
                    <JournalsList/>
                </div>
            </div>
            <DarkModeSwitch darkMode={darkMode} handleThemeChange={handleThemeChange}/>

        </ThemeProvider>
    );


}
