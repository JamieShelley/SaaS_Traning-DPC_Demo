

export interface IFileInfoEntry {
  fileUID: string,
  fileName: string,
  usernameOwner: string;
  userLevel: string;
  otherUsersCanRead: Array<string>;
  otherUsersCanWrite: Array<string>;
  therUsersCanDelete: Array<string>;
  dateAdded: { MM: number; DD: number; YYYY: number }
  timeAdded: { hh: number; mm: number };
  associatedMatterName: string;
  virtualFolder: string;
}
