import { prisma } from '~/server/db';

export type getListingsParams = {
  userId?: string
}

export default async function getListings(params: getListingsParams) {

  const { userId } = params

  const query: any = {
  }

  if (userId) {
    query.userId = userId
  }

  const listings = await prisma.listing.findMany({
    where: query,
    orderBy: {
      createdAt: 'desc'
    }
  })

  return listings

}