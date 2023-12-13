'use client'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery
} from "@mui/material";
import React from "react";

const TableList = (props) => {

    function LargeScreenTable() {
        return (
            <TableContainer component={Paper} style={{overflowX: "auto"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Cover</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Subject</TableCell>
                            <TableCell align="center">Language</TableCell>
                            <TableCell align="center">Publishers</TableCell>
                            <TableCell align="center">Eissn</TableCell>
                            <TableCell align="center">
                                Created Date
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.sortedJournals.map((journal) => (
                            <TableRow
                                key={journal.id}
                                hover={true}
                            >
                                <TableCell align="center">
                                    <img src="Cover.jpg" alt={journal.bibjson.title} width={150} height={200}/>
                                </TableCell>
                                <TableCell align="center">
                                    <a href={journal.bibjson.apc.url} target="_blank" rel="noreferrer">
                                        {journal.bibjson.title}
                                    </a>
                                </TableCell>
                                <TableCell
                                    align="center">{journal.bibjson.subject.map((sub) => sub.term).join(", ")}</TableCell>
                                <TableCell
                                    align="center">{journal.bibjson.language.map((lang) => lang).join(", ")}</TableCell>
                                <TableCell align="center">{journal.bibjson.publisher.name}</TableCell>
                                <TableCell align="center">{journal.bibjson.eissn}</TableCell>
                                <TableCell align="center">{new Date(journal.created_date).toDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    function SmallScreenTable() {
        return (
            <div>
                {props.sortedJournals.map((journal) => (
                    <Paper key={journal.id} style={{margin: 16, padding: 16}} align="center">
                        <Typography variant="h6">{journal.bibjson.title}</Typography>
                        <img src="Cover.jpg" alt={journal.bibjson.title} width={100} height={133}/>
                        <Typography
                            variant="subtitle1">Subject: {journal.bibjson.subject.map((sub) => sub.term).join(", ")}</Typography>
                        <Typography
                            variant="subtitle1">Language: {journal.bibjson.language.map((lang) => lang).join(", ")}</Typography>
                        <Typography variant="subtitle1">Publishers: {journal.bibjson.publisher.name}</Typography>
                        <Typography variant="subtitle1">Eissn: {journal.bibjson.eissn}</Typography>
                        <Typography variant="subtitle1">Created Date: {new Date(journal.created_date).toDateString()}</Typography>
                    </Paper>
                ))}
            </div>
        );
    }

    const isSmallScreen = useMediaQuery("(max-width:1000px)");
    return (<div>{isSmallScreen ? <SmallScreenTable/> : <LargeScreenTable/>}</div>);
}

export default TableList;