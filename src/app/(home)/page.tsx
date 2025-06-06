"use client";

import { useActionState } from "react";
import { Funnel0, Funnel1, Funnel2 } from "./funnel";
import { FormState, initialState } from "./types";
import { action } from "./action";

export default function Home() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    action,
    initialState,
  );

  switch (state.step) {
    case 0:
      return (
        <Funnel0 state={state} formAction={formAction} isPending={isPending} />
      );
    case 1:
      return (
        <Funnel1 state={state} formAction={formAction} isPending={isPending} />
      );
    case 2:
      return <Funnel2 />;
  }
}
