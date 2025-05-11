import { cn } from "@/utils";
import type { FunnelProps } from "./types";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HoBIT3d from "@/resources/hobit3d.png";

export function Funnel0({ state, formAction, isPending }: FunnelProps) {
  return (
    <form
      action={formAction}
      className={cn(
        "flex min-h-dvh flex-col items-center justify-center gap-8 p-8 font-[family-name:var(--font-geist-sans)]",
        isPending && "animate-pulse",
      )}
    >
      <header className="flex flex-row items-center justify-center gap-4">
        <Image
          src={HoBIT3d}
          alt="hoBIT character"
          width={128}
          height={128}
          placeholder="blur"
        />
        <h1>
          <span className="text-6xl font-bold">hoBIT</span>
        </h1>
      </header>
      <div className="flex flex-row items-stretch justify-stretch">
        <input
          autoComplete="email"
          type="email"
          name="email"
          className="rounded-md bg-neutral-50 p-4 dark:bg-neutral-800"
          placeholder="korea.ac.kr 이메일 주소"
        />
        {isPending ? (
          <p>인증번호 전송중...</p>
        ) : (
          state.error && <p>{state.error}</p>
        )}
        <button type="submit" className="bg-primary-500 rounded-md p-4">
          Go
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-neutral-50 p-8 text-center dark:bg-neutral-800">
        <p>정보대학 행정실과 실시간 채팅 상담하기</p>

        <p>
          상담을 위해 <b>고려대학교</b> 이메일 주소를 인증해주세요.
        </p>

        <p>현재 상태: 🔴 부재 중</p>
      </div>
    </form>
  );
}

export function Funnel1({ state, formAction, isPending }: FunnelProps) {
  return (
    <form
      action={formAction}
      className={cn(
        "flex min-h-screen flex-col items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20",
        isPending && "animate-pulse",
      )}
    >
      <p>
        <b>{state.email}</b> 로 전송된 인증번호를 입력하세요
      </p>
      <input
        autoComplete="one-time-code"
        type="text"
        name="code"
        className="rounded-md border-2 border-gray-300 p-2"
        placeholder="인증번호 입력"
      />
      <button
        type="submit"
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        인증번호 확인
      </button>
    </form>
  );
}

export function Funnel2() {
  const router = useRouter();

  useEffect(() => {
    router.push("/chat");
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-6xl font-bold">hoBIT</h1>
      <p>인증이 완료되었습니다. 이동 중...</p>
    </div>
  );
}
