import { LanguagesInHelpRequestType } from "./LanguagesType";
import { TechnologiesInHelpRequestType } from "./TechnologiesType";
import { UserForHelpType } from "./UserType";


export type requestAskedType = {
  helpOffers?: any;
  id?: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  subject?: string;
  description?: string;
  codeSnippet?: string;
  linkToSandbox?: string;
  roomId?: string;
  user?: UserForHelpType;
  technologies?: TechnologiesInHelpRequestType[];
  languages?: LanguagesInHelpRequestType[];
//TODO create the corret type
}