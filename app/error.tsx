"use client";

import React, {useEffect} from "react";
import EmptyState from "@/app/components/EmptyState";

type ErrorProps = {
    error: Error;
}

const Error:React.FC<ErrorProps> = ({ error }) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <EmptyState title={'Упс..'} subtitle={'Что-то пошло не так'} />
    );
};
export default Error;