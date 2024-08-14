export interface INotification {
  TargetOrganisation: string;
  Title: string;
  Desription: string;
  Sender: string;
  Receiver: string;
  Response:string;
  Responded: boolean;
  ResponseRead: boolean;
  TransmissionMethod: 'App' | 'App&SMS' | 'App&Email' | 'App&SMS&Email'
  CreationDate: {Mm: number; HH: number, MM: number; DD: number; YYYY: number }
}