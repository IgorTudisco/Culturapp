import { EventResponse } from './event-response.model';

export class FaqResponse {
  id?: number;
  question?: string;
  answer?: string;
  event?: EventResponse;
}
