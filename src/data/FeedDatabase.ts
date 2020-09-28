import { BaseDatabase } from "./BaseDatabase";

export class FeedDatabase extends BaseDatabase{
    public async getFeed(userId: string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT Cookenu_Recipes.recipe_id, title, description, createdAt, Cookenu_User.id, Cookenu_User.name
            FROM Cookenu_Recipes
            JOIN Cookenu_Follow
            ON Cookenu_Follow.user_to_follow_id = Cookenu_Recipes.user_id
            AND Cookenu_Follow.user_id = '${userId}'
            JOIN Cookenu_User
            ON Cookenu_Recipes.user_id = Cookenu_User.id
        `)
        return result[0]
    }
}
