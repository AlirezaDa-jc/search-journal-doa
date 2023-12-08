import DayNightToggle from 'react-day-and-night-toggle';
import styles from "./DarkmodeSwitch.module.css";
import React from "react";

const DarkModeSwitch = (props) => {

    return (
        <div className={styles.container}>
            <DayNightToggle
                onChange={props.handleThemeChange}
                checked={props.darkMode}

            />
        </div>
    )
}

export default DarkModeSwitch;