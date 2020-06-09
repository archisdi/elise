import { DBContext, RedisContext } from 'tymon';
import BaseApp from './base_app';
import AuthController from './controllers/auth_controller';
import PostController from './controllers/post_controller';
import ProfileController from './controllers/profile_controller';
import Events from './events';
import GraphQL from './graphql';

export default class App extends BaseApp {
    public constructor(port: number) {
        super(port);
    }

    public setControllers(): void {
        this.addController(AuthController);
        this.addController(ProfileController);
        this.addController(PostController);

        /** Register GraphQL */
        const GraphQLModule = new GraphQL({
            enable_graphiql: true /** ui interface */,
            is_protected: true /** jwt protected */
        });
        this.app.use('/graphql', GraphQLModule.getInstance());
    }

    public setSingletons(): void {
        DBContext.initialize({
            connection_string: String(process.env.DB_CONNECTION_STRING),
            models_path: '/database/models'
        });
        RedisContext.initialize({
            connection_string: String(process.env.REDIS_CONNECTION_STRING)
        });
        Events.initialize();
    }
}
