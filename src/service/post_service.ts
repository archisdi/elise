import PostModel from '../entity/models/post_model';
import PostRepository from '../repository/interfaces/post_repository';
import { Context } from '../typings/common';
import PostService from './interfaces/post_service';

export class PostServiceImpl implements PostService {

    constructor(
        private postRepository: PostRepository
    ){}

    public async findPost(id: string, context: Context): Promise<PostModel> {
        return await this.postRepository.findOneOrFail({
            author_id: context.user_id,
            id
        });
    }
}

export default PostServiceImpl;
