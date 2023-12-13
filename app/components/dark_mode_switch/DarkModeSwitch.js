import styles from "./DarkmodeSwitch.module.css";
import React from "react";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import { FaMoon , FaSun } from "react-icons/fa6";

const DarkModeSwitch = (props) => {

    return (
        <div className={styles.container}>
            <ToggleButtonGroup
                value={props.darkMode}
                exclusive
            >
                <ToggleButton value={true} onClick={() => props.handleThemeChange(true)}>
                    <FaMoon />
                </ToggleButton>
                <ToggleButton value={false} onClick={() => props.handleThemeChange(false)}>
                    <FaSun />
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

export default DarkModeSwitch;