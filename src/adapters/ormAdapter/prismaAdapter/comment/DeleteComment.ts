import { prisma } from "../db";
import { IDeleteComment, IDeleteMessage } from "../../repositories/comment/IDeleteComment";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteComment implements IDeleteComment {
    //@ts-ignore
    async execute(id: string): Promise<IDeleteMessage> {
       
        try {
            
            await prisma.comment.delete({
                where: {
                    id: id
                }
            })

            const message: IDeleteMessage =  {
                message: 'Comentário deletado com sucesso!'
            }

            return message

        } catch (error) {
            
            handlePrismaError("CommentError", error)
          
        }
    }
}