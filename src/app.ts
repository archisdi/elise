import { App as BaseApp, DBContext, RedisContext } from 'zuu';
import AuthController from './controller/auth_controller';
import PostController from './controller/post_controller';
import ProfileController from './controller/profile_controller';
import UserServiceImpl from './service/user_service';
import UserRepositoryImpl from './repository/user_repository';
import PostServiceImpl from './service/post_service';
import { PostRepositoryImpl } from './repository/post_repository';

class App extends BaseApp {
    public constructor(port: number) {
        super(port);
    }

    public setControllers(): void {
        /** initiate services */
        const userService = new UserServiceImpl(
            new UserRepositoryImpl
        );
        const postService = new PostServiceImpl(
            new PostRepositoryImpl
        );

        /** Register Controller */
        this.addController(new AuthController(userService));
        this.addController(new ProfileController(userService));
        this.addController(new PostController(postService));
    }

    public setSingletonModules(): void {
        DBContext.initialize({
            connection_string: String(process.env.DB_CONNECTION_STRING),
            models_path: '../database/models'
        });
        RedisContext.initialize({
            connection_string: String(process.env.REDIS_CONNECTION_STRING)
        });
    }
}

export default App;
