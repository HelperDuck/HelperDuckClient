export type UserType = {
  userId: string;
  username: string,
  userBio: string;
  profilePic?: string,
  languages: string[];
  openedRequests: Number;
  acceptedRequests: Number;
  avgTip: Number;
  rating: Number; 
}