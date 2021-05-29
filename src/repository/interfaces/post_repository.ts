import { SQLRepo } from 'zuu';
import PostModel, { PostProperties } from '../../entity/models/post_model';

export type PostRepository = SQLRepo<PostModel, PostProperties>

export default PostRepository;