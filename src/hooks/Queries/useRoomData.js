import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

const fetchRoom = ({ queryKey }) => {
  const roomId = queryKey[1];
  return axios.get(`${baseURL}/room/${roomId}`);
};

export const useRoomData = (roomId) => {
  const queryClient = useQueryClient();
  return useQuery(["room", roomId], fetchRoom, {
    select: (data) => {
      return data.data;
    },
    initialData: () => {
      const room = queryClient
        .getQueryData("rooms")
        ?.data?.find((room) => room.id === parseInt(roomId));

      if (room) {
        return {
          data: room,
        };
      } else {
        return undefined;
      }
    },
  });
};
