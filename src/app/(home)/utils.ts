"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function sendEmail(email: string): Promise<void> {
  // mock API call to send email
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}


export async function isValidCode(
  email: string,
  code: string,
): Promise<boolean> {
  // mock API call to validate code
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(code === "fake-code");
    }, 1000);
  });
}
