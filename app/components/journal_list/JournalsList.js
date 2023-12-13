'use client'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TableList from "@/app/components/journal_list/table_list/TableList";
import TilesList from "@/app/components/journal_list/tiles_list/TilesList";
import {InputLabel, MenuItem, Select} from "@mui/material";
import styles from "./JournalsList.module.css";
import Pagination from "@/app/components/pagination/Pagination";
import {fetchJournals} from "@/app/redux/ApplicationReducer";

const JournalsList = () => {
    const query = useSelector((state) => state.applicationReducer.query);
    const journals = useSelector((state) => state.applicationReducer.journalsList);
    const [showType, setShowType] = useState("table")
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState("desc");

    const handleSort = (e) => {
        setSortOrder(e.target.value)
        dispatch(fetchJournals({query: query, page: 1, sort: e.target.value}));
    };


    let view = showType === "table" ?
        <TableList sortedJournals={journals}/>
        : <TilesList sortedJournals={journals}/>;


    const changePage = (page) => {
        dispatch(fetchJournals({query: query, page: page, sort: sortOrder}))
    }

    function handleShowType(e) {
        setShowType(e.target.value)
    }


    return (
        <>
            <div className={styles.setting}>
                <div>
                    <InputLabel>View</InputLabel>
                    <Select
                        value={showType}
                        label="View"
                        onChange={handleShowType}
                    >
                        <MenuItem value={"table"}>Table</MenuItem>
                        <MenuItem value={"tiles"}>Tiles</MenuItem>
                    </Select>
                </div>
                <div>
                    <InputLabel>Sort By Date</InputLabel>
                    <Select
                        value={sortOrder}
                        label="View"
                        onChange={handleSort}
                    >
                        <MenuItem value={"asc"}>Ascending</MenuItem>
                        <MenuItem value={"desc"}>Descending</MenuItem>
                    </Select>
                </div>
            </div>
            <div className={styles.journals}>
                {view}
            </div>
            <Pagination changePage={changePage}/>

        </>
    )
};


export default JournalsList;