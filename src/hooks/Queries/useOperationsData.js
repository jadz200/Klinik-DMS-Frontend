import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { useQuery } from "react-query";

//Fetcher Function
const fetchOperations = () => {
  return axios.get(`${baseURL}/operation`);
};

//Fetcher Function
const fetchVisitOperations = ({ queryKey }) => {
  const operationId = queryKey[1];
  return axios.get(`${baseURL}/visit/${operationId}/visitOperation/`);
};

export const useOperationsData = (onSuccess, onError) => {
  return useQuery("operations", fetchOperations, {
    refetchOnWindowFocus: true,
    onSuccess,
    onError,
    select: (data) => {
      return data.data;
    },
  });
};

export const useVisitOperations = (operationId) => {
  return useQuery(["visitOperations", operationId], fetchVisitOperations, {
    refetchOnWindowFocus: true,
    select: (data) => {
      return data.data;
    },
  });
};
