import {
  FieldConfiguration,
  ResultEntry,
  SearchFieldConfiguration,
} from "@elastic/search-ui";

export type SearchFields = {
  [k in keyof Partial<SearchThemisIndex>]: SearchFieldConfiguration;
};

export type ResultFields = {
  [k in keyof Partial<SearchThemisIndex>]: FieldConfiguration;
};

export type SearchThemisIndex = {
  id: ResultEntry;
  year: ResultEntry;
  author: ResultEntry;
  significance: ResultEntry;
  presentationdate: ResultEntry;
  ementa: ResultEntry;
  createdat: ResultEntry;
  proposition: ResultEntry;
  propositiontypeid: ResultEntry;
  propositiontype: ResultEntry;
  updatedat: ResultEntry;
  houseid: ResultEntry;
  housedescription: ResultEntry;
  housetype: ResultEntry;
  housetypeid: ResultEntry;
  situationid: ResultEntry;
  number: ResultEntry;
  archived: ResultEntry;
  // @timestamp: ResultEntry;
  // @version: ResultEntry;
  approvalprobability: ResultEntry;
  comissions: ResultEntry;
  description: ResultEntry;
  projectid: ResultEntry;
  regime: ResultEntry;
  themeid: ResultEntry;
  _meta?: {
    rawHit: {
      _score: number;
    };
  };
};
