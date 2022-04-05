//Library imports
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

//Variable imports
import { baseURL } from "../../utils/baseURL";

//Fetcher Function
const fetchSuperHeroes = () => {
  return axios.get(`${baseURL}/patient`);
};

const addPatient = (patient) => {
  return axios.post(`${baseURL}/patient/create/`, patient);
};

const deletePatient = (id) => {
  return axios.delete(`${baseURL}/patient/${id}/delete`);
};

const editPatient = (patient) => {
  return axios.put(`${baseURL}/patient/${patient.id}/update/`, patient);
};

export const usePatientsData = (onSuccess, onError) => {
  return useQuery("patients", fetchSuperHeroes, {
    refetchOnWindowFocus: true,
    onSuccess,
    onError,
    select: (data) => {
      return data.data;
    },
  });
};

export const useAddPatientData = () => {
  const queryClient = useQueryClient();
  return useMutation(addPatient, {
    onSuccess: () => {
      queryClient.invalidateQueries("patients");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useDeletePatientData = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries("patients");
    },
  });
};

export const useEditPatientData = () => {
  const queryClient = useQueryClient();
  return useMutation(editPatient, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("patients");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
