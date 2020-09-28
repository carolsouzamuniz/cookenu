import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Autheticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';

export const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req. body.password;

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getByEmail(email);

        const hashManager = new HashManager();
        const isPasswordCorrect = await hashManager.compare(password, user.password);

        if(!isPasswordCorrect) {
            throw new Error('Usuário ou senha incorreta');
        }

        const authenticator = new Autheticator();
        const token = authenticator.generateToken({id: user.id});

        res.status(200).send({
            message: "Usuário logado com sucesso",
            token: token
        })
    } catch (error) {
        res.status(400).send({
        message: error.message
        })
    }
    await BaseDatabase.destroyConnection();
}