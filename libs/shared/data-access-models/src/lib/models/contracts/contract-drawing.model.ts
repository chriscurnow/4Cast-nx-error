import { setTypeValues } from "@workspace/shared/util";

export interface ContractDrawing {
  id?: string;
  drawingNumber?: string;
  name?: string;
  revision?: string;
  date?: Date;
  file?: string;
}

export const drawingProps: string[] = [
  'id',
  'drawingNumber',
  'name',
  'revision',
  'date',
  'file',
];

export function createContractDrawing(drawing: ContractDrawing | undefined){
  const newDrawing: ContractDrawing = {};
  if(drawing){

    setTypeValues<ContractDrawing>(drawing, newDrawing, drawingProps);
  }
  return newDrawing;
}
