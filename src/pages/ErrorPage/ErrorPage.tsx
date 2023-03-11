import { Box, Typography } from "@mui/material";

import { ReactComponent as ErrorIcon } from "../../assets/icons/errorIcon.svg";
import { ButtonRefetch } from "../../components";

type ErrorPageProps = {
  handleRefetch: () => void;
  isRefetching: boolean;
};

export const ErrorPage = ({ handleRefetch, isRefetching }: ErrorPageProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <ErrorIcon height={60} width={60} />
      <Typography variant="h4" mt="30px" mb="10px">
        Oops, an error occurred, please try again later
      </Typography>
      <ButtonRefetch refetch={handleRefetch} isRefetching={isRefetching}>
        try again
      </ButtonRefetch>
    </Box>
  );
};
