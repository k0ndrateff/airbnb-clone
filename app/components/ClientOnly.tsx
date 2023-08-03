"use client";

import React, {useEffect, useState} from "react";

type ClientOnlyProps = {
    children: React.ReactNode;
};

const ClientOnly:React.FC<ClientOnlyProps> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <>
            {children}
        </>
    );
};
export default ClientOnly;