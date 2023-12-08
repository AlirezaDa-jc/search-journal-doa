"use client";
import './globals.css'
import {Provider} from "react-redux";
import store from "./redux/store";
import Loading from "@/app/components/loading/Loading";
import React from "react";
import Modal from "@/app/components/modal/modal";

export default function RootLayout({children}) {
    return (
        <html lang="fa">
        <head>
            <title>Journal Search</title>
            <link rel="icon" href="/app/favicon.ico"/>
        </head>
        <body>
        <Provider store={store}>
            <Loading/>
            <Modal/>
            {children}
        </Provider>

        </body>
        </html>

    )
}


