import { prisma } from '~/server/db';

export default async function getListings() {
  try {

    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })


    return listings
  } catch (error) {
    return null
  }
}