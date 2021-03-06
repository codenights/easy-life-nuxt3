import { ToBuyListController } from './to-buy-list/to-buy-list.controller'
import { AddItemUseCase } from './to-buy-list/use-cases/add-item'
import { GetListUseCase } from './to-buy-list/use-cases/get-list'
import { RemoveItemUseCase } from './to-buy-list/use-cases/remove-item'

const getListUseCase = new GetListUseCase()
const addItemUseCase = new AddItemUseCase()
const removeItemUseCase = new RemoveItemUseCase()

const toBuyListController = new ToBuyListController(getListUseCase, addItemUseCase, removeItemUseCase)

export { toBuyListController }
