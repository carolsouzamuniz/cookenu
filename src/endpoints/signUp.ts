import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Autheticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';

export const signUp = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if(!name || !email || !password) {
            throw new Error('Preencha todos os campos para concluir o cadastro');
        }
        if(password.length < 6) {
            throw new Error('A senha deve conter no mínimo 6 caracteres');
        }
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("E-mail inválido.")
        }

        
        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password);

        const userDatabase = new UserDatabase();
        await userDatabase.signUp(
            id,
            name,
            email,
            hashPassword
        );
        
        const authenticator = new Autheticator();
        const token = authenticator.generateToken({id});

        res.status(200).send({
            message: "Usuário criado com sucesso",
            token: token
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
    await BaseDatabase.destroyConnection();
}