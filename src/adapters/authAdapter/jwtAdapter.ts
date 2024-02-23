import * as jwt from "jsonwebtoken";
import { IAuthAdapterRepository } from "./repository/IAuthAdapterRepository";
import { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
    
    id: string;
}

class AuthJwt implements IAuthAdapterRepository {

    public sign(id: string, expiration?: number) {

        let secretKey = process.env.MY_SECRET


        if (secretKey != undefined) {

            try {
                const jwtToken = jwt.sign(

                    { id: id },
                    secretKey,
                    {expiresIn: expiration ? expiration : 1209600000}
    
                )
                return jwtToken
            } catch (error) {
                throw new Error('Internal server error: ' + error)
            }
            
        } else {

            throw new Error('Internal server error: failed to attempt to find secret_key')

        }
    }

    public checkToken(token: string): string | null {
        try {
            const secretKey = process.env.MY_SECRET;
    
            if (secretKey !== undefined) {
                const decoded = jwt.verify(token, secretKey) as TokenPayload;
                return decoded.id;
            } else {
                throw new Error('Chave secreta não definida');
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public getAuth() {
        return jwt
    }
}

export default new AuthJwt()
