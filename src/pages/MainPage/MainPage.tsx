import React from "react";

import { Grid } from "@mui/material";

import { LoadIndicator, NewsCardRow } from "../../components";
import { ContentWrapper } from "../../styled";
import { News } from "../../types";
import { ErrorPage } from "../ErrorPage";

type MainPageProps = {
  news?: News[];
  isError?: boolean;
  refetch: () => void;
  isRefetching: boolean;
};

export const MainPage = ({
  news,
  isError,
  refetch,
  isRefetching,
}: MainPageProps) => {
  if (isError) {
    return <ErrorPage isRefetching={isRefetching} handleRefetch={refetch} />;
  }

  if (!news) {
    return <LoadIndicator />;
  }

  return (
    <>
      <ContentWrapper>
        <Grid container spacing={1}>
          {news.map((item) => {
            return <NewsCardRow key={item?.id} item={item} />;
          })}
        </Grid>
      </ContentWrapper>
    </>
  );
};
