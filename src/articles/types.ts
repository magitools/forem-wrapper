import { IFlareTag, IOrganization, IUser } from "../utils/types";

export interface IArticle {
  type_of: "article";
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: string | null;
  social_image: string;
  canonical_url: string | null;
  created_at: string;
  edited_at: string;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string;
  tags: string[];
  user: IUser;
  organization: IOrganization | null;
  flare_tag: IFlareTag | null;
}

export interface IArticleDetails extends IArticle {
  body_html: string;
  body_markdown: string;
}

export interface IPublishedInput {
  page?: number;
  per_page?: number;
  tag?: string;
  tags?: string;
  tags_exclude?: string;
  username?: string;
  state?: "fresh" | "rising" | "all";
  top?: number;
  collection_id?: number;
}

export interface IPaginationInput {
  page?: number;
  per_page?: number;
}

export interface IPublishedByPathInput {
  username: string;
  slug: string;
}

export interface IPublishedByOrganizationInput extends IPaginationInput {
  username: string;
}

export interface IVideoArticle {
  type_of: "video_article";
  id: number;
  path: string;
  cloudinary_video_url: string;
  title: string;
  user_id: number;
  video_duration_in_minutes: string;
  video_source_url: string;
  user: {
    name: string;
  };
}

export interface IPublishArticleInput {
  title: string;
  body_markdown: string;
  published: boolean;
  series?: string;
  main_image?: string;
  canonical_url?: string;
  description?: string;
  tags?: string;
  organization_id?: number;
}
