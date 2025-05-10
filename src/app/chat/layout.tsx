'use client';

import { Provider } from "jotai";
import { sync } from "@/atoms";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Provider>
      <sync.AtomSynchronizer />
      {children}
    </Provider>
  );
}