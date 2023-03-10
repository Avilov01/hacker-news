import { Box, styled } from "@mui/material";

export const AppWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#d3d3d3",
  height: "calc(100vh - 80px)",
  padding: 40,
  color: "black",
  "& *": {
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#E3DDD0",
      outline: "none",
      borderRadius: "5px",
    },
  },
});
