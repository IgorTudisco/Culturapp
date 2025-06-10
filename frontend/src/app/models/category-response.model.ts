import { EventResponse } from './event-response.model';

export class CategoryResponse {
  id?: number;
  name?: string;
  description?: string;
  events?: EventResponse[];
}
