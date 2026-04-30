import { useMemo, useState } from "react";

export function usePagination<T>(items: T[], initialItemsPerPage = 5) {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const changeItemsPerPage = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    itemsPerPage,
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    changeItemsPerPage,
    resetPage,
  };
}