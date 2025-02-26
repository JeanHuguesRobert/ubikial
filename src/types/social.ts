
export type SocialNetwork = "facebook" | "linkedin" | "twitter" | "github" | "generic";

export type Post = {
  id: string;
  network: SocialNetwork;
  content: string;
  date: string;
  engagement: number;
  personaId: string;
};

export type Credential = {
  id: string;
  network: SocialNetwork;
  username: string;
  profileUrl: string;
  apiKey?: string;
  personaIds: string[];
};

export type Persona = {
  id: string;
  name: string;
  description?: string;
};

export const NETWORK_API_DOCS = {
  twitter: "https://developer.twitter.com/en/docs/twitter-api",
  facebook: "https://developers.facebook.com/docs/",
  linkedin: "https://developer.linkedin.com/",
  github: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens",
  generic: "",
};
