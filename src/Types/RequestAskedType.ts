import { UserType } from "./UserType";

export type requestAskedType = {
  uid: string;
  createdBy: UserType;
  createdAt: Date;
  status: string;
  subject: string;
  description: string;
  codeSnippet?: string;
  linkToSandbox?: string;
  languages: string[];
  technologies: string[];
  roomId?: string;
}