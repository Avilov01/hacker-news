import { Box, styled } from "@mui/material";

export const ContentWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#E3DDD0",
    outline: "none",
    borderRadius: "5px",
  },
});
