import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

const fetchSecretary = ({ queryKey }) => {
  const secretaryId = queryKey[1];
  return axios.get(`${baseURL}/user/${secretaryId}`);
};

export const useSecretaryData = (secretaryId) => {
  const queryClient = useQueryClient();
  return useQuery(["secretary", secretaryId], fetchSecretary, {
    select: (data) => {
      return data.data;
    },
    initialData: () => {
      const secretary = queryClient
        .getQueryData("secretaries")
        ?.data?.find((secretary) => secretary.id === parseInt(secretaryId));

      if (secretary) {
        return {
          data: secretary,
        };
      } else {
        return undefined;
      }
    },
  });
};
