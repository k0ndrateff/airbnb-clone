"use client";

import React, {useCallback, useState} from "react";
import {SafeListing, SafeUser} from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";

type PropertiesClientProps = {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
};

const PropertiesClient:React.FC<PropertiesClientProps> = ({ listings, currentUser }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string>('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Листинг удалён!');
                router.refresh();
            })
            .catch(() => {
                toast.error('Произошла ошибка при удалении.');
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [router]);

    return (
        <Container>
            <Heading title={'Листинги'} subtitle={'Жильё, которое вы сдаёте'} />
            <div className={'mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' +
                            ' 2xl:grid-cols-6 gap-8'}>
                {listings.map(listing => (
                    <ListingCard key={listing.id}
                                 data={listing}
                                 actionId={listing.id}
                                 onAction={onCancel}
                                 disabled={deletingId === listing.id}
                                 actionLabel={'Удалить листинг'}
                                 currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};
export default PropertiesClient;