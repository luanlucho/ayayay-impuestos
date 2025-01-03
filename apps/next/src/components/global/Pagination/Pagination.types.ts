// Pagination types and interfaces

// Component Props
export interface PaginationProps {
  className?: string;
  count: number | undefined;
  page: number;
  size: number;
  onPageChange?: (newPage: number, size: number) => void;
}
