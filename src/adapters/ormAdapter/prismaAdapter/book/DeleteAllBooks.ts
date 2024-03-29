import { IDeleteAllBooks } from "../../repositories/book/IDeleteAllBooks";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteAllBooks implements IDeleteAllBooks {
    //@ts-ignore
    async execute(): Promise<void> {
        
        try {
           await prisma.book.deleteMany()
           
        } catch (error) {
            handlePrismaError("BookError", error)
            
        }

    }
}