import { Box, CircularProgress } from "@mui/material";

export const LoadIndicator = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    }}
  >
    <CircularProgress
      size={80}
      sx={{
        color: "gray",
        opacity: 0.5,
      }}
    />
  </Box>
);
