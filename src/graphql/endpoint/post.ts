import { GraphQLString } from 'graphql';
import PostGraphQL from '../schema/author';

const PostEndpoint = {
    type: PostGraphQL.schema,
    args: {
        id: { type: GraphQLString }
    },
    resolve: PostGraphQL.resolver
};

export default PostEndpoint;
