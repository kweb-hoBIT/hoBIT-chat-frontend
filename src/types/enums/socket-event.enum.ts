export enum SocketEvent {
  Connection = "connection",
  Disconnection = "disconnect",
  UserTyping = "userTyping",
  AdminTyping = "adminTyping",
  UpdateUserList = "users",
  MsgFromUser = "msgFromUser",
  MsgFromAdmin = "msgFromAdmin",
  UserSelected = "selectUser",
  Echo = "echo",
  SavedMessages = "history",
}
