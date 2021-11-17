import { IncomingMessage, ServerResponse } from 'http'
import { toBuyListController } from "../../src/api/dependency-injection";

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { method } = req
  console.log('hey', method)
  try {
    switch (method) {
      case 'GET': {
        console.log('GET')
        await toBuyListController.getList(req, res)
        break;
      }
      case 'POST': {
        console.log('POST')
        await toBuyListController.addItem(req, res)
        break;
      }
      case 'PUT': {
        console.log('PUT')
        break;
      }
      case 'DELETE': {
        console.log('DELETE')
        await toBuyListController.removeItem(req, res)
        break;
      }
      default: {
        res.writeHead(405, {
          'Allow': ['GET', 'POST'],
        })
      }
    }
  } catch (e) {
    console.log(e)
  }

  res.end()
}


