import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';
import RepoService from '../utils/factory/repository';
import { PostModel } from '../models/post_model';
import { UserModel } from '../models/user_model';

export const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: (): any => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        }
    })
});

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: (): any => ({
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parentValue: any, args: any): any {
                const userRepo = RepoService.getSql(UserModel);
                return userRepo.findOne({ id: parentValue.author_id }).then((res): any => (res ? res.toJson() : null));
            }
        },
        created_at: {
            type: GraphQLString
        },
        updated_at: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args): any {
                const postRepo = RepoService.getSql(PostModel);
                return postRepo.findOne({ id: args.id }).then((res): any => (res ? res.toJson() : null));
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});
