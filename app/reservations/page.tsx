import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationsClient from "@/app/reservations/ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title={'Вы не авторизованы'} subtitle={'Пожалуйста, войдите, чтобы увидеть эту страницу'} />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations.length === 0) {
        return (
          <ClientOnly>
              <EmptyState title={'Брони не найдены'} subtitle={'Похоже, у вас ещё не бронировали жильё'} />
          </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ReservationsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    );
};
export default ReservationsPage;