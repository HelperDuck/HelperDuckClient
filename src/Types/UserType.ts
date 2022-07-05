export type UserType = {
  uid?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  userBio?: string;
  profilePic?: string;
  technologies?: string[];
  languages?: string[];
  gitHubProfile?: string;
  avgTip?: Number;
  rating?: Number;
  helpOffers?: any;
  helpRequests?: any;
};

export type UserForHelpType = {
  uid?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  userName?: string;
  email?: string;
  userBio?: string;
  profilePic?: string;
  technologies?: string[];
  languages?: string[];
  gitHubProfile?: string;
  updatedAt: string;
  openedRequests?: Number;
  acceptedRequests?: Number;
  avgTip?: Number;
  rating?: Number;
};