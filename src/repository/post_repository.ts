import { SQLRepo } from 'zuu';
import PostModel, { PostProperties } from '../entity/models/post_model';
import PostRepository from './interfaces/post_repository';

export class PostRepositoryImpl extends SQLRepo<PostModel, PostProperties> implements PostRepository {
    public constructor() {
        super(PostModel);
    }
}

export default PostRepositoryImpl;
