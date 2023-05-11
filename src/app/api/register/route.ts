/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { prisma } from '~/server/db'

export async function POST(
  request: Request
) {
  const body = await request.json()

  const { email, name, password } = body

  if (!email || !name || !password) {
    return NextResponse.error()
  }

  const hashedPassword = await bcrypt.hash(password as string, 12)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  })

  return NextResponse.json(user)
}