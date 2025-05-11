"use client";

import { useEffect, useMemo } from "react";
import { useAtom, useStore } from "jotai";
import { atoms, listener } from ".";

export function AtomSynchronizer() {
  const store = useStore();
  const [socket] = useAtom(atoms.socketAtom);

  const handleOnMessage = useMemo(
    () => listener.genMessageHanlder(store),
    [store],
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("chat-message", handleOnMessage);

    return () => {
      socket.off("chat-message", handleOnMessage);
    };
  }, [socket, handleOnMessage]);

  return null;
}
