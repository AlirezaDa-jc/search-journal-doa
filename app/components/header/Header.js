'use client'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, FormControlLabel, styled, Switch, TextField} from "@mui/material";
import {CSSTransition} from 'react-transition-group';
import styles from "./Header.module.css";
import "./HeaderTransition.css";
import {fetchJournals, setLoading, setNoFetch, setQuery} from "@/app/redux/ApplicationReducer";

const CustomTextField = styled(TextField)({
    width: "60%",
    minWidth: "300px",
});

const CustomButton = styled(Button)({
    height: "55px"
});

const Header = () => {
    const query = useSelector((state) => state.applicationReducer.query);
    const noFetch = useSelector((state) => state.applicationReducer.noFetch);
    const [switchButton, setSwitchButton] = useState(true);//True = High End Network ,False = Low End Network
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setQuery(e.target.value));
        if (switchButton && e.target.value && e.target.value !== "") {
            dispatch(setNoFetch(false));
            dispatch(fetchJournals({query: e.target.value, page: 1}))
        }
    };

    const handleSwitchChange = () => {
        setSwitchButton(!switchButton)
    };

    const handleClick = (e) => {
        dispatch(setQuery(e.target.value));
        if (e.target.value && e.target.value !== "") {
            dispatch(setNoFetch(false));
            dispatch(setLoading(true))
            dispatch(fetchJournals({query: e.target.value, page: 1}))
            dispatch(setLoading(false))
        }
    };

    return (
        <CSSTransition
            in={noFetch} // Use the noFetch state as the trigger
            timeout={300}
            classNames="searchbars"
        >
            <div
                className={styles.container}
            >
                <h1 className={styles.title}>
                    Journals Search
                </h1>
                <div className={styles.box}>
                    <CustomTextField
                        label="Search Journals"
                        value={query}
                        onChange={handleChange}
                    />
                    {switchButton === false && (
                        <CustomButton variant="contained"
                                      value={query}
                                      onClick={handleClick}>
                            submit
                        </CustomButton>
                    )}
                </div>
                <FormControlLabel
                    control={
                        <Switch
                            defaultChecked
                            color="secondary"
                            onClick={handleSwitchChange}
                        />
                    }
                    label={
                        <Box component="div" fontSize={9} sx={{opacity: 0.6}} className={styles.button}>
                            High-End Network
                        </Box>
                    }
                />
            </div>
        </CSSTransition>

    );
};

export default Header;
