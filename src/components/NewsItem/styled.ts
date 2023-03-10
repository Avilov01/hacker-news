import { styled } from "@mui/material";

export const NewNewsCardRowWrapper = styled("div")({
  "&:hover": {
    backgroundColor: "#ecebeb",
    padding: "5px 10px",
    borderRadius: 15,
  },
  transition: "all 300ms ease-out",
  cursor: "pointer",
  borderBottom: "1px solid #d9d5d4",
  padding: "5px 0",
});
