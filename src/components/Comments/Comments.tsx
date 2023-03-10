import {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { Box, Divider, Typography } from "@mui/material";
import { useQuery } from "react-query";

import { HtmlContentBox } from "./styled";
import { fetchItem } from "../../api/news";
import { CommentRefType, CommentsType } from "../../types";
import { getTime } from "../../utils";
import { LoadIndicator } from "../LoadIndicator";

type CommentsProps = {
  commentsIds?: number[];
  comments?: CommentsType[];
  id?: number;
  isNested?: boolean;
};

export const Comments = forwardRef<CommentRefType, CommentsProps>(
  ({ commentsIds, id, isNested, comments }, ref) => {
    const { data, isLoading, refetch } = useQuery(
      [`comments${id}`, commentsIds],
      () =>
        commentsIds && Promise.all(commentsIds.map(fetchItem<CommentsType>)),
      { keepPreviousData: false }
    );

    useImperativeHandle(
      ref,
      () => ({
        refreshComments: () => {
          refetch();
        },
      }),
      // eslint-disable-next-line
      []
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
        {isLoading ? (
          <LoadIndicator size={isNested ? 30 : undefined} />
        ) : (
          <>
            {(comments || data)?.map((c) => {
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
                    onClick={() => handleShowDiscus(c?.id)}
                  >
                    <Typography fontSize={13} fontWeight={600} color="gray">
                      {getTime(c?.time)}, by: {c?.by} {commentCount}
                    </Typography>
                    <HtmlContentBox
                      fontSize={14}
                      dangerouslySetInnerHTML={{ __html: c?.text }}
                    />

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
  }
);
