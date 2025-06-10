import { EventResponse } from './event-response.model';

export class StatusResponse {
  id?: number;
  statusName?: string;
  events?: EventResponse[];
}
