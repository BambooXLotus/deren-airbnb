import getCurrentUser from '~/actions/getCurrentUser';

import { NextResponse } from 'next/server'
import { prisma } from '~/server/db'

type deleteReservationParams = {
  listingId?: string
}

export async function DELETE(
  request: Request,
  { params }: { params: deleteReservationParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    return NextResponse.error()
  }

  const reservation = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(reservation)
}