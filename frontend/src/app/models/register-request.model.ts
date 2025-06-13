export enum AccountType {
  clientUser = 0,
  enterpriseUser = 1
}

export class RegisterRequest {
  userName?: string;
  fullName?: string;
  email?: string;
  password?: string;
  accountType?: AccountType;
  cnpj?: string;
  cpf?: string;
}
