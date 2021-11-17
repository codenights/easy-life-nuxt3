import { IncomingMessage, ServerResponse } from 'http'
import { GetListUseCase } from './use-cases/get-list'
import { AddItemUseCase } from './use-cases/add-item'
import { RemoveItemUseCase } from './use-cases/remove-item'
import url from 'url'
import { Item } from '~/src/api/models/item.interface'
import { v4 as uuid } from 'uuid'

export class ToBuyListController {
  private getListUseCase: GetListUseCase
  private addItemUseCase: AddItemUseCase
  private removeItemUseCase: RemoveItemUseCase

  constructor(getListUseCase: GetListUseCase, addItemUseCase: AddItemUseCase, removeItemUseCase: RemoveItemUseCase) {
    this.getListUseCase = getListUseCase
    this.addItemUseCase = addItemUseCase
    this.removeItemUseCase = removeItemUseCase
  }

  async getList(req: IncomingMessage, res: ServerResponse) {
    console.log('Get List Use Case')
    console.log(req)
    const queryObject = url.parse(req.url as string, true).query
    const { id } = queryObject
    const list = await this.getListUseCase.execute(id as string)
    res.write(JSON.stringify(list))
  }

  async addItem(req: IncomingMessage, res: ServerResponse) {
    console.log('Add Item Use Case', req)
    collectRequestData(req, async result => {
      console.log('result', result)
      const item = createItem(result.listId, result.title)
      await this.addItemUseCase.execute(result.listId, item)
      res.write(`Parsed data belonging to ${result.listId}`)
    })
  }

  async removeItem(req: IncomingMessage, res: ServerResponse) {
    console.log('Remove Item Use Case')
    console.log(req)
    const queryObject = url.parse(req.url as string, true).query
    const { id } = queryObject
    await this.removeItemUseCase.execute(id as string)
  }
}

const collectRequestData = (req: IncomingMessage, callback: (result: Item) => Promise<void>) => {
  let body = ''
  console.log('collect')
  req.on('data', chunk => {
    console.log('addData', chunk)
    body += chunk.toString()
  })
  req.on('end', async () => {
    console.log('parse', JSON.parse(body))
    await callback(JSON.parse(body))
  })
}

const createItem = (listId: string, title: string, picture?: string | null): Item => ({
  id: uuid(),
  title,
  picture: picture || null,
  createdAt: new Date(),
  updatedAt: new Date(),
  listId
})
