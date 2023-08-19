"use client";

import React, {useCallback, useMemo} from "react";
import {SafeListing, SafeReservation, SafeUser} from "@/app/types";
import {useRouter} from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";
import {translateRegion} from "@/app/components/inputs/CountrySelect";
import {categories} from "@/app/components/navbar/Categories";
import Button from "@/app/components/Button";
import { ru } from 'date-fns/locale';

type ListingCardProps = {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
};

const ListingCard:React.FC<ListingCardProps> = ({ data, reservation, onAction, disabled, actionId = "", currentUser, actionLabel }) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) return;

        onAction?.(actionId);
    }, [actionId, disabled, onAction]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) return null;

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP', {locale: ru})} - ${format(end, 'PP', {locale: ru})}`;
    }, [reservation]);

    return (
        <div onClick={() => router.push(`/listings/${data.id}`)} className={'col-span-1 cursor-pointer group'}>
            <div className={'flex flex-col gap-2 w-full'}>
                <div className={'aspect-square w-full relative overflow-hidden rounded-xl'}>
                    <Image src={data.imageSrc}
                           fill
                           alt={`Изображение ${data.title}`}
                           className={'object-cover h-full w-full group-hover:scale-110 transition'}
                    />
                    <div className={'absolute top-3 right-3'}>
                        <HeartButton listingId={data.id} currentUser={currentUser} />
                    </div>
                </div>
                <div className={'font-semibold text-lg'}>
                    {translateRegion(location?.region)}, {location?.label}
                </div>
                <div className={'font-light text-neutral-500'}>
                    {reservationDate || categories.find(cat => cat.english === data.category)?.label}
                </div>
                <div className={'flex flex-row items-center gap-1'}>
                    <div className={'font-semibold'}>
                        {price} ₽
                    </div>
                    {!reservation && (
                        <div className={'font-light'}>за ночь</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button label={actionLabel} onClick={handleCancel} disabled={disabled} small />
                )}
            </div>
        </div>
    );
};
export default ListingCard;