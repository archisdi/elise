import { Service } from '@archisdi/zuu';
import UserModel from '../../entity/models/user_model';

interface UserService extends Service {
    signUser(username: string, password: string): Promise<{ token: string; refresh_token: string; lifetime: number; }>
    getUser(id: string): Promise<UserModel>
}

export default UserService;
