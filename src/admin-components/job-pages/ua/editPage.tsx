import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useGetWorkDirectionCard } from "@/admin-shared/hooks";
import EditForm from "@/admin-widgets/forms/editForm/editForm";

const EditPage = () => {
  const params = useParams();
  const id = params.id as string;

  const queryClient = useQueryClient();
  const { data, isPending, isSuccess } = useGetWorkDirectionCard(id, true);
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["directionData"] });
  }, [isSuccess]);

  if (data) {
    return <EditForm data={data.workDirection} />;
  }
};

export default EditPage;
