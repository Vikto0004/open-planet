import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useGetWorkDirectionCard } from "@/admin-shared/hooks";
import EditForm from "@/admin-widgets/forms/editForm/EditForm";

const EditPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, refetch } = useGetWorkDirectionCard(id, true);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (data && data.response._id === id) {
    return <EditForm data={data.response} />;
  }
};

export default EditPage;
