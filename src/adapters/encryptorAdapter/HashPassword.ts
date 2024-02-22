import { hashSync, genSaltSync, compare } from "bcrypt";
import { IEncryptorAdapterRepository } from "./repository/IEncryptorAdapterRepository";

export class HashPassword implements IEncryptorAdapterRepository {

    public hash(password: string): string {

        const saltRounds = Number(process.env.SALT_HASH)
        const salt = genSaltSync(saltRounds)

        const passwordHash = hashSync(password, salt)

        return passwordHash

    }

    public async validadePassword(password: string, hash: string): Promise<boolean> {

        return await compare(password, hash)

    }

}