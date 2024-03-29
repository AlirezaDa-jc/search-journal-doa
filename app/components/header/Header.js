'use client'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, FormControlLabel, styled, Switch, TextField} from "@mui/material";
import {CSSTransition} from 'react-transition-group';
import styles from "./Header.module.css";
import "./HeaderTransition.css";
import {fetchJournals, removeData, setLoading, setNoFetch, setQuery} from "@/app/redux/ApplicationReducer";

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
    const [keywordButton, setKeywordButton] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setQuery(e.target.value));
        if (switchButton) {
            if (!e.target.value || e.target.value === "") {
                dispatch(removeData());
            } else {
                const search = keywordButton ? 'bibjson.keywords:' + e.target.value : e.target.value;
                dispatch(setNoFetch(false));
                dispatch(fetchJournals({query: search, page: 1, sort: null}))
            }
        }

    };

    const handleNetworkChange = () => {
        setSwitchButton(!switchButton)
    };

    const handleKeywordButton = () => {
        let button = !keywordButton
        setKeywordButton(button)
        if (query && query !== "") {
            const search = button ? 'bibjson.keywords:' + query : query;
            dispatch(setNoFetch(false));
            dispatch(fetchJournals({query: search, page: 1, sort: null}))
        }
    };

    const handleClick = () => {
        if (!query || query === "") {
            dispatch(removeData());
        } else {
            const search = keywordButton ? 'bibjson.keywords:' + query : query;
            dispatch(setNoFetch(false));
            dispatch(setLoading(true))
            dispatch(fetchJournals({query: search, page: 1, sort: null}))
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
                        onChange={handleChange}
                    />
                    {switchButton === false && (
                        <CustomButton variant="contained"
                                      onClick={handleClick}>
                            submit
                        </CustomButton>
                    )}
                </div>
                <div className={styles.switch}>
                    <FormControlLabel
                        control={
                            <Switch
                                defaultChecked
                                color="secondary"
                                onClick={handleNetworkChange}
                            />
                        }
                        label={
                            <Box component="div" fontSize={9} sx={{opacity: 0.6}} className={styles.button}>
                                High-End Network
                            </Box>
                        }
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                color="secondary"
                                onClick={handleKeywordButton}
                            />
                        }
                        label={
                            <Box component="div" fontSize={9} sx={{opacity: 0.6}} className={styles.button}>
                                Keyword Search
                            </Box>
                        }
                    />

                </div>
                {keywordButton === true && (
                    <Box component="div" fontSize={9} sx={{opacity: 0.6}}>
                        For Keyword Search Use Comma
                    </Box>
                )}
            </div>
        </CSSTransition>

    );
};

export default Header;
