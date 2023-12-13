import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import styles from "./Pagination.module.css";

const Pagination = (props) => {
    const pageData = useSelector((state) => state.applicationReducer.pageData);
    const [currentPage, setCurrentPage] = useState(pageData?.page);
    const [pages, setPages] = useState([]);
    const pageNeighbours = 4;
    useEffect(() => {
        setCurrentPage(pageData?.page);
        setPages(fetchPageNumbers(pageData?.page, Math.ceil((pageData?.total / pageData?.pageSize))));
    }, [pageData])


    const changePage = (page) => () => {
        props.changePage(page)
    }


    const fetchPageNumbers = (currentPage, totalPages) => {
        const totalNumbers = (pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;
        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbours/2);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours/2);
            let pages = range(startPage, endPage);
            return [1, ...pages, totalPages];
        }
        return range(1, totalPages);

    }


    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        }

        return range;
    }

    return (
        <div className={styles.pagination}>
            {pages.map((page, index) => {
                return (
                    <div key={index}>
                        <div className={currentPage === page ? `${styles.pageItem} ${styles.active}`
                            : `${styles.pageItem}`}>
                            <a className="page-link" href="#" onClick={changePage(page)}>{page}</a>
                        </div>
                    </div>
                );

            })}
        </div>
    )
}


export default Pagination;