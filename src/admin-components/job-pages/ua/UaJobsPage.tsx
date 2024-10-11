"use client";

import CreateDirection from "@/admin-widgets/work-direction/createDirection/CreateDirection";
import ListComponent from "@/admin-widgets/list/ListComponent";
import { useGetCards } from "@/admin-shared/hooks";

const UaJobsPage = () => {
  const { data, isPending, isError, error } = useGetCards({ lang: "uk", page: 1, limit: 10 }, true);
  return (
    <>
      <CreateDirection language="uk" />
      {data && <ListComponent data={data}></ListComponent>}
    </>
  );
};

export default UaJobsPage;
