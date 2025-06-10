import { PhoneResponse } from './phone-response.model';
import { AddressResponse } from './address-response.model';
import { EventResponse } from './event-response.model';
import { CheckingResponse } from './checking-response.model';

export class ClientUserResponse {
  userName?: string;
  fullName?: string;
  cpf?: string;

  phone?: PhoneResponse;
  address?: AddressResponse;

  events?: (EventResponse | null)[];
  checkings?: (CheckingResponse | null)[];
}
