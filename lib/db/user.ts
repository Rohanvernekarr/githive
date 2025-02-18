import { prisma } from '../prisma'
import { User } from 'next-auth'

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export async function createUser(data: {
  email: string
  name?: string
  image?: string
}) {
  return prisma.user.create({
    data,
  })
}

export async function getUserFavorites(userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getUserSearchHistory(userId: string, limit = 10) {
  return prisma.search.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}