import { SearchRequest } from "@elastic/search-ui-elasticsearch-connector";
import { FilterType, Filter } from "@elastic/search-ui";
import { ResultFields, SearchFields } from "../types";
import { QueryDslQueryContainer } from "@elastic/elasticsearch/lib/api/types";

const baseApiUrl: string | undefined = process.env.NEXT_PUBLIC_MONITORING_API_DEV_URL;

export const index = "propositions";
export const host: string = Boolean(baseApiUrl) ?
    `${baseApiUrl}/elasticsearch` :
    process.env.NODE_ENV === "development" ?
        `http://localhost:5001/api/elasticsearch` :
        `https://monitoring-proposition-api.azurewebsites.net/api/elasticsearch`;

export const search_fields: SearchFields = {
  // id: {},
  // year: {},
  author: {},
  significance: {},
  // presentationdate: {},
  ementa: {},
  // createdat: {},
  proposition: {},
  // updatedat: {},
  // houseid: {},
  // situationid: {},
  number: {},
  // propositiontypeid: {},
  // archived: {},
};

export const result_fields: ResultFields = {
  id: { raw: {} },
  year: { raw: {} },
  author: { raw: {} },
  significance: { raw: {} },
  presentationdate: { raw: {} },
  createdat: { raw: {} },
  proposition: { raw: {} },
  updatedat: { raw: {} },
  houseid: { raw: {} },
  // situationid: { raw: {} },
  number: { raw: {} },
  // propositiontypeid: { raw: {} },
  propositiontype: { raw: {} },
  housedescription: { raw: {} },
  // archived: { raw: {} },
  ementa: { snippet: { size: 30, fallback: true } },
};

// const disjunctiveFacets = ["title.keyword"];

// const facets = {
//   title: { type: "text" },
//   date_established: {
//     type: "range",
//     ranges: [
//       {
//         from: "1900-01-01",
//         name: "A partir de 1900",
//       },
//       {
//         from: "1916-01-01",
//         name: "A partir de 1916",
//       },
//     ],
//   },
// };

export const createElasticFilter = (
  field: string,
  values: string | number | number[],
  type: FilterType = "any"
): Filter => {
  let v;
  if (Array.isArray(values)) v = values;
  else v = [values];

  return { field: field.toLowerCase(), values: v, type };
};

// export const createElasticFilterRange = (
//   field: string,
//   values: string,
//   type: FilterType = "all"
// ): Filter => {
//   const f = field.toLowerCase();
//   const v: FilterValueRange[] = [
//     {
//       name: f,
//       from: values,
//     },
//   ];
//   return { field: f, values: v, type };
// };

export const config = {
  searchQuery: {
    search_fields,
    result_fields,
    // disjunctiveFacets,
    // facets,
  },
  alwaysSearchOnInitialLoad: true,
};

export const mutateRequestBody = (
  author: string,
  filterKeywords: string[],
  mustNotKeywords: string[],
  initialDate: string,
  finalDate: string,
  requestBody: SearchRequest
): SearchRequest => {
  const authorQuery = author
    ? [
        {
          match: {
            author: {
              query: author,
            },
          },
        },
      ]
    : [];

  const keywordsQuery: QueryDslQueryContainer[] = filterKeywords.length
    ? filterKeywords.map((str) => {
        return {
          multi_match: {
            query: str,
            type: str.split(" ").length === 1 ? "best_fields" : "phrase",
            fields: Object.keys(search_fields),
          },
        };
      })
    : [];

  const excludeKeywordsQuery = mustNotKeywords.length
    ? [
        {
          terms: {
            ementa: mustNotKeywords,
          },
        },
      ]
    : [];

  const dateQuery =
    initialDate && finalDate
      ? [
          {
            range: {
              presentationdate: {
                time_zone: "-03:00",
                gte: initialDate,
                lte: finalDate,
              },
            },
          },
        ]
      : [];

  if (!requestBody.query) requestBody.query = { bool: {} };

  const must = (requestBody.query.bool?.must || []) as QueryDslQueryContainer[];
  const must_not = (requestBody.query.bool?.must_not ||
    []) as QueryDslQueryContainer[];

  requestBody.query.bool = {
    ...requestBody.query.bool,
    must: [...authorQuery, ...must, ...keywordsQuery, ...dateQuery],
    must_not: [...excludeKeywordsQuery, ...must_not],
  };

  return requestBody;
};
