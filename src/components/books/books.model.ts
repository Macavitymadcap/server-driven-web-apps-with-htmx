export interface BookRowProps {
  id: string;
  title: string;
  author: string;
  year: number;
}

export interface SortedBookRowsProps {
  rows: BookRowProps[];
}

export interface BookFormProps {
  selectedCRUDBookId: string;
  selectedBook?: BookRowProps;
  attrs: Record<string, string>;
}
