export interface Message {

  id: number;
  senderId: number;
  senderAlias: string;
  senderPhotoURL: string;
  recipientPhotoURL: string;
  recipientId: number;
  recipientAlias: string;
  content: string;
  recipientOpened: boolean;
  dateRecipientOpened: Date;
  timeSent: Date;

}
