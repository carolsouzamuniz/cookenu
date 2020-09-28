import {Request, Response} from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { FeedDatabase } from '../data/FeedDatabase';
import { Autheticator } from '../services/Authenticator';
import moment from 'moment';

export const getFeed = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const authenticator = new Autheticator();
        const authenticatorData = authenticator.verify(token);
        const userId = authenticatorData.id;

        const feedDatabase = new FeedDatabase();
        const feed = await feedDatabase.getFeed(userId);

        const mappedFeed = feed.map((item: any) => ({
            id: item.recipe_id,
            title: item.title,
            description: item.description,
            createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
            userId: item.id,
            userName: item.name
        }))

        res.status(200).send({mappedFeed})

    } catch (error) {
        res.status(400).send({
            message: error.message
            })    
    }
    await BaseDatabase.destroyConnection();
}

