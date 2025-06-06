"use client";
import { FormState } from "./types";
import { isValidCode, sendEmail } from "./utils";

export async function action(
  prev: FormState,
  fd: FormData,
): Promise<FormState> {
  try {
    switch (prev.step) {
      case 0: {
        const email = fd.get("email")?.toString();
        if (!email) throw "이메일을 입력해주세요.";
        if (!email.endsWith("@korea.ac.kr"))
          throw "korea.ac.kr 이메일을 입력해주세요.";
        const sended = await sendEmail(email)
          .then(() => true)
          .catch(() => false);
        if (!sended) throw "인증번호 전송에 실패했습니다.";
        return {
          ...prev,
          step: 1,
          email: email || "",
        };
      }
      case 1: {
        const code = fd.get("code")?.toString();
        if (!code) {
          throw "인증번호를 입력해주세요.";
        }
        const valid = await isValidCode(prev.email, code).catch(() => ({
          ok: false,
          message: "요청을 완료하지 못했습니다. 인터넷 연결을 확인하세요.",
        }));
        if (!valid.ok) throw valid.message || "인증번호가 유효하지 않습니다.";
        return {
          ...prev,
          step: 2,
          oneTimeCode: code,
          error: null,
        };
      }
      case 2: {
        return prev;
      }
    }
  } catch (error) {
    if (typeof error !== "string") console.error(error);
    return {
      ...prev,
      error:
        typeof error === "string" ? error : "알 수 없는 오류가 발생했습니다.",
    };
  }
}
