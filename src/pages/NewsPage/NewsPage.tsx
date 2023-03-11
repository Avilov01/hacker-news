import React from "react";

import { Box, Divider, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { TextUrl } from "./styled";
import { fetchItem } from "../../api/news";
import {
  ButtonBase,
  ButtonRefetch,
  Comments,
  LoadIndicator,
  Meta,
} from "../../components";
import { ContentWrapper } from "../../styled";
import { CommentsType, News } from "../../types";
import { ErrorPage } from "../ErrorPage";

export const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: news,
    isRefetching: isRefetchingNews,
    isError: isErrorNews,
    refetch: refetchNews,
  } = useQuery("news", () => fetchItem<News>(id || ""));

  const {
    data: comments,
    isRefetching: isRefetchingComments,
    isLoading: isLoadingComments,
    refetch: refetchComments,
    isError: isErrorComments,
  } = useQuery(
    [`comments`, news?.kids],
    () => news?.kids && Promise.all(news.kids.map(fetchItem<CommentsType>)),
    { keepPreviousData: false }
  );

  const hasError = isErrorNews || isErrorComments;
  const hasIsRefetch = isRefetchingComments || isRefetchingNews;

  const handleRefetch = () => {
    isErrorNews && refetchNews();
    isErrorComments && refetchComments();
  };

  if (hasError) {
    return (
      <ErrorPage isRefetching={hasIsRefetch} handleRefetch={handleRefetch} />
    );
  }

  if (!news) {
    return <LoadIndicator />;
  }

  const handleBack = () => navigate(-1);

  return (
    <ContentWrapper
      sx={{
        overflow: "hidden",
      }}
    >
      <Grid container flexDirection="column">
        <Grid item mt="20px">
          <ButtonBase variant="outlined" onClick={handleBack}>
            Back to news
          </ButtonBase>
        </Grid>
        <Grid container mt="40px" flexDirection="column">
          <Meta
            by={news.by}
            kids={news.kids}
            time={news.time}
            score={news.score}
          />
          <Grid item xs={6} mt="5px">
            <Typography variant="h5">{news.title}</Typography>
          </Grid>
          <TextUrl href={news.url} target="_blank" mt="5px">
            link to news
          </TextUrl>
        </Grid>

        {news?.kids && (
          <>
            <Box
              mt="40px"
              mb="5px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize={18}>
                {news?.kids.length ? "comments" : "no comments"}{" "}
              </Typography>
              <ButtonRefetch
                isRefetching={isRefetchingComments || isLoadingComments}
                refetch={refetchComments || isLoadingComments}
              >
                refresh comments
              </ButtonRefetch>
            </Box>
            <Divider />
            <Box
              sx={{
                marginTop: "5px",
                maxHeight: "550px",
                overflow: "scroll",
              }}
            >
              <Comments comments={comments} isLoading={isLoadingComments} />
            </Box>
          </>
        )}
      </Grid>
    </ContentWrapper>
  );
};
