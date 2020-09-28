import { BaseDatabase } from "./BaseDatabase";

export class UserRelationDatabase extends BaseDatabase{
    private static TABLE_NAME = "Cookenu_Follow";

    public async follow(
        userId: string, 
        userToFollowId: string
    ): Promise<void> {
        await this.getConnection()
        .insert({
            user_id: userId,
            user_to_follow_id: userToFollowId
        })
        .into(UserRelationDatabase.TABLE_NAME)
    }

    public async unfollow(
        userId: string, 
        userToUnfollowId: string
    ): Promise<void> {
        await this.getConnection()
        .delete()
        .from(UserRelationDatabase.TABLE_NAME)
        .where({
            user_id: userId,
            user_to_follow_id: userToUnfollowId
        })
    }   
}