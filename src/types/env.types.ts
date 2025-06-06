export const envKeys = ["NEXT_PUBLIC_API_URL"] as const;

export type EnvKeys = (typeof envKeys)[number];
