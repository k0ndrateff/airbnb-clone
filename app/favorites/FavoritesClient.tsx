import React from "react";
import {SafeListing, SafeUser} from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";

type FavoritesClientProps = {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
};

const FavoritesClient:React.FC<FavoritesClientProps> = ({ listings, currentUser }) => {
    return (
        <Container>
            <Heading title={'Ваши избранные места'} subtitle={'Места, которые вы посчитали хорошими'} />
            <div className={'mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' +
                ' 2xl:grid-cols-6 gap-8'}>
                {listings.map(listing => (
                    <ListingCard key={listing.id}
                                 data={listing}
                                 currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};
export default FavoritesClient;