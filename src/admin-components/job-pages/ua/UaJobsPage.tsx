"use client";

import { useEffect } from "react";

import { useGetCards } from "@/admin-shared/hooks";
import CardsList from "@/admin-widgets/work-direction/CardsList/CardsList";
import CreateDirection from "@/admin-widgets/work-direction/createDirection/CreateDirection";

const UaJobsPage = () => {
  const { data, refetch } = useGetCards(
    { lang: "uk", page: 1, limit: 10 },
    true,
  );
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      <CreateDirection language="uk" />
      {data && <CardsList data={data}></CardsList>}
    </>
  );
};

export default UaJobsPage;
