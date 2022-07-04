// export type reviewType = {
//   id?: number;
//   rating: number;
//   comment?: string;
//   role?: string;
//   helpOfferId?: number;
//   helpRequestId?: number;
//   userId?: number;
// };

export type reviewType = {
  tipGiven?: number;
  review: {
    rating: number;
    comment: string;
  };
};
