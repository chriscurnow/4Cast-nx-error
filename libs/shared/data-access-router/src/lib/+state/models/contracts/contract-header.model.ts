export interface SubcontractHeader {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  paymentNumber: number | undefined;
  costCodeId?: string | undefined;
  supplierId?: string | undefined;
  headContractorId?: string | undefined;
  projectId?: string | undefined;
}
