import { GraphQLObjectType, GraphQLString } from 'graphql';
import { PostModel } from 'src/models/post_model';
import { RepoFactory } from 'zuu';
import AuthorModel from './author';

export const PostGraphQL = new GraphQLObjectType({
    name: 'Post',
    fields: (): any => ({
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
        author: {
            type: AuthorModel.schema,
            resolve: AuthorModel.resolver
        },
        created_at: {
            type: GraphQLString
        },
        updated_at: {
            type: GraphQLString
        }
    })
});

export default {
    schema: PostGraphQL,
    resolver: (parentValue: any, args: any): any => {
        const postRepo = RepoFactory.getSql(PostModel);
        return postRepo.findOne({ id: args.id }).then((res): any => (res ? res.toJson() : null));
    }
};
