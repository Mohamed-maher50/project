import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
const getSocket = createAsyncThunk("chat/getSocket", async () => {
  const socket = await io("http://localhost:4000");
  return socket;
});

const chatReducer = createSlice({
  name: "chat",
  initialState: {
    chatsId: [],
    sockets: false,
  },
  reducers: {
    pushToChat: (state, { payload }) => {
      let chatIsExist = state.chatsId.find((chat) => chat._id === payload._id);
      if (!chatIsExist) state.chatsId = [...state.chatsId, payload];
      console.log(state.chatsId);
    },
    removeChat: (state, { payload }) => {
      let cloneChat = state.chatsId.filter((chat) => {
        return chat._id !== payload;
      });
      state.chatsId = cloneChat;
    },
    addMessage: (state, { payload }) => {
      let chatIndex = state.chatsId.findIndex(
        (ch) => ch._id === payload.chatId
      );
      if (chatIndex > -1) {
        state.chatsId[chatIndex].messages.push(payload);
        return;
      }

      let chatSchema = {
        isActive: true,
        _id: payload.chatId,
        messages: [payload],
      };
      state.chatsId.push(chatSchema);
    },
  },
  extraReducers: {
    [getSocket.fulfilled]: (state, { payload }) => {
      state.sockets = payload;
    },
  },
});
export { getSocket };
export default chatReducer.reducer;
export const { pushToChat, removeChat, addMessage } = chatReducer.actions;
