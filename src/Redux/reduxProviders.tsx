"use client";
import { Provider } from "react-redux";
import { store } from "./store";

function Pro({children}: {children: React.ReactNode}){
    return <Provider store={store}>{children}</Provider>
}

export default Pro;