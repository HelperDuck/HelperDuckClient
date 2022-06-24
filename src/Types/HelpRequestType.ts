import { UserType } from "./UserType";

export type HelpRequestType = {
  subjectLine: string;
  problemDescription: string;
  externalSandbox: string;
  techStack: string[];
  createdBy: UserType;
  createdAt: Date;
}