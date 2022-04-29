//Library imports
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

//Variable imports
import { baseURL } from "../../utils/baseURL";

//Fetcher Function
const fetchDoctors = () => {
  return axios.get(`${baseURL}/user`);
};

const addDoctor = (doctor) => {
  return axios.post(`${baseURL}/user/create/`, doctor);
};

const deleteDoctor = (id) => {
  return axios.delete(`${baseURL}/user/${id}/delete`);
};

const editDoctor = (doctor) => {
  return axios.put(`${baseURL}/user/${doctor.id}/update/`, doctor);
};

export const useDoctorsData = (onSuccess, onError) => {
  return useQuery("doctors", fetchDoctors, {
    refetchOnWindowFocus: true,
    onSuccess,
    onError,
    select: (data) => {
      return data.data;
    },
  });
};

export const useAddDoctorData = () => {
  const queryClient = useQueryClient();
  return useMutation(addDoctor, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("doctors");
    },
    onError: (err) => {
      console.log("Error", err.response);
    },
  });
};

export const useDeleteDoctorData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteDoctor, {
    onSuccess: () => {
      queryClient.invalidateQueries("doctors");
    },
  });
};

export const useEditDoctorData = () => {
  const queryClient = useQueryClient();
  return useMutation(editDoctor, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("doctors");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
