import fileUpload from 'express-fileupload';

import Post, {IPost} from '../dto/post';
import {fileService} from '../services/fileService';


class PostService {
  public async create(post: IPost, picture: fileUpload.UploadedFile | fileUpload.UploadedFile[] | undefined) {
    let fileName: string | undefined;
    let errorMessage: string | undefined;
    if(picture !== undefined) {
      if(picture && Array.isArray(picture)){
        picture = picture[0];
      }

      let r = fileService.saveFile(picture);
      fileName = r?.fileName;
      errorMessage = r?.errorMessage;
    }
    return {post: await Post.create<IPost>({...post, picture: fileName}), errorMessage};
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

  public async saveFile (id: string, picture: fileUpload.UploadedFile | fileUpload.UploadedFile[] | undefined) {
    if (picture === undefined) {
      throw new Error("Файл не прикреплен");
    }

    if(Array.isArray(picture)) {
      picture = picture.shift();
    }

    const post = await Post.findById(id);
    if(!post) {
      throw new Error(`post ${id} not found`);
    }
    const fileName = fileService.saveFile(picture!);
    return {fileName, postTitle: post.title};
  }

}

export const postService = new PostService(); 