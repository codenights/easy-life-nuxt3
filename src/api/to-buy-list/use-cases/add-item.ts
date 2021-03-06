import Prisma from '@prisma/client'
const { PrismaClient } = Prisma

export class AddItemUseCase {

  async execute(listId: string, item: Prisma.Item) {
    const prisma = new PrismaClient()
    console.log(item)
    try {
      await prisma.list.update({
        where: {
          id: listId
        },
        data: {
          items: {
            create: [item]
          }
        }
      })
    } catch(e) {
      console.log(e)
    }
  }
}
