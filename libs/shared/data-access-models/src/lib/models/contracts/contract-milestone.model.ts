import { setTypeValues } from "@workspace/shared/util";
export interface ContractMilestone {
  date?: Date;
  details?: string;
}

const milestoneProps = ['date', 'details']


export function createContractMilestone(value: ContractMilestone | undefined) {
  const newValue: ContractMilestone = {};
  if (value) {
    setTypeValues<ContractMilestone>(value, newValue, milestoneProps);
  }
  return newValue;
}
