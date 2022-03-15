import { setTypeValues } from "@workspace/shared/util";

export interface CostCode {
    id?: string;
    name?: string;
    number?: string;
    numberName?: string;

  }

  export function createCostCode(costCode: CostCode| undefined){
    const newCostCode: CostCode = {};
    if (costCode) {
      const properties = ['id', 'name', 'number', 'numberName'];
      setTypeValues<CostCode>(costCode, newCostCode, properties);
    }
    return newCostCode;
  }

