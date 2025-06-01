"use client";

import { Sender, type Message } from "@/types";
import { atom } from "jotai";
import { io } from "socket.io-client";
import { v4 } from "uuid";

type Socket = ReturnType<typeof io>;

export const loginAtom = atom<{ email: string; type: string } | null>(null);

export const socketErrorAtom = atom<string | null>(null);

export const socketAtom = atom<Socket | null>((get) => {
  const login = get(loginAtom);
  if (!login) return null;

  return io("http://localhost:4000", {
    auth: { email: login.email, cred: login.type },
  });
});

export const messagesAtom = atom<Message[]>([]);

export const sendMessageAtom = atom(
  null,
  (get, set, { text, fileUrls }: { text: string; fileUrls?: string[] }) => {
    const socket = get(socketAtom);
    if (!socket) return;

    const message: Message = {
      messageId: v4(),
      sender: Sender.Self,
      text,
      fileUrls: fileUrls || [],
    } satisfies Message;

    set(messagesAtom, (prev) => [...prev, message]);
    socket.emit("chat-message", message);
  },
);
