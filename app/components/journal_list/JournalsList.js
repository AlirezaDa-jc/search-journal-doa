'use client'

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import TableList from "@/app/components/journal_list/table_list/TableList";
import TilesList from "@/app/components/journal_list/tiles_list/TilesList";
import {InputLabel, MenuItem, Select} from "@mui/material";
import styles from "./JournalsList.module.css";
import Pagination from "@/app/components/pagination/Pagination";

const JournalsList = () => {
    const journals = useSelector((state) => state.applicationReducer.journalsList);
    const [sortOrder, setSortOrder] = useState("desc");
    const [sortedJournals, setSortedJournals] = useState(journals);
    const [showType, setShowType] = useState("table")

    const handleSort = () => {
        if (sortOrder === "asc") {
            setSortOrder("desc");
            sortList("desc")
        } else {
            setSortOrder("asc");
            sortList("asc")
        }
    };

    function sortList(sort) {
        let journalsCopy = [...journals];
        if (sort === "asc") {
            setSortedJournals(journalsCopy.sort((a, b) => {
                let dateA = new Date(a.created_date);
                let dateB = new Date(b.created_date);
                return dateA - dateB;
            }));
        } else {
            setSortedJournals(journalsCopy.sort((a, b) => {
                let dateA = new Date(a.created_date);
                let dateB = new Date(b.created_date);
                return dateB - dateA;
            }));
        }
    }


    let view = showType === "table" ?
        <TableList sortedJournals={sortedJournals} sortOrder={sortOrder} handleSort={handleSort}/>
        : <TilesList sortedJournals={sortedJournals} sortOrder={sortOrder} handleSort={handleSort}/>;

    useEffect(() => {
        sortList()
    }, [journals, showType]);

    function handleShowType(e) {
        setShowType(e.target.value)
    }


    return (
        <>
            <div className={styles.setting}>
                <div>
                    <InputLabel id="demo-simple-select-label">View</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={showType}
                        label="View"
                        onChange={handleShowType}
                    >
                        <MenuItem value={"table"}>Table</MenuItem>
                        <MenuItem value={"tiles"}>Tiles</MenuItem>
                    </Select>
                </div>
                <div>
                    <InputLabel id="demo-simple-select-label">Sort By Date</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortOrder}
                        label="View"
                        onChange={handleSort}
                    >
                        <MenuItem value={"asc"}>Ascending</MenuItem>
                        <MenuItem value={"desc"}>Descending</MenuItem>
                    </Select>
                </div>
            </div>
            {view}
            <Pagination/>

        </>
    )
};


export default JournalsList;