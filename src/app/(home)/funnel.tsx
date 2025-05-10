import { useEffect, useState } from "react";

interface Props {
  email: string;
}

function useCountdown(duration: number, callback: (x: number | null) => void) {
  useEffect(() => {
    let timer: number = duration;

    const interval = setInterval(() => {
      timer -= 1;
      callback(timer);
      if (timer <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, callback]);
}

export function Funnel({ email }: Props) {
  return (
    <div>
      이메일로 전송된 OTP를 입력해주세요.
      <button>다시 보내기</button>
    </div>
  );
}
