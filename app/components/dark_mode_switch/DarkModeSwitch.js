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
                onChange={props.handleThemeChange}
            >
                <ToggleButton value="dark">
                    <FaMoon />
                </ToggleButton>
                <ToggleButton value="light">
                    <FaSun />
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

export default DarkModeSwitch;