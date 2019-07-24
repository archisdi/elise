import BaseRepo from "./base/base_repository";

export default class UserRepo extends BaseRepo {
    public async findOne(username: string): Promise<object> {
        const db = await this.getDbInstance();
        return db.User.findOne({
            where: { username }
        });
    }
}
