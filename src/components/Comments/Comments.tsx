import { Fragment, useEffect, useState } from "react";

import { Box, Divider, Typography } from "@mui/material";
import { useQuery } from "react-query";

import { HtmlContentBox } from "./styled";
import { fetchItem } from "../../api/news";
import { CommentsType } from "../../types";
import { getTime } from "../../utils";
import { LoadIndicator } from "../LoadIndicator";

type CommentsProps = {
  commentsIds?: number[];
  comments?: CommentsType[];
  id?: number;
  isNested?: boolean;
  isLoading?: boolean;
};

export const Comments = ({
  commentsIds,
  id,
  isNested,
  comments,
  isLoading,
}: CommentsProps) => {
  const { data, isLoading: isLoadingComments } = useQuery(
    [`comments${id}`, commentsIds],
    () => commentsIds && Promise.all(commentsIds.map(fetchItem<CommentsType>)),
    { keepPreviousData: false }
  );

  const [showDiscus, setShowDiscus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (data) {
      if (!showDiscus) {
        const discusData: Record<string, boolean> = {};

        data.forEach((c) => {
          discusData[c.id] = false;
        });

        setShowDiscus(discusData);
      }
    }
    // eslint-disable-next-line
  }, [data]);

  const handleShowDiscus = (id: number) => {
    setShowDiscus((state) => {
      return {
        ...state,
        [id]: !state[id],
      };
    });
  };

  return (
    <>
      {isLoading || isLoadingComments ? (
        <Box
          sx={{
            marginTop: !isNested ? "40px" : undefined,
          }}
        >
          <LoadIndicator size={isNested ? 30 : undefined} />
        </Box>
      ) : (
        <>
          {(comments || data)?.map((c) => {
            const timeComment = getTime(c?.time);

            const commentCount = c?.kids?.length
              ? showDiscus[c?.id]
                ? "[ - ]"
                : `[${c?.kids?.length} more]`
              : "";

            return (
              <Fragment key={c?.id}>
                <Box
                  ml="5px"
                  mt={!isNested ? "5px" : ""}
                  sx={{
                    ":hover": {
                      cursor: c?.kids?.length && "pointer",
                    },
                  }}
                >
                  <Box onClick={() => handleShowDiscus(c?.id)}>
                    <Typography fontSize={13} fontWeight={600} color="gray">
                      {timeComment}, by: {c?.by} {commentCount}
                    </Typography>
                    <HtmlContentBox
                      fontSize={14}
                      dangerouslySetInnerHTML={{ __html: c?.text }}
                    />
                  </Box>

                  {c?.kids && showDiscus[c.id] && (
                    <Box ml="30px">
                      <Comments
                        key={c?.id}
                        commentsIds={c?.kids}
                        isNested={true}
                      />
                    </Box>
                  )}
                </Box>
                {!isNested && (
                  <Box mt="10px">
                    <Divider />
                  </Box>
                )}
              </Fragment>
            );
          })}
        </>
      )}
    </>
  );
};
