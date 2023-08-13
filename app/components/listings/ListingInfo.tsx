"use client";

import React from "react";
import {SafeUser} from "@/app/types";
import {IconType} from "react-icons";
import useCountries from "@/app/hooks/useCountries";
import Avatar from "@/app/components/Avatar";
import ListingCategory from "@/app/components/listings/ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

type ListingInfoProps = {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        english: string;
        description: string;
    } | undefined;
    locationValue: string;
};

const ListingInfo:React.FC<ListingInfoProps> = ({ user, locationValue, category, description, bathroomCount, roomCount, guestCount }) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className={'col-span-4 flex flex-col gap-8'}>
            <div className={'flex flex-col gap-2'}>
                <div className={'text-xl font-semibold flex flex-row items-center gap-2'}>
                    <div>Разместил {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className={'flex flex-row items-center gap-4 font-light text-neutral-500'}>
                    <div>{guestCount} гостей</div>
                    <div>{roomCount} жилых комнат</div>
                    <div>{bathroomCount} ванные комнаты</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory icon={category.icon} label={category.label} description={category.description} />
            )}
            <hr />
            <div className={'text-lg font-light text-neutral-500'}>
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    );
};
export default ListingInfo;