import { IContext, IData } from 'src/typings/common';
import { UpdatePostRequest, UpdatePostResponse } from 'src/typings/endpoints';
import { DBContext } from 'tymon';
import PostCreatedEvent from '../events/post_created_event';
import RepoFactory from '../factories/repository';
import AuthMiddleware from '../middlewares/jwt_auth';
import { PostModel } from '../models/post_model';
import PostTransformer from '../transformers/post_transformer';
import { SCHEMA } from '../utils/validator';
import BaseController from './base/base_controller';

export default class PostController extends BaseController {
    public constructor() {
        super({ path: '/post', middleware: AuthMiddleware() });
    }

    public async createPost(data: IData, context: IContext): Promise<{ id: string }> {
        try {
            await DBContext.startTransaction();

            const postRepo = RepoFactory.getSql(PostModel);
            const post = await postRepo.create({
                ...data.body,
                author_id: context.user_id
            });

            /** dispatch async event */
            await PostCreatedEvent.dispatch({ post: post.toJson() });

            /** commit transaction */
            await DBContext.commit();

            return PostTransformer.PostDetail(post);
        } catch (error) {
            await DBContext.rollback();
            throw error;
        }
    }

    public async getPostList(data: IData, context: IContext): Promise<any> {
        const posts = await PostModel.repo.paginate(
            { author_id: context.user_id },
            { page: 1, per_page: 10, sort: '-created_at' }
        );

        return PostTransformer.PostList(posts.data, posts.meta);
    }

    public async getPostDetail(data: IData, context: IContext): Promise<any> {
        const post = await PostModel.repo.findOneOrFail({
            id: data.params.id,
            author_id: context.user_id
        });

        return PostTransformer.PostDetail(post);
    }

    public async updatePost(data: UpdatePostRequest, context: IContext): Promise<UpdatePostResponse> {
        const { body } = data;

        const post = await PostModel.repo.findOneOrFail({ id: data.params.id, author_id: context.user_id });

        await post.update(body, { save: true });
        // await post.save();

        return {
            id: post.id
        };
    }

    public setRoutes(): void {
        this.addRoute('post', '/', this.createPost, { validate: SCHEMA.CREATE_POST });
        this.addRoute('get', '/', this.getPostList);
        this.addRoute('get', '/:id', this.getPostDetail, { cache: true });
        this.addRoute('put', '/:id', this.updatePost, { validate: SCHEMA.UPDATE_POST });
    }
}
