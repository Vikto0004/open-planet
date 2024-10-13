"use client";

import { useGetCards } from "@/admin-shared/hooks";
import ListComponent from "@/admin-widgets/list/ListComponent";
import CreateDirection from "@/admin-widgets/work-direction/createDirection/CreateDirection";

const UaJobsPage = () => {
  const { data } = useGetCards({ lang: "uk", page: 1, limit: 10 }, true);
  return (
    <>
      <CreateDirection language="uk" />
      {data && <ListComponent data={data}></ListComponent>}
    </>
  );
};

export default UaJobsPage;
