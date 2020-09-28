import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { UserRelationDatabase } from '../data/UsersRelationDatabase';
import { Autheticator } from '../services/Authenticator';

export const unfollow = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const userToUnfollowId = req.body.userToUnfollowId

        const authenticator = new Autheticator();
        const authenticatorData = authenticator.verify(token);
        const userId = authenticatorData.id;

        if(!userToUnfollowId) {
            throw new Error('Insira um id válido')
        }
        
        const userDatabase = new UserDatabase();
        const user = await userDatabase.getById(userToUnfollowId);

        if(!user) {
            throw new Error('Usuário não existe')
        }
        
        const usersRelationDatabase = new UserRelationDatabase();
        await usersRelationDatabase.unfollow(
            userId,
            userToUnfollowId
        )

        res.status(200).send({
            message: "Você deixou de seguir o usuário",
        })
    } catch (error) {
        res.status(400).send({
        message: error.message
        })
    }
    await BaseDatabase.destroyConnection();
}