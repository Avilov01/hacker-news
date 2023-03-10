import { Grid, Typography } from "@mui/material";

import { News } from "../../types";
import { getTime } from "../../utils";

type MetaProps = Pick<News, "kids" | "time" | "by">;

export const Meta = ({ time, kids, by }: MetaProps) => {
  const timeFormat = getTime(time);

  return (
    <Grid container item xs={6} flexDirection="row" alignItems="center">
      {time && (
        <Typography color="gray" fontSize={16}>
          {timeFormat},
        </Typography>
      )}
      <Typography color="gray" fontSize={16} ml="5px">
        by: {by}
      </Typography>
      {kids && (
        <Typography color="gray" fontSize={16}>
          , comments: {kids.length}
        </Typography>
      )}
    </Grid>
  );
};
