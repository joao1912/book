import { z, ZodType } from "zod";

export interface IAuthor {
    id?: string;
    name: string;
    description: string;
}

export const authorSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string()
        .min(3, { message: 'The author name must be at least 3 character long.' })
        .max(40, { message: "The author name must be a maximum of 40 characters in length." }),
    description: z.string()
    .min(12, { message: "The description must be at least 12 character long." })
    .max(200, { message: "The description must be a maximum of 200 characters in length" })
}) satisfies ZodType<IAuthor>


export class Author {

    readonly props: IAuthor

    constructor(props: IAuthor) {

        const { id, name, description } = props

        this.props = props

    }

    set id(id: string) {
        this.id = id
    }

    get Author() {
        return {
            name: this.props.name,
            description: this.props.description
        }
    }

}
