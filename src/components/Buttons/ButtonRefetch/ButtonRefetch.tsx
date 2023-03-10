import React, { ReactNode } from "react";

import { Refresh } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import { ButtonBase } from "../ButtonBase";

type ButtonRefetchProps = {
  isRefetching: boolean;
  refetch: () => void;
  children: ReactNode;
};

export const ButtonRefetch = ({
  isRefetching,
  refetch,
  children,
}: ButtonRefetchProps) => {
  return (
    <ButtonBase
      disabled={isRefetching}
      variant="outlined"
      onClick={() => refetch()}
      sx={{
        fontSize: 16,
        margin: "15px 0",
      }}
    >
      {children}{" "}
      {isRefetching ? (
        <CircularProgress
          size={16}
          sx={{
            marginLeft: "5px",
            color: "gray",
            opacity: 0.5,
          }}
        />
      ) : (
        <Refresh />
      )}
    </ButtonBase>
  );
};
