import { App as BaseApp, DBContext, RedisContext } from 'zuu';
import AuthController from './controller/auth_controller';
import PostController from './controller/post_controller';
import ProfileController from './controller/profile_controller';
import QuoteModel from './entity/models/quote_model';
import PostRepositoryImpl from './repository/post_repository';
import UserRepositoryImpl from './repository/user_repository';
import PostServiceImpl from './service/post_service';
import StarwarsOutboundServiceImpl from './service/starwars_outbound_service';
import UserServiceImpl from './service/user_service';

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
        const starwarsService = new StarwarsOutboundServiceImpl;

        /** Register Controller */
        this.addController(new AuthController(userService));
        this.addController(new ProfileController(userService, starwarsService));
        this.addController(new PostController(postService));

        /** Generate CRUD from model */
        this.addControllerFromModel(QuoteModel);
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
