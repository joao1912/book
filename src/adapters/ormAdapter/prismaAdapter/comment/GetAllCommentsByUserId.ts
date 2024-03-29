import { Comment } from "../../../../entities/Comment";
import { IGetAllCommentsByUserId } from "../../repositories/comment/IGetAllCommentsByUserId";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";



export class GetAllCommentsByUserId implements IGetAllCommentsByUserId {
    //@ts-ignore
    async execute(userId: string): Promise<Comment[]> {

        try {
            
            const comments = await prisma.comment.findMany({
                where: {
                    fk_id_user: userId
                }
            })

            let AllCommentsInstances: Comment[] = []

            for(let comment of comments) {

                const commentInstance = new Comment({
                    id: comment.id,
                    bookId: comment.fk_id_book,
                    userId: comment.fk_id_user,
                    comment: comment.comment
                })

                AllCommentsInstances.push(commentInstance)

            }

            return AllCommentsInstances

        } catch (error) {

            handlePrismaError("CommentError", error)
            
        }

    }

}