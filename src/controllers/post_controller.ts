import { IContext, IData } from 'src/typings/common';
import Validator from '../middlewares/request_validator';
import { PostModel } from '../models/post_model';
import RepoService from '../utils/factory/repository';
import BaseController from './base/base_controller';
import AuthMiddleware from '../middlewares/jwt_auth';

export default class PostController extends BaseController {
    public constructor() {
        super();
        this.setMiddleware(AuthMiddleware);
    }

    public async createPost(data: IData, context: IContext): Promise<{ id: string }> {
        const postRepo = RepoService.getSql(PostModel);
        const post = await postRepo.create({
            ...data.body,
            author_id: context.user_id
        });
        return {
            id: post.id
        };
    }

    public async getPostList(data: IData, context: IContext): Promise<any> {
        const postRepo = RepoService.getSql(PostModel);
        const posts = await postRepo.paginate(
            { author_id: context.user_id },
            { page: 1, per_page: 10, sort: '-created_at' }
        );
        return {
            content: posts.data.map((item): any => item.toJson()),
            pagination: posts.meta
        };
    }

    public setRoutes(): void {
        this.addRoute('get', '/', this.getPostList);
        this.addRoute('post', '/', this.createPost, Validator('createPost'));
    }
}
