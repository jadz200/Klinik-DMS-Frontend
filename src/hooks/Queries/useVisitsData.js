import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

const fetchVisits = () => {
  return axios.get(`${baseURL}/visit`);
};

const addVisit = (visit) => {
  console.log(visit);
  return axios.post(`${baseURL}/visit/create/`, visit);
};

const deleteVisit = (id) => {
  return axios.delete(`${baseURL}/visit/${id}/delete`);
};

const editVisit = (visit) => {
  return axios.put(`${baseURL}/visit/${visit.id}/update/`, visit);
};

export const useVisitsData = (onSuccess, onError) => {
  return useQuery("visits", fetchVisits, {
    refetchOnWindowFocus: true,
    onSuccess,
    onError,
    select: (data) => {
      return data.data;
    },
  });
};

export const useAddVisitData = () => {
  const queryClient = useQueryClient();
  return useMutation(addVisit, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("visits");
    },
    onError: (err) => {
      console.log("Error", err.response);
    },
  });
};

export const useDeleteVisitData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteVisit, {
    onSuccess: () => {
      queryClient.invalidateQueries("visits");
    },
  });
};

export const useEditVisitData = () => {
  const queryClient = useQueryClient();
  return useMutation(editVisit, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("visits");
    },
    onError: (err) => {
      console.log(err.response);
    },
  });
};
