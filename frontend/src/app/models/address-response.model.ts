export interface AddressResponse {
  id: number;
  street?: string;
  addressNumber?: string;
  neighborhood?: string;
  complement?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  enterpriseUserId?: number;
  eventId?: number;
}
