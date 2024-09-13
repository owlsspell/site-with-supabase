export interface EventState {
  title: string;
  summary: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  isOnline: boolean;
  about: string;
  category: string;
  subcategory: string[];
  format: string;
  language: string[];
  isFree: boolean;
  ticketPrice?: number;
  ticketCount?: number;
}
export interface CreatedEventState {
  author_id: string;
  category: number;
  description: string;
  endDate: string;
  endTime: string;
  format: string;
  language: string[];
  location: string;
  name: string;
  startDate: string;
  startTime: string;
  subcategory: string[];
  text: string;
}
