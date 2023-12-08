"use client"
import React, {useEffect, useState} from "react"
import styles from "./Pagination.module.css"
import {useDispatch, useSelector} from "react-redux";
import {fetchJournals} from "@/app/redux/Actions";
import {Button, styled} from "@mui/material";

const PaginationButton = styled(Button)({
    height: '40px',
    width: '30px',
    minWidth: '30px',
    margin: '0 10px'

});

const Pagination = () => {
    const pageData = useSelector((state) => state.applicationReducer.pageData);
    const query = useSelector((state) => state.applicationReducer.query);
    const [currentPage , setCurrentPage] = useState(pageData?.page)
    const [totalPages , setTotalPage] = useState(Math.floor((pageData?.total / pageData?.pageSize)))
    const dispatch = useDispatch();
    useEffect(() => {
        setCurrentPage(pageData?.page);
        setTotalPage(Math.floor((pageData?.total / pageData?.pageSize)))
    } , [pageData])
    let startPage, endPage;
    if (totalPages <= 10) {
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    const range = (start, stop, step) =>
        Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step)
        );


    // return an object with all pager properties required by the view
    let arr =
        range(startPage, endPage, 1)

    function changePage(c) {
        dispatch(fetchJournals(query, c));
    }

    return (
        <div className={styles.container}>
            {arr.map((c) => {
                if (c == currentPage) {
                    return (
                        <PaginationButton variant="contained" disabled={true}>
                            {c}
                        </PaginationButton>
                    )
                } else {
                    return (
                        <PaginationButton variant="contained" onClick={() => changePage(c)}>
                            {c}
                        </PaginationButton>
                    )
                }
            })}
        </div>
    )
}

export default Pagination;