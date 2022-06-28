export type LanguagesUserType = {
 language: Language;
 languageId: number;
 userId: number
};

export type LanguagesType = {
  language: Language;
  languageId: number;
  userId: number
 };
 

export type Language = {
  code: string;
  icon: string;
  id:  number;
  name: string;
  nativeName: string;
};



export type LanguagesInHelpRequestType = {
  language: Language;
  languageId: number;
  helpRequestId: number;
 };

// I believe this commented typing is the correct one

// export type LanguagesType = {
//   value: LangValue[]
//  };

// export type LangValue = {
  // language: Language;
  // languageId: number;
  // userId: number
// };

// export type Language = {
//   code: string;
//   icon: string;
//   id:  number;
//   name: string;
//   nativeName: string;
// };