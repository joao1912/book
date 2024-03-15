import { HttpNext, HttpRequest, HttpResponse } from "../../adapters/HTTPAdapter/protocol";
import { CustomError } from "../controllers/utils/CustomError";
import ServerResponse from "../controllers/utils/ServerResponse";



export default class ErrorHandler {

    public static execute(err: Error & Partial<ServerResponse>, req: HttpRequest, res: HttpResponse, next: HttpNext) {

        const statusCode = err.statusCode || 500;
        console.log('funciona caralho: ' + err)
        const message = err.statusCode ? err.message : 'Internal Server Error'

        return res.status(statusCode).json({
            message
        });

    }

}