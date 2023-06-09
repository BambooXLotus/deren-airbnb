import getCurrentUser from '~/actions/getCurrentUser';

import { NextResponse } from 'next/server'
import { prisma } from '~/server/db'

type favoritesPostParams = {
  listingId: string
}

export async function POST(
  request: Request,
  { params }: { params: favoritesPostParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid Listing Id')
  }

  const favoriteIds = [...(currentUser).favoriteIds || []]

  favoriteIds.push(listingId);


  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(user)
}

export async function DELETE(
  request: Request,
  { params }: { params: favoritesPostParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid Listing Id')
  }

  let favoriteIds = [...(currentUser).favoriteIds || []]

  favoriteIds = favoriteIds.filter((favId) => favId !== listingId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(user)
}