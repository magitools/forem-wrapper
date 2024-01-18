export interface IUser {
  name: string;
  username: string;
  twitter_username: string | null;
  github_username: string | null;
  user_id: number;
  website_url: string | null;
  profile_image: string;
  profile_image_90: string;
}

export interface IOrganization {
  name: string;
  username: string;
  slug: string;
  profile_image: string;
  profile_image_90: string;
}

export interface IFlareTag {
  name: string;
  bg_color_hex: string;
  text_color_hex: string;
}
