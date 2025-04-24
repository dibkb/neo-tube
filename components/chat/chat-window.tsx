import { SendIcon } from "lucide-react";
import React from "react";

const ChatWindow = () => {
  return (
    <section className="absolute top-0 left-0 w-full h-full max-h-[90vh] rounded-xl p-4 bg-neutral-50">
      <form className="flex gap-1 absolute bottom-0 left-0 w-full border px-4 py-2 rounded-md">
        <input
          type="text"
          placeholder="Message"
          className="flex-1 text-sm font-semibold border-none outline-none"
        />
        <button type="submit" className="group">
          <SendIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-all duration-300" />
        </button>
      </form>
    </section>
  );
};

export default ChatWindow;
