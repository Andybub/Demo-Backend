// import { PrismaClient } from '@prisma/client'
import Koa from 'koa'
import { router } from './routes'

const app = new Koa()

const port = 3000;


// const prisma = new PrismaClient()

// async function main() {
//   // ... you will write your Prisma Client queries here
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

app.use(router.routes())

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})