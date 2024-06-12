import React from "react";
import {
  ErrorBoundary,
  SearchProvider,
  SearchBox,
  PagingInfo,
  Paging,
  WithSearch,
  Sorting,
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import { CustomInputView } from "./CustomViews/CustomInputView";
import { CustomResultView } from "./CustomViews/CustomResultView";
import { CustomPagingView } from "./CustomViews/CustomPagingView";
import "@elastic/react-search-ui-views/lib/styles/styles.css"; // Overrides estao no CSS global pages/styles.css
import { SearchDriverOptions } from "@elastic/search-ui";

// const Facets = () => {
//   return (
//     <Facet key={"1"} field={"date_established"} label={"Data de Criação"} />
//   );
// };

interface ElasticFiltersProps {
  config: SearchDriverOptions;
}

export default function ElasticFilters({ config }: ElasticFiltersProps) {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched, isLoading, results }) => ({
          wasSearched,
          isLoading,
          results,
        })}
      >
        {({ wasSearched, isLoading, results }) => {
          return (
            <ErrorBoundary>
              <Layout
                header={
                  <SearchBox
                    inputView={CustomInputView}
                    // searchAsYouType={true}
                    // debounceLength={400}
                  />
                }
                // sideContent={
                //   <div>
                //     {wasSearched && (
                //       <Sorting label={"Ordenar por"} sortOptions={[]} />
                //     )}
                //     <Facets />
                //   </div>
                // }]

                bodyContent={
                  <CustomResultView results={results} isLoading={isLoading} />
                }
                bodyHeader={
                  <React.Fragment>
                    {wasSearched && <PagingInfo view={CustomPagingView} />}
                  </React.Fragment>
                }
                bodyFooter={<Paging />}
              />
            </ErrorBoundary>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
