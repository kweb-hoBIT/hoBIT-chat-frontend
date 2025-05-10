"use client";

import type { Message } from "@/types";
import { atom } from "jotai";
import { io } from "socket.io-client";
import { v4 } from "uuid";

type Socket = ReturnType<typeof io>;

export const socketAtom = atom<Socket>();

export const messagesAtom = atom<Message[]>([]);

export const sendMessageAtom = atom(null, (get, set, text: string) => {
  const socket = get(socketAtom);
  if (!socket) return;
  const message: Message = {
    messageId: v4(),
    sender: "self",
    text,
  } satisfies Message;

  set(messagesAtom, (prev) => [...prev, message]);
  socket.emit("chat-message", message);
});

socketAtom.onMount = (setSocket) => {
  const socket = io("http://localhost:4000");
  setSocket(socket);

  return () => {
    socket.disconnect();
  };
};
