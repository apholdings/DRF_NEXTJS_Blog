import { IUser } from '../auth/IUser';
import { IMedia } from '../media/IMedia';
import { ICategory, ICategoryList } from './ICategory';
import { IHeading } from './IHeading';

export interface IPost {
  id: string;
  user: any;
  title: string;
  description: string;
  content: string;
  thumbnail: IMedia;
  keywords: string;
  slug: string;
  category: ICategory;
  created_at: string;
  updated_at: string;
  status: string;
  headings: IHeading[];
  view_count: number;
  comments_count: number;
  has_liked: boolean;
  likes_count: number;
}

export interface IPostList {
  id: string;
  title: string;
  updated_at: string;
  created_at: string;
  description: string;
  thumbnail: IMedia;
  slug: string;
  category: ICategoryList;
  view_count: string;
  user: IUser;
  status: string;
}
