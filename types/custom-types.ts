export interface EventState {
  image: null | File;
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
  id?: string | null;
  image: null | any;
  author_id?: string;
  category: string | null;
  description: string | null;
  endDate: string | null;
  endTime: string | null;
  format: string | null;
  language: string[] | null;
  location: string | null;
  name: string | null;
  startDate: string | null;
  startTime: string | null;
  subcategory: string[] | null;
  text: string | null;
  publish: boolean;
}

export interface TicketsInfo {
  ticketCost: number;
  ticketCount: number;
  ticketCurrency: string;
  isFree: boolean;
}
