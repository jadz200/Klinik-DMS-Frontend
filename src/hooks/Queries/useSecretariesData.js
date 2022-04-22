//Library imports
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

//Variable imports
import { baseURL } from "../../utils/baseURL";
import { useStore } from "../Store/useStore";

const user = useStore.getState().authTokens.access;

const config = {
  headers: { Authorization: `Bearer ${user}` },
};

//Fetcher Function
const fetchSecretaries = () => {
  return axios.get(`${baseURL}/user`, config);
};

const addSectretary = (secretary) => {
  console.log(secretary);
  return axios.post(`${baseURL}/user/create/`, secretary);
};

const deleteSecretary = (id) => {
  return axios.delete(`${baseURL}/user/${id}/delete`);
};

const editSecretary = (secretary) => {
  return axios.put(`${baseURL}/user/${secretary.id}/update/`, secretary);
};

export const useSecretariesData = (onSuccess, onError) => {
  return useQuery("secretaries", fetchSecretaries, {
    refetchOnWindowFocus: true,
    onSuccess,
    onError,
    select: (data) => {
      return data.data;
    },
  });
};

export const useAddSecretaryData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSectretary, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("secretaries");
    },
    onError: (err) => {
      console.log("Error", err.response);
    },
  });
};

export const useDeleteSecretaryData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSecretary, {
    onSuccess: () => {
      queryClient.invalidateQueries("secretaries");
    },
  });
};

export const useEditSecretaryData = () => {
  const queryClient = useQueryClient();
  return useMutation(editSecretary, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("secretaries");
    },
    onError: (err) => {
      console.log(err.response);
    },
  });
};
