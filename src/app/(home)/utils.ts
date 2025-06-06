"use client";

export async function sendEmail(email: string): Promise<Response> {
  const url = new URL(
    `/api/createOTP/${email}`,
    process.env.NEXT_PUBLIC_API_URL,
  );

  return await fetch(url, {
    method: "POST",
  });
}

export async function isValidCode(
  mail: string,
  OTP: string,
): Promise<{ ok: boolean; message?: string }> {
  const url = new URL(`/api/authOTP`, process.env.NEXT_PUBLIC_API_URL);

  // mock API call to validate code
  return new Promise((resolve) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail,
        OTP,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}
