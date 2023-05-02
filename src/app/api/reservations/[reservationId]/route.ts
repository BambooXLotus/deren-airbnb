import getCurrentUser from '~/actions/getCurrentUser';

import { NextResponse } from 'next/server'
import { prisma } from '~/server/db'

type deleteReservationParams = {
  reservationId?: string
}

export async function DELETE(
  request: Request,
  { params }: { params: deleteReservationParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { reservationId } = params

  if (!reservationId || typeof reservationId !== 'string') {
    return NextResponse.error()
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } }
      ]
    },
  })

  return NextResponse.json(reservation)
}