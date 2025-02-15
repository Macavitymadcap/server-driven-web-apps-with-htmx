import { SortedBookRowsProps } from './books.model';
import { CRUDBookRow } from './CRUDBookRow';

export const SortedCRUDBookRows = ({ rows }: SortedBookRowsProps) => {
  return (
    <>
      {rows.map(row => (
        <CRUDBookRow key={row.id} {...row} />
      ))}
    </>
  );
};
