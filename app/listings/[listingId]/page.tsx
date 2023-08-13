import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "@/app/listings/[listingId]/ListingClient";

interface IParams {
    listingId?: string;
}

const listingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
          <ClientOnly>
                <EmptyState />
          </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ListingClient listing={listing} currentUser={currentUser} />
        </ClientOnly>
    );
};
export default listingPage;