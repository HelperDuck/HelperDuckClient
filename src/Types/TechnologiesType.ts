export type TechnologiesType = {
  technology: Technology;
  technologyId: number;
  userId: number;
};

export type Technology = {
  icon?: string;
  id?: number;
  name: string;
};

export type TechnologiesInHelpRequestType = {
  technology: Technology;
};

// I believe this commented typing is the correct one

// export type TechnologiesType = {
//   value: TechValue[]
//  };

// export type TechValue = {
//   technology: Technologie;
//   technologyId: number;
//   userId: number;
// };

// export type Technologie = {
//   icon: string;
//   id:  number;
//   name: string;
// };
