import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import PostEndpoint from './post';

export const QueryEndpoints = new GraphQLObjectType({
    name: 'QueryEndpoints',
    fields: {
        post: PostEndpoint
    }
});

export default new GraphQLSchema({
    query: QueryEndpoints
});
