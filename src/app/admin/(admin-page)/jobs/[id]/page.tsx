"use client";

import EditPage from "@/admin-components/job-pages/EditPage";
import { useParams } from "next/navigation";
import { useGetWorkDirectionCard } from "@/admin-shared/hooks";
import { useEffect } from "react";

const RootPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, refetch } = useGetWorkDirectionCard(id, true);
  useEffect(() => {
    refetch();
    if(data){
      console.log(data)
    }
  }, [refetch, data]);
  return <>
    {data && <EditPage data={data.response}/>}
  </>;
};

export default RootPage;
