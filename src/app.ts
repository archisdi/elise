import { DBContext, RedisContext } from 'tymon';
import BaseApp from './base_app';
import AuthController from './controllers/auth_controller';
import PostController from './controllers/post_controller';
import ProfileController from './controllers/profile_controller';
import GraphQL from './graphql';

export default class App extends BaseApp {
    public constructor(port: number) {
        super(port);
    }

    public setControllers(): void {
        this.addController(AuthController);
        this.addController(ProfileController);
        this.addController(PostController);
        this.app.use('/graphql', new GraphQL({ enable_graphiql: true, is_protected: true }).getInstance());
    }

    public setSingletons(): void {
        DBContext.initialize({
            connection_string: String(process.env.DB_CONNECTION_STRING),
            models_path: '/database/models'
        });
        RedisContext.initialize({
            connection_string: String(process.env.REDIS_CONNECTION_STRING)
        });
    }
}
