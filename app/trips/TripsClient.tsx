"use client";

import React, {useCallback, useState} from "react";
import {SafeReservation, SafeUser} from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";

type TripsClientProps = {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
};

const TripsClient:React.FC<TripsClientProps> = ({ reservations, currentUser }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string>('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Бронь отменена!');
                router.refresh();
            })
            .catch((error) => {
                toast.error('Произошла ошибка при отмене брони.');
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [router]);

    return (
        <Container>
            <Heading title={'Поездки'} subtitle={'Где вы были и где вам ещё предстоит побывать'} />
            <div className={'mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' +
                            ' 2xl:grid-cols-6 gap-8'}>
                {reservations.map(reservation => (
                    <ListingCard key={reservation.id}
                                 data={reservation.listing}
                                 reservation={reservation}
                                 actionId={reservation.id}
                                 onAction={onCancel}
                                 disabled={deletingId === reservation.id}
                                 actionLabel={'Отменить бронь'}
                                 currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};
export default TripsClient;