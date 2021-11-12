import Prisma from '@prisma/client'
const { PrismaClient } = Prisma

export class RemoveItemUseCase {

  async execute(itemId) {
    const prisma = new PrismaClient()
    try {
      await prisma.item.delete({
        where: {
          id: itemId
        },
      })
    } catch(e) {
      console.log(e)
    }
  }
}
