"use client";

import { ReactNode } from "react";
import { useSocketAuth } from "@/hooks/useSocketAuth";

export function AuthProvider({ children }: { children: ReactNode }) {
  useSocketAuth({ redirectOnUnauth: true });
  return <>{children}</>;
}
