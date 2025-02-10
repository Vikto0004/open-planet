"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import EditPage from "@/admin-components/job-pages/EditPage";
import { useGetWorkDirectionCard } from "@/admin-shared/hooks";
import { IWorkDirectionCard } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

const RootPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, refetch } = useGetWorkDirectionCard(id, true);

  useEffect(() => {
    refetch();
    if (data) {
      console.log(data);
    }
  }, [refetch, data]);

  let parsedResponse: IWorkDirectionCard | null = null;
  try {
    parsedResponse =
      typeof data?.response === "string"
        ? JSON.parse(data.response)
        : data?.response;
  } catch (error) {
    console.error("Failed to parse response:", error);
  }

  return <>{parsedResponse && <EditPage data={parsedResponse} />}</>;
};

export default RootPage;
