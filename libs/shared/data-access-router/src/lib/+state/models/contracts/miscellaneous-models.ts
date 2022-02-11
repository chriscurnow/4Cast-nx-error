export interface ContractTax {
  // TODO: [FCNG-286] Fill out interface for ContractTaxInterface
  amount: number;
}

export interface BankGuarantee {
  details: string;
  date: Date;
  amount: string;
  released: boolean;
  dateReleased: Date;
}

export interface RetentionItem {
  date: Date;
  amount: string;
}

export interface Retention {
  retentionRate: number;
  retentionMax: number; // maximum percentage
  retentionsTaken: RetentionItem[];
  retentionsReleased: RetentionItem[];
}

export interface ContractSecurity {
  securityType?: any;
  bankGuarantees?: BankGuarantee[];
  retention?: Retention;
}
