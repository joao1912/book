import { prisma } from "../../../../../prisma/db";
import { Comment } from "../../../../entities/Comment";
import { IGetCommentById } from "../../repositories/comment/IGetCommentById";

export class GetCommentById implements IGetCommentById {

    async execute(id: string): Promise<Comment | null> {

        try {

            const comment = await prisma.comment.findUnique({
                where: {
                    id: id
                }
            })

            if (comment == null) {
                return null
            }

            const commentInstance = new Comment({
                id: comment.id,
                bookId: comment.fk_id_book,
                userId: comment.fk_id_user,
                comment: comment.comment
            })

            return commentInstance
            
        } catch (error) {

            throw new Error('Internal server error' + error)
            
        }
    }
}