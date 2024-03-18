import { CustomError } from "../../interface/controllers/utils/CustomError";
import ServerResponse from "../../interface/controllers/utils/ServerResponse";
import { IValidatorAdapterRepository, SchemaKey, schemaMap } from "./repository/IValidatorAdapterRepository";
import { z } from "zod";

export class ZodAdapter implements IValidatorAdapterRepository {

    validateSchema<T>(data: T, schemaKey: SchemaKey): T {

        const schema = schemaMap[schemaKey];

        const result = schema.safeParse(data)

        if (!result.success) {

            const errors = result.error.issues

            throw new CustomError('ValidatorError', JSON.stringify(errors), 400);

        } else {

            const validData = result.data as T
            
            return validData 
            
        }

    }

    validateId(id: string | undefined): string {

        const idZod = z.string().uuid({message: 'O id está inválido'})

        const result = idZod.safeParse(id)

        if (!result.success) {

            ServerResponse.badRequest('ValidatorError', JSON.stringify(result.error.issues))

        } else {

            return result.data

        }

    }

}
 