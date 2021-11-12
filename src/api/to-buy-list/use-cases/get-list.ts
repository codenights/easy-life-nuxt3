import Prisma from '@prisma/client'
const { PrismaClient } = Prisma

export class GetListUseCase {
  async execute(id: string): Promise<any> {
    const prisma = new PrismaClient()
    let list

    list = await prisma.list.findUnique({
      where: {
        id
      },
      include: {
        items: true,
      },
    })

    console.log('beforeCreate', list)

    if(!list) {
      list = await prisma.list.create({
        data: {
          id
        }
      })
    }
    console.log('afterCreate', list)

    return list
  }
}
