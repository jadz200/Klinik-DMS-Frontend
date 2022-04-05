import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

const fetchDoctor = ({ queryKey }) => {
  const doctorId = queryKey[1];
  return axios.get(`${baseURL}/user/${doctorId}`);
};

export const useDoctorData = (doctorId) => {
  const queryClient = useQueryClient();
  return useQuery(["doctor", doctorId], fetchDoctor, {
    select: (data) => {
      return data.data;
    },
    initialData: () => {
      const doctor = queryClient
        .getQueryData("doctors")
        ?.data?.find((doctor) => doctor.id === parseInt(doctorId));

      if (doctor) {
        return {
          data: doctor,
        };
      } else {
        return undefined;
      }
    },
  });
};
