"use client";

import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { use, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

type Socket = ReturnType<typeof io>;

const socketAtom = atom<Socket>();

const messagesAtom = atom<unknown[]>([]);

const sendMessageAtom = atom(
  null,
  (get,set,  message: string) => {
    const socket = get(socketAtom);
    if (!socket) return;
    socket.emit("chat-message", {
      id: "test",
      sender: "You",
      content: message,
      timestamp: Date.now(),
    });
  }
);

socketAtom.onMount = (setSocket) => {
  const socket = io("http://localhost:4000");
  setSocket(socket);

  return () => {
    socket.disconnect();
  };
}

function AtomSynchronizer() {
  const [socket] = useAtom(socketAtom);
  const setMessages = useSetAtom(messagesAtom);


  useEffect(() => {
    if (!socket) return;

    socket.on("chat-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, setMessages]);

  return null;
};

export default function Test() {
  const messages = useAtomValue(messagesAtom);
  const sendMessage = useSetAtom(sendMessageAtom);

  const handleSubmit = useCallback((fd: FormData) => { 
    const message = fd.get("message") as string;
    if (!message) return;
    sendMessage(message);
  }, [sendMessage]);

  return (
    <div>
      <AtomSynchronizer />
      test page
      <form action={handleSubmit}>
        <input
          name="message"
          className="rounded-md border border-neutral-300 p-4 px-4 py-2 dark:border-neutral-700"
          type="text"
        />
        <button
          className="rounded-md bg-neutral-800 px-4 py-2 text-white hover:shadow dark:bg-neutral-200"
          type="submit"
        >
          Send
        </button>
      </form>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
}
