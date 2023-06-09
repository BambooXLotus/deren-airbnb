/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { prisma } from '~/server/db';

export type getListingsParams = {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

export default async function getListings(params: getListingsParams) {

  const {
    userId,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
    locationValue,
    category
  } = params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {
  }

  if (userId) {
    query.userId = userId
  }

  if (category) {
    query.category = category
  }

  if (guestCount) query.guestCount = {
    gte: +guestCount
  }

  if (roomCount) query.roomCount = {
    gte: +roomCount
  }

  if (bathroomCount) query.bathroomCount = {
    gte: +bathroomCount
  }

  if (locationValue) query.locationValue = locationValue

  if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            { endDate: { gte: startDate }, startDate: { lte: startDate } },
            { startDate: { lte: endDate }, endDate: { gte: endDate } }
          ]
        }
      }
    }
  }

  const listings = await prisma.listing.findMany({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    where: query,
    orderBy: {
      createdAt: 'desc'
    }
  })

  return listings

}