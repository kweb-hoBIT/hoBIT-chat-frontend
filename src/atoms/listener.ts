import type { createStore } from "jotai";
import { atoms } from ".";
import { v4 } from "uuid";
import { Sender } from "@/types";

type Store = ReturnType<typeof createStore>;

export function genMessageHanlder(store: Store) {
  return function messageHandler(msg: unknown) {
    store.set(atoms.messagesAtom, (prev) => [
      ...prev,
      {
        messageId: v4(),
        sender: Sender.Other,
        text: JSON.stringify(msg),
      },
    ]);
  };
}
