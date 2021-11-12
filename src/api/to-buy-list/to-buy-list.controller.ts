import { IncomingMessage, ServerResponse } from "http";
import { GetListUseCase } from "./use-cases/get-list";
import {AddItemUseCase} from "./use-cases/add-item";
import {RemoveItemUseCase} from "./use-cases/remove-item";
import url from 'url'
import { parse } from 'querystring'


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
    console.log(req)
    const queryObject = url.parse(req.url as string, true).query
    const { id } = queryObject
    const list = await this.getListUseCase.execute(id)
    res.write(JSON.stringify(list))
  }

  async addItem(req, res: ServerResponse) {
    collectRequestData(req, async result => {
      console.log('result', result)
      const item = createItem({ title: result.title })
      await this.addItemUseCase.execute(result.listId, item)
      res.write(`Parsed data belonging to ${result.fname}`);
    })
  }

  async removeItem(req: IncomingMessage, res: ServerResponse) {
    console.log(req)
    const queryObject = url.parse(req.url as string, true).query
    const { id } = queryObject
    await this.removeItemUseCase.execute(id)
  }
}

const collectRequestData = (req: IncomingMessage, callback) => {
  let body = '';
  console.log('collect')
  req.on('data', chunk => {
    console.log('addData', chunk)
    body += chunk.toString();
  });
  req.on('end', () => {
    console.log('parse', JSON.parse(body))
    callback(JSON.parse(body));
  });
}

const createItem = item => ({
  ...item
})
