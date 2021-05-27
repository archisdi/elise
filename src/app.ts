import { App as BaseApp, DBContext, RedisContext } from 'zuu';
import AuthController from './controllers/auth_controller';
import PostController from './controllers/post_controller';
import ProfileController from './controllers/profile_controller';
import UserServiceImpl from './services/user_service';
import UserRepositoryImpl from './repositories/user_repository';

class App extends BaseApp {
    public constructor(port: number) {
        super(port);
    }

    public setControllers(): void {

        /** initiate services */
        const userService = new UserServiceImpl(
            new UserRepositoryImpl
        );

        /** Register Controller */
        this.addController(new AuthController(userService));
        this.addController(new ProfileController(userService));
        this.addController(PostController);
    }

    public setSingletonModules(): void {
        DBContext.initialize({
            connection_string: String(process.env.DB_CONNECTION_STRING),
            models_path: '/database/models'
        });
        RedisContext.initialize({
            connection_string: String(process.env.REDIS_CONNECTION_STRING)
        });
    }
}

export default App;
