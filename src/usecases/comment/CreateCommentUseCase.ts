import { ICreateComment } from "../../adapters/ormAdapter/repositories/comment/ICreateComment";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";
import { SchemaKey } from "../../adapters/validatorAdapter/repository/IValidatorAdapterRepository";
import { Comment, IComment } from "../../entities/Comment";


export class CreateCommentUseCase {

    protected createCommentService: ICreateComment

    constructor(ormAdapter: ICreateComment) {

        this.createCommentService = ormAdapter

    }

    async execute(commentData: IComment) {

        const validatedData = validatorAdapter.validateSchema<IComment>(commentData, SchemaKey.comment)

        const commentInstance = new Comment(validatedData)

        return await this.createCommentService.execute(commentInstance)

    }

}
