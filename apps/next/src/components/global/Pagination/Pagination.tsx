"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { PaginationProps as Props } from "./Pagination.types";
import { PaginationNext, PaginationPrevious } from "ui/pagination";
import { PaginationItem, PaginationLink } from "ui/pagination";
import { Pagination as PaginationCN } from "ui/pagination";
import { PaginationContent, PaginationEllipsis } from "ui/pagination";

const Pagination = (props: Props) => {
  const { className, count, page, size, onPageChange } = props;
  const [currentPage, setCurrentPage] = useState(page);
  const params = useSearchParams();
  if (!count) return null;

  const totalPages = Math.ceil(count / size);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const pageChangeHandler = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page, size);
  };

  const previousPageChangeHandler = () => {
    pageChangeHandler(currentPage - 1);
  };

  const nextPageChangeHandler = () => {
    pageChangeHandler(currentPage + 1);
  };

  const getPageNumber = (slot: number) => {
    let proximity = 0;
    // Only when currentPage is close to edges we need an offset
    if (currentPage <= 2) proximity = currentPage - 3;
    if (currentPage >= totalPages - 2) {
      proximity = totalPages - currentPage;
      if (proximity === 0) proximity = 2;
      else if (proximity === 2) proximity = 0;
    }
    let pageNumber = 0;

    if (totalPages < 5) {
      pageNumber = slot + 1;
    } else {
      if (slot === 0) pageNumber = currentPage - 2 - proximity;
      if (slot === 1) pageNumber = currentPage - 1 - proximity;
      if (slot === 2) pageNumber = currentPage - proximity;
      if (slot === 3) pageNumber = currentPage + 1 - proximity;
      if (slot === 4) pageNumber = currentPage + 2 - proximity;
    }
    return pageNumber;
  };

  const getHref = (pageNumber: number) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", pageNumber.toString());
    newParams.set("size", size.toString());
    return `?${newParams.toString()}`;
  };

  const renderPages = () => {
    const ellipsisLeft = currentPage > 2 && totalPages > 5;
    const ellipsisRight = currentPage < totalPages - 3 && totalPages > 5;
    const length = Math.min(totalPages, 5);
    return Array.from({ length }).map((_, i) => {
      if (ellipsisLeft && i === 0) {
        return (
          <PaginationItem key={i}>
            <PaginationEllipsis className="h-10 w-10" />
          </PaginationItem>
        );
      }
      if (ellipsisRight && i === length - 1) {
        return (
          <PaginationItem key={i}>
            <PaginationEllipsis className="h-10 w-10" />
          </PaginationItem>
        );
      }

      const pageNumber = getPageNumber(i);
      return (
        <PaginationLink
          key={i}
          href={getHref(pageNumber)}
          isActive={pageNumber === currentPage}
          onClick={() => pageChangeHandler(pageNumber)}
        >
          {pageNumber}
        </PaginationLink>
      );
    });
  };

  if (totalPages === 1) return null;
  return (
    <PaginationCN className={twMerge("Pagination", className)}>
      <PaginationContent>
        <PaginationPrevious
          href={getHref(currentPage - 1)}
          onClick={previousPageChangeHandler}
          className={twMerge(!hasPrevious ? "invisible" : "")}
        />
        {renderPages()}
        <PaginationNext
          href={getHref(currentPage + 1)}
          onClick={nextPageChangeHandler}
          className={twMerge(!hasNext ? "invisible" : "")}
        />
      </PaginationContent>
    </PaginationCN>
  );
};

export default Pagination;
