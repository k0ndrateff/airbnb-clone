import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import PropertiesClient from "@/app/properties/PropertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title={'Вы не авторизованы'} subtitle={'Пожалуйста, войдите, чтобы увидеть эту страницу'} />
            </ClientOnly>
        );
    }

    const listings = await getListings({ userId: currentUser.id });

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title={'Нет опубликованных листингов'} subtitle={'Похоже, вы ещё не публиковали жильё'} />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <PropertiesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    );
};
export default PropertiesPage;