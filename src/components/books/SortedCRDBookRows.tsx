import { SortedBookRowsProps } from './books.model';
import { CRDBookRow } from './CRDBookRow';

export const SortedCRDBookRows = ({ rows }: SortedBookRowsProps) => {
  return <>{rows.map(CRDBookRow)}</>;
};
