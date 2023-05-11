import getCurrentUser from '~/actions/getCurrentUser';

import { NextResponse } from 'next/server'
import { prisma } from '~/server/db'
import { type RentFormInput } from '~/components/modals/RentModal';


export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = await request.json()

  const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body as RentFormInput


  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  })

  return NextResponse.json(listing)
}