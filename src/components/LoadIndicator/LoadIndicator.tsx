import { Box, CircularProgress } from "@mui/material";

type LoadIndicatorProps = {
  size?: number;
};

export const LoadIndicator = ({ size }: LoadIndicatorProps) => (
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
      size={size || 80}
      sx={{
        color: "gray",
        opacity: 0.5,
      }}
    />
  </Box>
);
