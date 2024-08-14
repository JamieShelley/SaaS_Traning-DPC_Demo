// Unlike other entities,  IStopWatch is a subtype array under ledger
export interface IStopWatch{
  TargetMatterName: string;
  StartTime: {Mm: number; HH: number, MM: number; DD: number; YYYY: number }
  EndTime: {Mm: number; HH: number, MM: number; DD: number; YYYY: number }
}