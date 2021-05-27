import { Service as BaseService } from 'zuu';
import UserModel from '../../models/user_model';

interface UserService extends BaseService {
    signUser(username: string, password: string): Promise<{ token: string; refresh_token: string; lifetime: number; }>
    getUser(id: string): Promise<UserModel>
}

export default UserService;
