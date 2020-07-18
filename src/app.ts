import { DBContext, RedisContext } from 'tymon';
import BaseApp from './base_app';
import AuthController from './controllers/auth_controller';
import PostController from './controllers/post_controller';
import ProfileController from './controllers/profile_controller';
import GraphQL from './graphql';
import QuoteModel from './models/quote_model';

class App extends BaseApp {
    public constructor(port: number) {
        super(port);
    }

    public setControllers(): void {
        /** Register Controller */
        this.addController(AuthController);
        this.addController(ProfileController);
        this.addController(PostController);

        /** Register Auto Generated Crud Controller */
        this.addControllerFromModel(QuoteModel);

        /** Register GraphQL */
        const GraphQLModule = new GraphQL({
            enable_graphiql: true /** ui interface */,
            is_protected: true /** jwt protected */
        });

        /** GraphQL Endpoint */
        this.app.use('/graphql', GraphQLModule.getInstance());
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
