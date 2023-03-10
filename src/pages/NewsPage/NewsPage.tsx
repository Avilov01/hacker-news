import { useRef } from "react";

import { Refresh } from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { TextUrl } from "./styled";
import { fetchItem } from "../../api/news";
import { ButtonCommon, LoadIndicator } from "../../components";
import { Comments } from "../../components/Comments";
import { Meta } from "../../components/Meta";
import { ContentWrapper } from "../../styled";
import { CommentRefType, News } from "../../types";

export const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const refComments = useRef<CommentRefType>(null);

  const { data: news } = useQuery("news", () => fetchItem<News>(id || ""));

  if (!news) {
    return <LoadIndicator />;
  }

  const handleBack = () => navigate(-1);

  const handleRefreshComments = () => {
    refComments.current?.refreshComments();
  };

  return (
    <ContentWrapper
      sx={{
        overflow: "hidden",
      }}
    >
      <Grid container flexDirection="column">
        <Grid item mt="20px">
          <ButtonCommon variant="outlined" onClick={handleBack}>
            Back to news
          </ButtonCommon>
        </Grid>
        <Grid container mt="40px" flexDirection="column">
          <Meta by={news.by} kids={news.kids} time={news.time} />
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
              <ButtonCommon
                variant="outlined"
                onClick={handleRefreshComments}
                sx={{
                  fontSize: 16,
                  marginLeft: "5px",
                  textTransform: "lowercase",
                }}
              >
                refresh comments <Refresh />
              </ButtonCommon>
            </Box>
            <Divider />
            <Box
              sx={{
                marginTop: "5px",
                maxHeight: "550px",
                overflow: "scroll",
              }}
            >
              <Comments ref={refComments} comments={news.kids} />
            </Box>
          </>
        )}
      </Grid>
    </ContentWrapper>
  );
};
