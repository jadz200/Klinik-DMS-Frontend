import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

const fetchVisit = ({ queryKey }) => {
  const visitId = queryKey[1];
  return axios.get(`${baseURL}/visit/${visitId}`);
};

export const useVisitData = (visitId) => {
  const queryClient = useQueryClient();
  return useQuery(["visit", visitId], fetchVisit, {
    select: (data) => {
      return data.data;
    },
    initialData: () => {
      const visit = queryClient
        .getQueryData("visits")
        ?.data?.find((visit) => visit.id === parseInt(visitId));

      if (visit) {
        return {
          data: visit,
        };
      } else {
        return undefined;
      }
    },
  });
};
