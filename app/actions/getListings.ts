import prisma from '@/app/libs/prismadb';

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }));
    }
    catch (error: any) {
        throw new Error(error);
    }
}