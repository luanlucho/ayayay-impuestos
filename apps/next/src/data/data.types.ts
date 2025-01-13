export interface IRTableRow {
  start: number;
  end: number;
  base: number;
  rate: number;
}

export interface FeriadosTableRow {
  date: string;
  name: string;
  original_date: string;
  highlighted?: boolean;
}

export interface FeriadosProvicialesTableRow extends FeriadosTableRow {
  province: string;
}
