import { PostModel } from '../models/post_model';
import { IPagination } from 'src/typings/common';

export default class PostTransformer {
    public static PostList(posts: PostModel[], pagination: IPagination): any {
        return {
            content: posts.map((post): any => ({
                id: post.id,
                title: post.title,
                created_at: post.created_at
            })),
            pagination
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
