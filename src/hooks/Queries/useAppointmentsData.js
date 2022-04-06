//Library imports
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

//Variable imports
import { baseURL } from "../../utils/baseURL";

//Fetcher Function
const fetchAppointments = () => {
  return axios.get(`${baseURL}/appointment`);
};

const addAppointment = (appointment) => {
  console.log(appointment);
  return axios.post(`${baseURL}/appointment/create/`, appointment);
};

const deleteAppointment = (id) => {
  return axios.delete(`${baseURL}/appointment/${id}/delete`);
};

const editAppointment = (appointment) => {
  return axios.put(
    `${baseURL}/appointment/${appointment.id}/update/`,
    appointment
  );
};

export const useAppointmentsData = (onSuccess, onError) => {
  return useQuery("appointments", fetchAppointments, {
    refetchOnWindowFocus: true,
    onSuccess,
    onError,
    select: (data) => {
      return data.data;
    },
  });
};

export const useAddAppointmentData = () => {
  const queryClient = useQueryClient();
  return useMutation(addAppointment, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("appointments");
    },
    onError: (err) => {
      console.log("Error", err.response);
    },
  });
};

export const useDeleteAppointmentData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
    },
  });
};

export const useEditAppointmentData = () => {
  const queryClient = useQueryClient();
  return useMutation(editAppointment, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("appointments");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
