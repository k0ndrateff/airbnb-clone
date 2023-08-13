"use client";

import React from "react";
import {SafeUser} from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Heading from "@/app/components/Heading";
import {translateRegion} from "@/app/components/inputs/CountrySelect";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";

type ListingHeadProps = {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
};

const ListingHead:React.FC<ListingHeadProps> = ({ title, imageSrc, locationValue, id, currentUser }) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    return (
        <>
            <Heading title={title} subtitle={`${translateRegion(location?.region)}, ${location?.label}`} />
            <div className={'w-full h-[60vh] overflow-hidden rounded-xl relative'}>
                <Image src={imageSrc} alt={`Изображение ${title}`} fill className={'object-cover w-full'} />
                <div className={'absolute top-5 right-5'}>
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    );
};
export default ListingHead;