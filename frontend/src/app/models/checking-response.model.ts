import { EventResponse } from './event-response.model';
import { ClientUserResponse } from './client-user-response.model';

export interface CheckingResponse {
  id?: number;
  checkInDate?: Date;
  event?: EventResponse;
  clientUser?: (ClientUserResponse | null)[];
}
