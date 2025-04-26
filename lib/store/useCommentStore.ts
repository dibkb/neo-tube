import { create } from "zustand";
import { CommentThreadListResponse } from "@/lib/schemas/comments";

interface CommentState {
  commentData: CommentThreadListResponse | null;
  setCommentData: (data: CommentThreadListResponse) => void;
  mergeCommentData: (data: CommentThreadListResponse) => void;
  clearCommentData: () => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  commentData: null,
  setCommentData: (data) => set({ commentData: data }),
  mergeCommentData: (data) =>
    set((state) => {
      if (!state.commentData) return { commentData: data };

      return {
        commentData: {
          ...data,
          items: [...state.commentData.items, ...data.items],
        },
      };
    }),
  clearCommentData: () => set({ commentData: null }),
}));
