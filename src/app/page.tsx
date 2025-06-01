"use client";

import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { loginAtom, socketErrorAtom } from "@/atoms/atoms";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("invalid");
  const setLogin = useSetAtom(loginAtom);
  const socketError = useAtomValue(socketErrorAtom);
  const login = useAtomValue(loginAtom);
  const router = useRouter();

  const handleLogin = () => {
    if (!email.trim()) {
      // TODO: Show error message
      alert("이메일을 입력해주세요.");
      return;
    }
    if (type === "invalid") {
      // TODO: Show error message
      alert("유형을 선택하세요.");
      return;
    }
    setLogin({ email, type });
  };

  useEffect(() => {
    if (login?.email && login?.type && login.type !== "invalid") {
      router.push("/chat");
    }
  }, [login, router]);

  return (
    <div style={{ margin: "2rem" }}>
      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="invalid">Select a role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin}>로그인</button>
      {socketError === "unauthenticated" && (
        <div style={{ color: "red" }}>
          인증에 실패했습니다. 다시 로그인 해주세요.
        </div>
      )}
    </div>
  );
}
