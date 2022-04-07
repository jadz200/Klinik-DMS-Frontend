import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

const fetchAppointment = ({ queryKey }) => {
  const appointmentId = queryKey[1];
  return axios.get(`${baseURL}/appointment/${appointmentId}`);
};

export const useAppointmentData = (appointmentId) => {
  const queryClient = useQueryClient();
  return useQuery(["appointment", appointmentId], fetchAppointment, {
    select: (data) => {
      return data.data;
    },
    initialData: () => {
      const appointment = queryClient
        .getQueryData("appointments")
        ?.data?.find(
          (appointment) => appointment.id === parseInt(appointmentId)
        );

      if (appointment) {
        return {
          data: appointment,
        };
      } else {
        return undefined;
      }
    },
  });
};
