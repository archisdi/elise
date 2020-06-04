import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import PostEndpoint from './post';

export const Query = new GraphQLObjectType({
    name: 'Endpoints',
    fields: {
        post: PostEndpoint
    }
});

export default new GraphQLSchema({
    query: Query
});
