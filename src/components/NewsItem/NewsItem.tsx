import { FC } from "react";

import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { NewNewsCardRowWrapper } from "./styled";
import { News } from "../../types";
import { Meta } from "../Meta";

type NewsItemProps = {
  item: News;
};

export const NewsCardRow: FC<NewsItemProps> = ({ item }) => {
  const { by, time, score, title, id, kids } = item;
  const navigate = useNavigate();

  const onNews = () => navigate(`/item/${id}`);

  return (
    <Grid item xs={12}>
      <NewNewsCardRowWrapper onClick={onNews}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Grid item xs={9}>
            <Typography fontSize={18}>{title}</Typography>
          </Grid>
          <Grid item xs={1}>
            <span>score: {score}</span>
          </Grid>
        </Box>
        <Meta by={by} kids={kids} time={time} />
      </NewNewsCardRowWrapper>
    </Grid>
  );
};
