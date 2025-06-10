import { AddressResponse } from "./address-response.model";
import { EventResponse } from "./event-response.model";
import { PhoneResponse } from "./phone-response.model";

export interface EnterpriseUserResponse {
  id: number;
  userName?: string;     // Nome fantasia
  fullName?: string;     // Razão social
  cnpj?: string;
  email?: string;
  events?: (EventResponse | null)[];
  phones?: (PhoneResponse | null)[];
  addressId?: number;
  address?: AddressResponse | null;
}
