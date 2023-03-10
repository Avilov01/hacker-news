import { Grid } from "@mui/material";

import { LoadIndicator, NewsCardRow } from "../../components";
import { News } from "../../types";

type MainPageProps = {
  news?: News[];
};

export const MainPage = ({ news }: MainPageProps) => {
  if (!news) {
    return <LoadIndicator />;
  }

  return (
    <Grid container spacing={1}>
      {news.map((item) => {
        return <NewsCardRow key={item.id} item={item} />;
      })}
    </Grid>
  );
};
