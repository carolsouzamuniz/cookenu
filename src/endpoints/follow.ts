import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { UserRelationDatabase } from '../data/UsersRelationDatabase';
import { Autheticator } from '../services/Authenticator';

export const follow = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const userToFollowId = req.body.userToFollowId

        const authenticator = new Autheticator();
        const authenticatorData = authenticator.verify(token);
        const userId = authenticatorData.id;

        if(!userToFollowId) {
            throw new Error('Insira um id válido')
        }
        
        const userDatabase = new UserDatabase();
        const user = await userDatabase.getById(userToFollowId);

        if(!user) {
            throw new Error('Usuário não existe')
        }
        
        const usersRelationDatabase = new UserRelationDatabase();
        await usersRelationDatabase.follow(
            userId,
            userToFollowId
        )

        res.status(200).send({
            message: "Usuário seguido com sucesso",
        })
    } catch (error) {
        res.status(400).send({
        message: error.message
        })
    }
    await BaseDatabase.destroyConnection();
}