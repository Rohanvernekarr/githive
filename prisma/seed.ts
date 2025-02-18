
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'hastag2404@gmail.com' },
    update: {},
    create: {
      email: 'hastag2404@gmail.com',
      name: 'Test User',
      image: 'https://github.com/ghost.png',
    },
  })
  
  console.log(`Created test user with id: ${testUser.id}`)
  
  // Create example searches
  const searches = await Promise.all([
    prisma.search.create({
      data: {
        query: 'nextjs',
        userId: testUser.id,
      },
    }),
    prisma.search.create({
      data: {
        query: 'react',
        userId: testUser.id,
      },
    }),
  ])
  
  console.log(`Created ${searches.length} example searches`)
  
  // Create example favorite
  const favorite = await prisma.favorite.create({
    data: {
      repoName: 'next.js',
      repoOwner: 'vercel',
      description: 'The React Framework',
      stars: 94859,
      language: 'JavaScript',
      userId: testUser.id,
    },
  })
  
  console.log(`Created example favorite: ${favorite.repoOwner}/${favorite.repoName}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })