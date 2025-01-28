"use client";

import Box from "@mui/material/Box";
import { useEffect } from "react";

import { useGetCards } from "@/admin-shared/hooks";
import CardsList from "@/admin-widgets/work-direction/CardsList/CardsList";
import CreateDirection from "@/admin-widgets/work-direction/createDirection/CreateDirection";

const UaJobsPage = () => {
  const { data, refetch } = useGetCards(
    { lang: "ua", page: 1, limit: 100 },
    true,
  );

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <Box sx={{ padding: "20px" }}>
      <CreateDirection />

      {data && <CardsList data={data}></CardsList>}
    </Box>
  );
};

export default UaJobsPage;
