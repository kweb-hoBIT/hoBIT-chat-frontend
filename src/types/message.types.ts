export type Message = {
  messageId: string;
  sender: "self" | "other";
  text: string;
};
