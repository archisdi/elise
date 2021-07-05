import { Page, PaginationMeta } from '@archisdi/zuu';
import { PostModel, PostProperties } from '../models/post_model';

export default class PostTransformer {
    public static PostList(posts: PostModel[], pagination: PaginationMeta): Page<Partial<PostProperties>> {
        return {
            data: posts.map((post): any => ({
                id: post.id,
                title: post.title,
                created_at: post.created_at
            })),
            meta: pagination
        };
    }

    public static PostDetail(post: PostModel): any {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            author_id: post.author_id
        };
    }
}
