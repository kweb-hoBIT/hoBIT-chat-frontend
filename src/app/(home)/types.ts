import type { useActionState } from "react";

export type FormAction = ReturnType<typeof useActionState<FormState, FormData>>;

export type FunnelProps = {
  state: FormAction[0];
  formAction: FormAction[1];
  isPending: FormAction[2];
};

export type FormState = {
  step: 0 | 1 | 2;
  email: string;
  oneTimeCode: string | null;
  error: string | null;
};

export const initialState: FormState = {
  step: 0,
  email: "",
  oneTimeCode: null,
  error: null,
};
