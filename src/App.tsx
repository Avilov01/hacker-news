import React from "react";

import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";

import { fetchNews } from "./api/news";
import { ButtonRefetch } from "./components";
import { AppWrapper } from "./layout/AppWrapper";
import { Container } from "./layout/Container";
import { MainPage } from "./pages/MainPage";
import { NewsPage } from "./pages/NewsPage";

function App() {
  const { data, refetch, isRefetching, isLoading } = useQuery(
    "newsIds",
    fetchNews,
    {
      refetchIntervalInBackground: true,
      refetchInterval: 60 * 1000,
    }
  );

  return (
    <AppWrapper>
      <Container>
        <Typography variant="h3">Hacker News</Typography>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ButtonRefetch
                  isRefetching={isRefetching || isLoading}
                  refetch={refetch}
                >
                  refresh news
                </ButtonRefetch>
                <MainPage news={data} />
              </>
            }
          />
          <Route path="/item/:id" element={<NewsPage />} />
        </Routes>
      </Container>
    </AppWrapper>
  );
}

export default App;
