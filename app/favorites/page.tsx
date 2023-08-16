import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import FavoritesClient from "@/app/favorites/FavoritesClient";

const FavoritesPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title={'Нет избранных мест'} subtitle={'Похоже, вы ещё не отметили ни одно место избранным'} />
            </ClientOnly>
        );
    }

    return (
      <ClientOnly>
          <FavoritesClient listings={listings} currentUser={currentUser} />
      </ClientOnly>
    );
};
export default FavoritesPage;