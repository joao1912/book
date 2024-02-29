import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllStock } from "../../../adapters/ormAdapter/protocols/stockProtocols";
import { IStock, Stock } from "../../../entities/Stock";
import { GetAllStockUseCase } from "../../../usecases/stock/GetAllStockUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";


class GetAllStock implements IController {

    async handle(req: HttpRequest, res: HttpResponse){
        try {
            const getAllStockUseCase = new GetAllStockUseCase(getAllStock)

            const stockInstances = await getAllStockUseCase.execute()

            let stockList: Array<IStock> = []

            for (let item of stockInstances) {

                stockList.push(
                    Formatter.handle<Stock>(item)
                )

            }

            res.status(200).json(stockList)

            
        } catch (error) {
            throw new Error ("Bad request " + error)
        }


    }
}
const getAllStockController = new GetAllStock()

export default getAllStockController