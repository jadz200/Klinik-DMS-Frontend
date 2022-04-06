//Library imports
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

//Variable imports
import { baseURL } from "../../utils/baseURL";

//Fetcher Function
const fetchRooms = () => {
  return axios.get(`${baseURL}/room`);
};

const addRoom = (room) => {
  return axios.post(`${baseURL}/room/create/`, room);
};

const deleteRoom = (id) => {
  return axios.delete(`${baseURL}/room/${id}/delete`);
};

const editRoom = (room) => {
  return axios.put(`${baseURL}/room/${room.id}/update/`, room);
};

export const useRoomsData = (onSuccess, onError) => {
  return useQuery("rooms", fetchRooms, {
    refetchOnWindowFocus: true,
    onSuccess,
    onError,
    select: (data) => {
      return data.data;
    },
  });
};

export const useAddRoomData = () => {
  const queryClient = useQueryClient();
  return useMutation(addRoom, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("rooms");
    },
    onError: (err) => {
      console.log("Error", err.response);
    },
  });
};

export const useDeleteRoomData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries("rooms");
    },
  });
};

export const useEditRoomData = () => {
  const queryClient = useQueryClient();
  return useMutation(editRoom, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("rooms");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
