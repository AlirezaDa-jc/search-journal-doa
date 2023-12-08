'use client'
import React from "react";
import styles from "./TilesList.module.css";
import {Typography} from "@mui/material";

const TilesList = (props) => {

    return (

        props.sortedJournals.map((journal) => (
            <div className={styles.tile}
                 key={journal.id}
            >
                <img src="Cover.jpg" alt={journal.bibjson.title} width={200} height={250}/>
                <div className={styles.info}>
                    <a href={journal.bibjson.apc.url} target="_blank" rel="noreferrer" className={styles.title}>
                        Title : {journal.bibjson.title}
                    </a>

                    <Typography>Subjects : {journal.bibjson.subject.map((sub) => sub.term).join(", ")}</Typography>
                    <Typography>Languages : {journal.bibjson.language.map((lang) => lang).join(", ")}</Typography>
                    <Typography>Published By : {journal.bibjson.publisher.name}</Typography>
                    <Typography>Eissn : {journal.bibjson.eissn}</Typography>
                    <Typography>Created Date : {new Date(journal.created_date).toDateString()}</Typography>

                </div>
            </div>
        ))

    )
}
export default TilesList;