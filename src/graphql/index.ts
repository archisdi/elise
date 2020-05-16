import * as ExpressGraphQL from 'express-graphql';
import schema from './schema';

export default ExpressGraphQL({
    graphiql: true,
    schema
});
