import { IContext, IData } from 'src/typings/common';
import RepoFactory from '../factories/repository';
import AuthMiddleware from '../middlewares/jwt_auth';
import Validator from '../middlewares/request_validator';
import { PostModel } from '../models/post_model';
import BaseController from './base/base_controller';
import PostTransformer from '../transformers/post_transformer';

export default class PostController extends BaseController {
    public constructor() {
        super();
        this.setMiddleware(AuthMiddleware);
    }

    public async createPost(data: IData, context: IContext): Promise<{ id: string }> {
        const postRepo = RepoFactory.getSql(PostModel);
        const post = await postRepo.create({
            ...data.body,
            author_id: context.user_id
        });
        return PostTransformer.PostDetail(post);
    }

    public async getPostList(data: IData, context: IContext): Promise<any> {
        const postRepo = RepoFactory.getSql(PostModel);
        const posts = await postRepo.paginate(
            { author_id: context.user_id },
            { page: 1, per_page: 10, sort: '-created_at' }
        );

        return PostTransformer.PostList(posts.data, posts.meta);
    }

    public async getPostDetail(data: IData, context: IContext): Promise<any> {
        const postRepo = RepoFactory.getSql(PostModel);
        const post = await postRepo.findOneOrFail({
            id: data.params.id,
            author_id: context.user_id
        });

        return PostTransformer.PostDetail(post);
    }

    public setRoutes(): void {
        this.addRoute('post', '/', this.createPost, Validator('createPost'));
        this.addRoute('get', '/', this.getPostList);
        this.addRoute('get', '/:id', this.getPostDetail);
    }
}
