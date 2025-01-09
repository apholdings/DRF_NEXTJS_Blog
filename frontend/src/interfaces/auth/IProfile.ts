import { IMedia } from '../media/IMedia';

export interface IProfile {
  profile_picture: IMedia;
  banner_picture: IMedia;
  biography: string;
  birthday: string;
  website: string;
  instagram: string;
  facebook: string;
  threads: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
  github: string;
  gitlab: string;
}
