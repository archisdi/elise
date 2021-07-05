import { Context } from 'src/typings/common';
import { UpdatePostRequest, UpdatePostResponse } from 'src/typings/endpoints';
import { Controller as BaseController, DBContext, RepoFactory, RequestData } from '@archisdi/zuu';
import API_ROUTE from '../entity/constant/api_route';
import PostTransformer from '../entity/mapper/post_mapper';
import { PostModel } from '../entity/models/post_model';
import PostCreatedEvent from '../event/post_created_event';
import AuthMiddleware from '../middleware/jwt_auth';
import PostService from '../service/interfaces/post_service';
import { SCHEME } from '../utility/validator';

export default class PostController extends BaseController {
    public constructor(
        private postService: PostService
    ) {
        super({ path: API_ROUTE.POST, middleware: AuthMiddleware() });
    }

    public async createPost(data: RequestData, context: Context): Promise<{ id: string }> {
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

    public async getPostList(data: RequestData, context: Context): Promise<any> {
        const posts = await PostModel.repo.paginate(
            { author_id: context.user_id },
            { page: 1, per_page: 10, sort: '-created_at' }
        );

        return PostTransformer.PostList(posts.data, posts.meta);
    }

    public async getPostDetail(data: RequestData, context: Context): Promise<any> {
        const post = await this.postService.findPost(data.params.id, context);
        return post.toJson();
    }

    public async updatePost(data: UpdatePostRequest, context: Context): Promise<UpdatePostResponse> {
        const { body } = data;

        const post = await PostModel.repo.findOneOrFail({ id: data.params.id, author_id: context.user_id });

        await post.update(body, { save: true });
        // await post.save();

        return {
            id: post.id
        };
    }

    public setRoutes(): void {
        this.addRoute('post', '/', this.createPost.bind(this), { validate: SCHEME.CREATE_POST });
        this.addRoute('get', '/', this.getPostList.bind(this));
        this.addRoute('get', '/:id', this.getPostDetail.bind(this), { cache: true });
        this.addRoute('put', '/:id', this.updatePost.bind(this), { validate: SCHEME.UPDATE_POST });
    }
}
