import express from 'express';
import { IPost } from '../dto/post';
import {postService} from '../services/postSevice';

class PostConteroller {
  public async create (req: express.Request, resp: express.Response) {
    try{
      const {author, content, title}: IPost = req.body;
      const picture = req.files?.picture;
      const {post, errorMessage} = await postService.create({author, content, title}, picture);
      if(errorMessage !== undefined) {
        resp.status(200).json({post, errorMessage});
        return;
      }
      resp.status(200).json(post);
    } catch(e: any) {
      resp.status(500).json(e.message);
    }
  }

  public async getAll (req: express.Request, resp: express.Response) {
    try{
      const posts = await postService.getAll();
      resp.status(200).json(posts);
    } catch(e: any) {
      resp.status(500).json(e.message);
    }
  }

  public async getOne (req: express.Request, resp: express.Response) {
    // try{
      const id: string = req.params.id;
      const post = await postService.getOne(id);
      if(!post){
        resp.status(400).json({message:`post ${id} not found`});
        return;
      }
      resp.status(200).json(post);
    // } catch(e: any){
    //   resp.status(500).json(e.message);
    // }
  }

  public async update (req: express.Request, resp: express.Response) {
    try{
      const post = req.body as IPost & {_id: string};
      const newPost = await postService.update(post);
      resp.status(200).json(newPost);
    } catch(e: any) {
      resp.status(500).json(e.message);
    }
  }

  public async delete (req: express.Request, resp: express.Response) {
    try{
      const id = req.params.id;
      const posts = await postService.delete(id);
      resp.status(200).json(posts);
    } catch(e: any) {
      resp.status(500).json(e.message);
    }
  }

  public async uploadPicture(req: express.Request, resp: express.Response){
    try {
      const id = req.params.id;
      if(id === undefined) {
        resp.status(400).json("не указан id поста в параметрах запроса");
      }
      const picture = req.files?.picture;
      const {fileName, postTitle} = await postService.saveFile(id, picture);
      resp.status(200).json({fileName, message: `Файл был успешно прикреплен к посту ${postTitle}`})
    } catch(e: any) {
      resp.status(500).json(e.message);
    }
  }
}

export const postController = new PostConteroller();
