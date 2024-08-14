export interface ICalenderEntry {
  Date: { MM: number; DD: number; YYYY: number };
  Time: { hh: number; mm: number };
  EventOrTaskName: string;
  showOrHide: string;
  category: 'Event' | 'Personal' | 'Meeting' | 'Task' | 'Global event';
  show: boolean;
  Details: string;
  EventContentType:'html' | 'text'
}
