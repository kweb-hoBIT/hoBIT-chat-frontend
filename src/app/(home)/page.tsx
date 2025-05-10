"use client";

import { useCallback, useState } from "react";
import { Funnel } from "./funnel";

export default function Home() {
  const [showFunnel, setShowFunnel] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  const handleSubmit = useCallback(function search(formData: FormData) {
    const query = formData.get("email");
    if (typeof query !== "string") {
      alert("Invalid email");
      return;
    }
    alert(`You searched for '${query}'`);
    if (query.endsWith("@korea.ac.kr")) {
      setShowFunnel(query);
    }
  }, []);

  if (showFunnel) {
    return <Funnel email={showFunnel} />;
  }

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-[32px]">
      <main className="flex flex-col items-center gap-[32px] p-4 sm:items-start">
        <header className="text-center">
          <h1 className="text-4xl font-bold">hoBIT 실시간 채팅 상담</h1>

          <p className="mt-4 text-lg">
            정보대학 행정실과 바로 채팅으로 상담할 수 있습니다.
            <br />
            실시간 상담을 원하시면 고려대학교 이메일을 입력해주세요. 🟢 상담
            가능 시간: ...
          </p>
        </header>
      </main>
      <form action={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          className="rounded-md border border-neutral-300 p-4 px-4 py-2 dark:border-neutral-700"
          type="email"
        />
        <button
          className="rounded-md bg-neutral-800 px-4 py-2 text-white hover:shadow dark:bg-neutral-200"
          type="submit"
        >
          이메일 전송
        </button>
      </form>
    </div>
  );
}
