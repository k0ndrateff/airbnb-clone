"use client";

import React from "react";
import { Range } from 'react-date-range';
import Calendar from "@/app/components/inputs/Calendar";
import Button from "@/app/components/Button";

type ListingReservationProps = {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
};

const ListingReservation:React.FC<ListingReservationProps> = ({ price, totalPrice, disabledDates, disabled, onChangeDate, dateRange, onSubmit }) => {
    return (
        <div className={'bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden '}>
            <div className={'flex flex-row items-center gap-1 p-4'}>
                <div className={'text-2xl font-semibold '}>
                    {price} ₽
                </div>
                <div className={'font-light text-neutral-600 '}>
                    за ночь
                </div>
            </div>
            <hr />
            <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)} />
            <hr />
            <div className={'p-4'}>
                <Button label={'Забронировать'} onClick={onSubmit} disabled={disabled} />
            </div>
            <div className={'p-4 flex flex-row items-center justify-between font-semibold text-lg'}>
                <div>Итого</div>
                <div>{totalPrice} ₽</div>
            </div>
        </div>
    );
};
export default ListingReservation;