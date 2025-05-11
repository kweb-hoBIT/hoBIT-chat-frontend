import { Sender } from "./enums/sender.enum";

export type Message = {
  messageId: string;
  sender: Sender;
  text: string;
  fileUrls?: string[];
};
