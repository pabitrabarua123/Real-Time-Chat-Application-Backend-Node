// src/types/socket.ts

export interface MessagePayload {
  roomId: string;
  sender: string;
  message: string;
  createdAt?: Date;
}

export interface ServerToClientEvents {
  receive_message: (data: MessagePayload) => void;
}

export interface ClientToServerEvents {
  send_message: (data: MessagePayload) => void;
  join_room: (roomId: string) => void;
}