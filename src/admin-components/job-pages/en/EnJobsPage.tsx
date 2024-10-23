"use client";

import { useEffect } from "react";

import { useGetCards } from "@/admin-shared/hooks";
import ListComponent from "@/admin-widgets/list/ListComponent";
import CreateDirection from "@/admin-widgets/work-direction/createDirection/CreateDirection";

const EnJobsPage = () => {
  const { data, refetch } = useGetCards(
    { lang: "en", page: 1, limit: 10 },
    true,
  );
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      <CreateDirection language="en" />
      {data && <ListComponent data={data}></ListComponent>}
    </>
  );
};

export default EnJobsPage;
