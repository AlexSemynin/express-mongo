import Post, {IPost} from '../dto/post';
import { postRouter } from '../endpoints/postRouter';

class PostService {
  public async create(post: IPost) {
    return await Post.create<IPost>(post);
  }

  public async getAll () {
    return await Post.find();
  }

  public async getOne (id: string) {
    if(id === undefined){
      throw new Error("Не указан _id");
    }
    return await Post.findById(id);
  }

  public async update (post: IPost & { _id: string }) {
    if(!post._id) {
      throw new Error("Не указан _id");
    }

    return await Post.findByIdAndUpdate(post._id, post, {new: true});
  }

  public async delete (id: string | undefined) {
    if(id === undefined) {
      throw new Error("Не указан _id");
    }
    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
  }

}

export const postService = new PostService(); 