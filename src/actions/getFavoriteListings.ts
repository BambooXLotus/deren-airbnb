import { prisma } from "~/server/db"
import getCurrentUser from "./getCurrentUser"

export default async function getFavoriteListings() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return []
  }

  const favorites = await prisma.listing.findMany({
    where: {
      id: {
        in: [...(currentUser.favoriteIds || [])]
      }
    }
  })

  return favorites
}