import { IDeleteAllFinances } from "../../repositories/finance/IDeleteAllFinances";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";


export class DeleteAllFinances implements IDeleteAllFinances {
    //@ts-ignore
    async execute(): Promise<void> {
       
        try {

            await prisma.finance.deleteMany()

        } catch (error) {

            handlePrismaError("FinanceError", error)
        }

    }
    
}