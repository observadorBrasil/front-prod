import ElasticsearchAPIConnector, {
  PostProcessRequestBodyFn,
} from "@elastic/search-ui-elasticsearch-connector";
import { SimpleSearchFormState } from "@observatorio-brasil/atores/src/store/slices/forms/simpleSearchForm";
import { config, createElasticFilter, host, index } from ".";
import { store } from "@observatorio-brasil/atores/src/store";

export const useElasticSimpleConfig = (filterData: SimpleSearchFormState) => {
  const { number: number, year: year, houseIds: houseid } = filterData.data;

  const elasticFilters = Object.entries({ number, year, houseid })
    .filter(([_, value]) => value)
    .map(([key, value]) => createElasticFilter(key, value));

  const postProcessRequestBodyFn: PostProcessRequestBodyFn = (
    requestBody,
    _requestState,
    _queryConfig
  ) => {
    if (!requestBody.query) requestBody.query = { bool: {} };

    requestBody.query.bool = {
      ...requestBody.query.bool,
      minimum_should_match: 1,
    };

    const mysort = store.getState().simpleSearchForm.data.sort;
    
    if (mysort) requestBody.track_scores = true;

    if (mysort && mysort.split("-")[0] === "presentationdate") {
      requestBody.sort = [
        {
          presentationdate: {
            order: mysort.split("-")[1],
            format: "strict_date_optional_time",
          },
        },
      ];
    } else if (mysort && mysort.split("-")[0] === "author") {
      requestBody.sort = [
        {
          "author.keyword": {
            order: mysort.split("-")[1],
          },
        },
      ];
    }

    return requestBody;
  };

  const simpleConnector = new ElasticsearchAPIConnector(
    {
      index,
      host,
    },
    postProcessRequestBodyFn
  );

  return {
    ...config,
    apiConnector: simpleConnector,
    searchQuery: {
      ...config.searchQuery,
      filters: [...elasticFilters],
    },
  };
};
