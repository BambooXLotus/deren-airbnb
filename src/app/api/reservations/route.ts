/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import getCurrentUser from '~/actions/getCurrentUser';

import { NextResponse } from 'next/server'
import { prisma } from '~/server/db'


export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { listingId, startDate, endDate, totalPrice } = body

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error()
  }

  const listingReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice
        }
      }
    }
  })

  return NextResponse.json(listingReservation)
}