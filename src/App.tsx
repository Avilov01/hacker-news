import React from "react";

import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";

import { fetchNews } from "./api/news";
import { AppWrapper } from "./layout/AppWrapper";
import { Container } from "./layout/Container";
import { MainPage } from "./pages/MainPage";
import { NewsPage } from "./pages/NewsPage";

function App() {
  const { data } = useQuery("newsIds", fetchNews, {
    refetchIntervalInBackground: true,
    refetchInterval: 60 * 1000,
  });

  return (
    <AppWrapper>
      <Container>
        <Typography variant="h4">Hacker News</Typography>
        <Routes>
          <Route path="/" element={<MainPage news={data} />} />
          <Route path="/item/:id" element={<NewsPage />} />
        </Routes>
      </Container>
    </AppWrapper>
  );
}

export default App;
