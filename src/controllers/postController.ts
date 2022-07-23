import express from 'express';
import { IPost } from '../dto/post';

import {postService} from '../services/postSevice';

class PostConteroller {
  public async create (req: express.Request, resp: express.Response) {
    try{
      //const {author, content, title, picture}: IPost = req.body;
      //const post = await Post.create<IPost>({author, content, title, picture});
      const post = await postService.create(<IPost>req.body);
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
    try{
      const id: string = req.params.id;
      const post = await postService.getOne(id);
      if(!post)
        resp.status(401).json({message:`post ${id} not found`});
      resp.status(200).json(post);
    } catch(e: any){
      resp.status(500).json(e.message);
    }
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
}

export const postController = new PostConteroller();
