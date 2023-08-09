"use client";

import React from "react";
import {IconType} from "react-icons";

type CategoryInputProps = {
    icon: IconType;
    label: string;
    english: string;
    selected?: boolean;
    onClick: (value: string) => void;
};

const CategoryInput:React.FC<CategoryInputProps> = ({ icon: Icon, selected, onClick, label , english }) => {
    return (
        <div onClick={() => onClick(english)}
             className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer 
                         ${selected ? 'border-black' : 'border-neutral-200'}`}
        >
            <Icon size={30} />
            <div className={'font-semibold'}>
                {label}
            </div>
        </div>
    );
};
export default CategoryInput;