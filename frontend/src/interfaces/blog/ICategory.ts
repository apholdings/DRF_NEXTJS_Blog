import { IMedia } from '../media/IMedia';

export interface ICategory {
  parent: any;
  name: string;
  title: string;
  description: string;
  thumbnail: IMedia;
  slug: string;
}

export interface ICategoryList {
  name: string;
  thumbnail: IMedia;
  slug: string;
}
