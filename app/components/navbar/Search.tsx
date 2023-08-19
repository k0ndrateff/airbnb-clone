"use client";

import {BiSearch} from "react-icons/bi";
import useSearchModal from "@/app/hooks/useSearchModal";
import {useSearchParams} from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import {useMemo} from "react";
import {differenceInCalendarDays} from "date-fns";

const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label;
        }

        return 'Где угодно';
    }, [getByValue, locationValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInCalendarDays(end, start);

            if (diff === 0) diff = 1;

            let daysText = 'дней';
            if (diff.toString().at(-1) === '1' && diff.toString().at(-2) !== '1') daysText = 'день';
            if (diff.toString().at(-1) === '2' && diff.toString().at(-2) !== '1') daysText = 'дня';
            if (diff.toString().at(-1) === '3' && diff.toString().at(-2) !== '1') daysText = 'дня';
            if (diff.toString().at(-1) === '4' && diff.toString().at(-2) !== '1') daysText = 'дня';

            return `${diff} ${daysText}`;
        }

        return 'Когда угодно';
    }, [endDate, startDate]);

    const guestLabel = useMemo(() => {
        if (guestCount) {
            let guestsText = 'гостей';
            if (guestCount === "1") guestsText = 'гость';
            if (guestCount === "2" || guestCount === "3" || guestCount === "4") guestsText = 'гостя';

            return `${guestCount} ${guestsText}`;
        }

        return 'Добавить гостей';
    }, [guestCount]);

    return (
        <div onClick={searchModal.onOpen}
             className={'border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition' +
                        ' cursor-pointer'}>
            <div className={'flex flex-row items-center justify-between'}>
                <div className={'text-sm font-semibold px-6'}>
                    {locationLabel}
                </div>
                <div className={'hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'}>
                    {durationLabel}
                </div>
                <div className={'text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3'}>
                    <div className={'hidden sm:block'}>
                        {guestLabel}
                    </div>
                    <div className={'p-2 bg-rose-500 rounded-full text-white'}>
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Search;