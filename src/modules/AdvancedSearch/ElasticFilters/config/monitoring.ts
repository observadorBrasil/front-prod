import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import { AdvancedSearchFormState } from "@observatorio-brasil/atores/src/store/slices/forms/advancedSearchForm";
import {
  PostProcessRequestBodyFn,
  SearchRequest,
} from "@elastic/search-ui-elasticsearch-connector/lib/esm/types";
import { config, createElasticFilter, host, index, mutateRequestBody } from ".";

export const useElasticMonitoringConfig = (
  filterData: AdvancedSearchFormState,
  saveQueryFn: (value: object, searchTerm?: string) => void
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
    searchTerm,
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

    let searchTerm = "";
    if (requestBody) {
      const term = (requestBody as any)?.query?.bool?.should?.[0]?.multi_match
        ?.query;
      searchTerm = term || "";
    }

    saveQueryFn(result, searchTerm);
    return result;
  };

  const monitoringConnector = new ElasticsearchAPIConnector(
    {
      index,
      host,
    },
    postProcessRequestBodyFn
  );

  return {
    ...config,
    apiConnector: monitoringConnector,
    searchQuery: {
      ...config.searchQuery,
      filters: [...elasticFilters],
    },
    initialState: {
      searchTerm,
    },
  };
};
