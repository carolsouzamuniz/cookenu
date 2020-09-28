import { BaseDatabase } from './BaseDatabase';

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME: string = "Cookenu_User";

    public async signUp(
        id: string, 
        name: string, 
        email: string, 
        password: string
    ): Promise<void> {
        await this.getConnection()
        .insert({
            id,
            name,
            email,
            password
        }).into(UserDatabase.TABLE_NAME);
    }

    public async getByEmail (email: string): Promise<any> {
        const result = await this.getConnection()
        .select('*')
        .from(UserDatabase.TABLE_NAME)
        .where({email})

        return result[0];
    }

    public async getById (id: string): Promise<any> {
        const result = await this.getConnection()
        .select('*')
        .from(UserDatabase.TABLE_NAME)
        .where({id})

        return result[0];
    }


}