import {Request, Response} from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { Autheticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export const createRecipe = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;

        const authenticator = new Autheticator();
        const authenticationData = authenticator.verify(token);
        const userId = authenticationData.id;

        const idGenerator = new IdGenerator();
        const recipeId= idGenerator.generateId();

        const {title, description} = req.body;

        const creationDate = Date.now();

        const recipeDatabase = new RecipeDatabase();
        await recipeDatabase.createRecipe(
            recipeId,
            userId,
            title,
            description,
            creationDate
        )
        
        res.status(200).send({
            message: "Receita criada com sucesso",
        });

    } catch (error) {
        res.status(400).send({
            message: error.message
            })    
    }
    await BaseDatabase.destroyConnection();
}