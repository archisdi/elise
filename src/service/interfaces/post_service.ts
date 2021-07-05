import { Context, Page, Service } from '@archisdi/zuu';
import PostModel, { PostProperties } from '../../entity/models/post_model';

export interface PostService extends Service {
    findPost(id: string, context: Context): Promise<PostModel>;
    // pagePost(context: Context): Promise<Page<Partial<PostProperties>>>;
    // createPost(data: PostProperties): Promise<PostModel>;
    // updatePost(id: string, data: PostProperties): Promise<PostModel>;
    // deletePost(id: string): Promise<void>;
}

export default PostService;
