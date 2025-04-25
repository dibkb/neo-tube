/* eslint-disable @next/next/no-img-element */
"use client";
import { chatApi } from "@/lib/base-url";
import { AlertTriangle, Loader2, SendIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

const ChatWindow = ({ videoId }: { videoId: string }) => {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [query, setQuery] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ type: "user" | "bot"; content: string }>
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async function () {
      setState("loading");
      const response = await chatApi.post("/prepare-chat-agent", {
        videoId: videoId,
      });
      const data = response.data;
      if (response.status === 200 && data.success) {
        setState("ready");
      } else {
        setState("error");
      }
    })();
  }, [videoId]);

  useEffect(() => {
    if (chatContainerRef.current && messagesEndRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const submitMessage = async () => {
    if (!query.trim() || isProcessing) return;

    const userMessage = query.trim();
    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);
    setQuery("");
    setIsProcessing(true);
    setThinking(true);
    try {
      const response = await fetch(`${chatApi.defaults.baseURL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId: videoId,
          message: userMessage,
          userId: "1",
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Failed to get response reader");

      const decoder = new TextDecoder();
      let responseText = "";
      let botMessageAdded = false;

      // Read the stream
      while (true) {
        setThinking(false);

        const { done, value } = await reader.read();
        if (done) break;

        // Decode the chunk
        const chunk = decoder.decode(value, { stream: true });

        const lines = chunk.split("\n\n");
        for (const line of lines) {
          if (line.trim() === "") continue;

          if (line.startsWith("data: ")) {
            const dataContent = line.slice(6);

            if (dataContent === "[DONE]") {
              break;
            }

            try {
              const data = JSON.parse(dataContent);
              if (data.type === "text") {
                responseText += data.value;

                if (!botMessageAdded) {
                  setMessages((prev) => [
                    ...prev,
                    { type: "bot", content: responseText },
                  ]);
                  botMessageAdded = true;
                } else {
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                      type: "bot",
                      content: responseText,
                    };
                    return newMessages;
                  });
                }
              } else if (data.type === "error") {
                setMessages((prev) => [
                  ...prev,
                  {
                    type: "bot",
                    content: `Error: ${data.value}`,
                  },
                ]);
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e, dataContent);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `Error: ${
            error instanceof Error ? error.message : "Failed to get response"
          }`,
        },
      ]);
    } finally {
      setIsProcessing(false);
      setThinking(false);
    }
  };

  let content;
  if (state === "loading") {
    content = (
      <div className="flex flex-col items-center justify-center h-full">
        <img
          src="https://media.tenor.com/Gvcwykgnd7AAAAAi/yibo-wangyibo.gif"
          alt="loading gif"
          className="w-full"
        />
      </div>
    );
  } else if (state === "ready") {
    content = (
      <>
        <div
          ref={chatContainerRef}
          className="flex flex-col gap-3 overflow-y-auto pb-16 max-h-full"
        >
          {messages.length === 0 ? (
            <p className="text-center text-sm font-medium italic text-neutral-500 my-8">
              Ask a question about this video
            </p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-lg font-medium text-sm ${
                  message.type === "user"
                    ? "bg-blue-100 self-end max-w-[80%]"
                    : "self-start max-w-[80%]"
                }`}
              >
                {message.type === "user" ? (
                  <p className="whitespace-pre-wrap text-blue-700 ">
                    {message.content}
                  </p>
                ) : (
                  <Markdown>{message.content}</Markdown>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitMessage();
          }}
          className="flex gap-1 absolute bottom-0 left-0 w-full border px-4 py-2 rounded-md bg-white"
        >
          {thinking ? (
            <div className="flex w-full justify-start gap-2 items-center">
              <p className="text-sm font-semibold text-neutral-500">
                Our 👑 lordship is processing your query
              </p>
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Message"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-sm font-semibold border-none outline-none"
                disabled={isProcessing}
              />
              <button
                type="submit"
                className={`group ${
                  isProcessing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isProcessing}
              >
                <SendIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-all duration-300" />
              </button>
            </>
          )}
        </form>
      </>
    );
  } else if (state === "error") {
    content = (
      <div className="flex flex-col items-center justify-center h-full">
        <p className=" text-sm font-semibold mb-4 text-neutral-700 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Chat not available for this
          video
        </p>
        <img
          src="https://media1.tenor.com/m/W0DwukIXlskAAAAd/programming.gif"
          alt="error gif"
          className="w-full"
        />
      </div>
    );
  }
  return (
    <section className="w-full h-full max-h-[400px] sm:max-h-[600px] lg:max-h-[90vh] rounded-xl bg-neutral-50 relative py-2">
      {content}
    </section>
  );
};

export default ChatWindow;
