import { format } from "date-fns";
import { parseJSON } from "date-fns/esm";
import React from "react";
import { useDoctorData } from "../../hooks/Queries/useDoctorData";
import { usePatientData } from "../../hooks/Queries/usePatientData";
import { useRoomData } from "../../hooks/Queries/useRoomData";
import { useStore } from "../../hooks/Store/useStore";

const ViewAppointment = ({ appointment }) => {
  const setPatientVisit = useStore((state) => state.setPatientVisit);
  const setDoctorVisit = useStore((state) => state.setDoctorVisit);
  const setRoomVisit = useStore((state) => state.setRoomVisit);
  const {
    data: patient,
    isLoading: patientIsLoading,
    isError: patientIsError,
  } = usePatientData(appointment.patientID);
  const {
    data: doctor,
    isLoading: doctorIsLoading,
    isError: doctorIsError,
  } = useDoctorData(appointment.doctorID);
  const {
    data: room,
    isLoading: roomIsLoading,
    isError: roomIsError,
  } = useRoomData(appointment.roomID);

  if (roomIsError || patientIsError || doctorIsError) {
    return <div>Error</div>;
  }

  if (roomIsLoading || patientIsLoading || doctorIsLoading) {
    return <div>Loading...</div>;
  }

  setRoomVisit(room);
  setPatientVisit(patient);
  setDoctorVisit(doctor);

  return (
    <>
      <div className="flex align-items-center align-content-center mb-4 mt-4">
        <h3 className="underline">Date:</h3>
        <p className="text-xl ml-4">
          {format(parseJSON(appointment.date), "yyyy-MM-dd' at 'HH:mm")}
        </p>
      </div>

      <div className="flex align-items-center align-content-center mb-4">
        <h3 className="underline">Duration:</h3>
        <p className="text-xl ml-4">{appointment.duration}</p>
      </div>

      <div className="flex align-items-center align-content-center mb-4">
        <h3 className="underline">Reason:</h3>
        <p className="text-xl ml-4">{appointment.reason}</p>
      </div>

      <div className="flex align-items-center align-content-center mb-4">
        <h3 className="underline">Patient:</h3>
        <p className="text-xl ml-4">{`${patient.first_name} ${patient.last_name}`}</p>
      </div>

      <div className="flex align-items-center align-content-center mb-4">
        <h3 className="underline">Doctor:</h3>
        <p className="text-xl ml-4">{`${doctor.first_name} ${doctor.last_name}`}</p>
      </div>

      <div className="flex align-items-center align-content-center mb-4">
        <h3 className="underline">Room:</h3>
        <p className="text-xl ml-4">{room.title}</p>
      </div>
    </>
  );
};

export default ViewAppointment;
