export enum SchemaKey {
    user = "user",
    book = "book",
    comment = "comment",
    author = "author",
    finance = "finance",
    reservation = "reservation",
    stock = "stock"
}

export interface IValidatorAdapterRepository {

    validateSchema<T>(data: T, schemaKey: SchemaKey): T

    validateId(id: string | undefined): string 

    validatePartial<T extends object>(data: T, schemaKey: SchemaKey): T

}

