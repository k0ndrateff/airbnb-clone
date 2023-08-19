"use client";

import Modal from "@/app/components/modals/Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useMemo, useState} from "react";
import {Range} from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, {CountrySelectValue} from "@/app/components/inputs/CountrySelect";
import qs from "query-string";
import {formatISO} from "date-fns";
import Heading from "@/app/components/Heading";
import Calendar from "@/app/components/inputs/Calendar";
import Counter from "@/app/components/inputs/Counter";

enum STEPS {
    LOCATION,
    DATE,
    INFO
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const onBack = useCallback(() => {
        setStep(value => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep(value => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) return onNext();

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }, [bathroomCount,dateRange, guestCount, location, onNext, params, roomCount, router, searchModal, step]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) return 'Применить';
        return 'Далее';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) return undefined;
        return 'Назад';
    }, [step]);

    let bodyContent = (
      <div className={'flex flex-col gap-8'}>
          <Heading title={'Куда вы хотите отправиться?'} subtitle={'Найдите место по душе'} />
          <CountrySelect value={location} onChange={value => setLocation(value as CountrySelectValue)} />
          <hr />
          <Map center={location?.latlng} />
      </div>
    );

    if (step === STEPS.DATE) {
        bodyContent = (
          <div className={'flex flex-col gap-8'}>
              <Heading title={'Когда вы планируете заселиться?'} subtitle={'Выберите время для отпуска'} />
              <Calendar value={dateRange} onChange={value => setDateRange(value.selection)} />
          </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
          <div className={'flex flex-col gap-8'}>
              <Heading title={'Ещё немного информации'} subtitle={'Найдите самое подходящее жильё'} />
              <Counter title={'Гости'} subtitle={'Сколько гостей приедут?'} value={guestCount} onChange={value => setGuestCount(value)} />
              <Counter title={'Жилые комнаты'} subtitle={'Сколько комнат вам нужно?'} value={roomCount} onChange={value => setRoomCount(value)} />
              <Counter title={'Ванные комнаты'} subtitle={'Сколько ванных вам нужно?'} value={bathroomCount} onChange={value => setBathroomCount(value)} />
          </div>
        );
    }

    return (
        <Modal isOpen={searchModal.isOpen}
               onClose={searchModal.onClose}
               onSubmit={onSubmit}
               title={'Фильтры'}
               actionLabel={actionLabel}
               secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
               secondaryActionLabel={secondaryActionLabel}
               body={bodyContent}
        />
    );
};
export default SearchModal;