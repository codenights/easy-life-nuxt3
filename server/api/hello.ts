import type {IncomingMessage, ServerResponse} from "http";
import * as url from 'url'

export default async (req: IncomingMessage, res: ServerResponse) => {
  //hello?search=123
  //{ search: 123 }
  const queryObject = url.parse(req.url as string, true).query
  let data = { data: [{ data: ''}]}

  const { search } = queryObject
  console.log(search)
  if (search) {
    data = await $fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyB9p_R_ZOesOQLXyjGu-kT11P7VrbAnMhg&cx=40bfd4a37dc4d4716&q=ean+${search}`)
    console.log(data)
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  })
  res.write(JSON.stringify(data))
  res.end()
}

