import React, {useEffect, useState} from "react";
import {FaExclamationCircle} from "react-icons/fa";
import styles from "./Modal.module.css";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {setModal} from "@/app/redux/ApplicationReducer";

const Modal = () => {
    const modal = useSelector((state) => {
        return state.applicationReducer.modal;
    });
    const darkMode = useSelector((state) => {
        return state.applicationReducer.darkMode;
    });
    const [view, setView] = useState(modal?.view)
    const [message, setMessage] = useState(modal?.message)
    const icon = <FaExclamationCircle size={70} fill={'red'}/>;
    const dispatch = useDispatch()

    useEffect(() => {
        setView(modal?.view)
        setMessage(modal?.message)
    }, [modal , darkMode])

    const onClose = () => {
        dispatch(setModal({
            "message": '',
            "view": false
        }));
    };

    let modalHtml;
    if (view) {
        modalHtml = (
            <div className={styles.modal}>
                <div
                    className={darkMode ? `${styles.modalContent} ${styles.dark}` : `${styles.modalContent} ${styles.light}`}>
                    <div className={styles.modalHeader}>
                        <h2>{icon}</h2>
                    </div>
                    <div className={styles.modalBody}>
                        <p>{message}</p>
                        <Button variant="contained" onClick={onClose}>
                            Okay
                        </Button>
                    </div>
                </div>
            </div>
        )
    } else {
        modalHtml = null;
    }
    return (
        <div>
            {modalHtml}
        </div>
    );
};

export default Modal;