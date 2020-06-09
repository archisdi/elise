import { GraphQLObjectType, GraphQLString } from 'graphql';
import RepoFactory from '../../repositories';
import { UserModel } from '../../models/user_model';

export const AuthorGraphQL = new GraphQLObjectType({
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

export default {
    schema: AuthorGraphQL,
    resolver: (parentValue: any, args: any): any => {
        const userRepo = RepoFactory.getSql(UserModel);
        return userRepo.findOne({ id: parentValue.author_id }).then((res): any => (res ? res.toJson() : null));
    }
};
