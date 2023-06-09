export const getPaginatedItems = <T>(
  items: T[],
  currentPage: number,
  pageSize: number,
  totalItems: number,
) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data: items,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
      pageSize,
    },
  };
};
