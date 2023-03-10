import { Box, Divider, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { TextUrl } from "./styled";
import { fetchItem } from "../../api/news";
import { ButtonBack, LoadIndicator } from "../../components";
import { Comments } from "../../components/Comments";
import { News } from "../../types";
import { getTime } from "../../utils";

export const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: news } = useQuery("news", () => fetchItem<News>(id || ""));

  if (!news) {
    return <LoadIndicator />;
  }

  return (
    <Grid container flexDirection="column">
      <Grid item mt="20px">
        <ButtonBack variant="outlined" onClick={() => navigate(-1)}>
          Back to news
        </ButtonBack>
      </Grid>
      <Grid container mt="40px" flexDirection="column">
        <Grid container item xs={6} flexDirection="row" alignItems="center">
          <Typography color="gray" fontWeight={500} fontSize={16}>
            {getTime(news.time)},
          </Typography>
          <Typography color="gray" fontWeight={500} fontSize={16} ml="5px">
            by: {news.by}
          </Typography>
        </Grid>
        <Grid item xs={6} mt="5px">
          <Typography variant="h5">{news.title}</Typography>
        </Grid>
        <TextUrl href={news.url} target="_blank" mt="5px">
          link to news
        </TextUrl>
      </Grid>

      {news?.kids && (
        <>
          <Typography fontSize={18} mt="50px" mb="5px" fontWeight={500}>
            {news?.kids.length ? "comments:" : "no comments"}
          </Typography>
          <Divider />
          <Box
            sx={{
              marginTop: "5px",
              height: 550,
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                width: "5px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#E3DDD0",
                outline: "none",
                borderRadius: "5px",
              },
            }}
          >
            <Comments comments={news.kids} />
          </Box>
        </>
      )}
    </Grid>
  );
};
