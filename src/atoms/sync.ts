"use client";

import { useAtom, useSetAtom } from "jotai";
import { atoms } from ".";
import { useEffect } from "react";
import { v4 } from "uuid";

export function AtomSynchronizer() {
  const [socket] = useAtom(atoms.socketAtom);
  const setMessages = useSetAtom(atoms.messagesAtom);

  useEffect(() => {
    if (!socket) return;

    socket.on("chat-message", (msg: unknown) => {
      setMessages((prev) => [
        ...prev,
        {
          messageId: v4(),
          sender: "other",
          text: JSON.stringify(msg),
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, setMessages]);

  return null;
}
