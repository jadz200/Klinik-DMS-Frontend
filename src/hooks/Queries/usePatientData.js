import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

let user = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens")).access
  : null;

const config = {
  headers: { Authorization: `Bearer ${user}` },
};

const fetchPatient = ({ queryKey }) => {
  const patientId = queryKey[1];
  return axios.get(`${baseURL}/patient/${patientId}`, config);
};

export const usePatientData = (patientId) => {
  const queryClient = useQueryClient();
  return useQuery(["patient", patientId], fetchPatient, {
    select: (data) => {
      return data.data;
    },
    initialData: () => {
      const patient = queryClient
        .getQueryData("patients")
        ?.data?.find((patient) => patient.id === parseInt(patientId));

      if (patient) {
        return {
          data: patient,
        };
      } else {
        return undefined;
      }
    },
  });
};
