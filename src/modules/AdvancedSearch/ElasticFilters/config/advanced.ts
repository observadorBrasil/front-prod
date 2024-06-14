import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import { AdvancedSearchFormState } from "../../../../../src/store/slices/forms/advancedSearchForm";
import { PostProcessRequestBodyFn } from "@elastic/search-ui-elasticsearch-connector/lib/esm/types";
import { config, createElasticFilter, host, index, mutateRequestBody } from ".";
import { store } from "../../../../../src/store";

export const useElasticAdvancedConfig = (
  filterData: AdvancedSearchFormState
) => {
  const {
    houseForm,
    houseIds: houseid,
    propositionTypeIds: propositiontypeid,
    situationIds: situationid,
    initialDate,
    finalDate,
    author,
    filterKeywords,
    mustNotKeywords,
    ...filters
  } = filterData.data;

  const elasticFilters = Object.entries({
    ...filters,
    houseid,
    propositiontypeid,
    situationid,
  })
    .filter(([_, value]) => value.length)
    .map(([key, value]) => createElasticFilter(key, value));

  const postProcessRequestBodyFn: PostProcessRequestBodyFn = (
    requestBody,
    _requestState,
    _queryConfig
  ) => {
    const result = mutateRequestBody(
      author,
      filterKeywords,
      mustNotKeywords,
      initialDate,
      finalDate,
      requestBody
    );

    const mysort = store.getState().advancedSearchForm.sort;

    if (mysort) result.track_scores = true;

    if (mysort && mysort.split("-")[0] === "presentationdate") {
      result.sort = [
        {
          presentationdate: {
            order: mysort.split("-")[1],
            format: "strict_date_optional_time",
          },
        },
      ];
    } else if (mysort && mysort.split("-")[0] === "author") {
      result.sort = [
        {
          "author.keyword": {
            order: mysort.split("-")[1],
          },
        },
      ];
    }

    return result;
  };

  const advancedConnector = new ElasticsearchAPIConnector(
    {
      index,
      host,
    },
    postProcessRequestBodyFn
  );

  return {
    ...config,
    apiConnector: advancedConnector,
    searchQuery: { ...config.searchQuery, filters: [...elasticFilters] },
  };
};
