
import React from 'react';

export interface UsePaginationResult {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  pageSize: number;
  handlePageSize: (size: number) => void;
}

type InitialState = {
  pageSize?: number
}

export function usePagination(options?: InitialState) {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(options?.pageSize || 10);

  const handleNextPage = React.useCallback(() => {
    setPage(old => old + 1);
  }, []);

  const handlePreviousPage = React.useCallback(() => {
    setPage(old => old - 1);
  }, []);

  const handlePageSize = React.useCallback((size: number) => {
    setPageSize(size);
  }, []);

  return { page, setPage, pageSize, handleNextPage, handlePreviousPage, handlePageSize };
}
