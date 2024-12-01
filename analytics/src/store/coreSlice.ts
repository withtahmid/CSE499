import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { trpc } from "../trpc";
import { TRPCClientError } from "@trpc/client";
import { ConversationSchema } from "../../../backend/models/Conversation";
import { castDraft } from "immer";

interface CoreState {
  conversations: ConversationSchema[];
  status: "success" | "idle" | "failed" | "loading";
}

const initialState: CoreState = {
  conversations: [],
  status: "idle",
};

export const fetchAllConversations = createAsyncThunk<
  ConversationSchema[],
  undefined,
  { rejectValue: string }
>(
  "conversation/fetchAllConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trpc.getAllConversation.query();
      return response as ConversationSchema[];
    } catch (error) {
      if (error instanceof TRPCClientError) {
        return rejectWithValue(error.message);
      }
    }
    return rejectWithValue("Failed to fetch conversations");
  }
);

const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllConversations.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAllConversations.fulfilled, (state, action: PayloadAction<ConversationSchema[]>) => {
        state.status = "success";
        state.conversations = castDraft(action.payload);
      });
  },
});

const coreReducer = coreSlice.reducer;
export default coreReducer;
