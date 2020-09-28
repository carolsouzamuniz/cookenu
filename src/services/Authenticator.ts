import * as jwt from 'jsonwebtoken';

export class Autheticator {
    private static getExpireIn(): number {
        return Number(process.env.ACCESS_TOKEN_EXPIRES_IN)
    }

    public generateToken(data: AutheticationData): string {
        return jwt.sign(
            data,
            process.env.JWT_KEY as string,
            {expiresIn: Autheticator.getExpireIn()}
        ) 
    }
    public verify(token: string): AutheticationData {
        const data = jwt.verify(
            token,
            process.env.JWT_KEY as string
            ) as any;
            return {
                id: data.id
            }
    }
}

interface AutheticationData {
    id: string
}