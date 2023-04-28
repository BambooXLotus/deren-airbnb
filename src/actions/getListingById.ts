import { prisma } from '~/server/db';

type getListingByidParams = {
  listingId?: string
}

export default async function getListingById({ listingId }: getListingByidParams) {
  try {

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId
      },
      include: {
        user: true
      }
    })

    if (!listing)
      return null

    return listing
  } catch (error) {
    return null
  }
}