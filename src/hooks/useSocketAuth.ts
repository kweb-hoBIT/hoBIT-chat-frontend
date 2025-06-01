import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { socketAtom, socketErrorAtom } from "@/atoms/atoms";
import { useRouter } from "next/navigation";
import { SocketError, SocketEvent } from "@/types";

export function useSocketAuth({
  redirectOnUnauth,
}: { redirectOnUnauth?: boolean } = {}) {
  const socket = useAtomValue(socketAtom);
  const setSocketError = useSetAtom(socketErrorAtom);
  const router = useRouter();

  useEffect(() => {
    if (!socket) {
      if (redirectOnUnauth) router.replace("/");
      return;
    }

    const onConnect = () => {
      setSocketError(null);
    };

    const onDisconnect = () => {
      setSocketError(SocketError.Disconnected);
    };

    const onError = (err: { message: string }) => {
      if (err?.message === SocketError.Unauthenticated) {
        setSocketError(SocketError.Unauthenticated);
        if (redirectOnUnauth) router.replace("/");
      } else {
        setSocketError(err?.message ?? "알 수 없는 에러");
      }
    };

    socket.on(SocketEvent.Connection, onConnect);
    socket.on(SocketEvent.Disconnection, onDisconnect);
    socket.on(SocketError.ConnectionError, onError);
    return () => {
      socket.off(SocketEvent.Connection, onConnect);
      socket.off(SocketEvent.Disconnection, onDisconnect);
      socket.off(SocketError.ConnectionError, onError);
    };
  }, [socket, setSocketError, router, redirectOnUnauth]);
}
