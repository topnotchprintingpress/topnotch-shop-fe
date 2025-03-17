"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
}

function PaginationComponent({
  currentPage,
  totalPages,
}: PaginationComponentProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Function to create a URL with updated page query parameter
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate visible page numbers (e.g., [1, 2, 3, ..., 10])
  const visiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      // If total pages are small, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page, and last page with ellipsis in between
      pages.push(1);
      if (currentPage > 3) {
        pages.push(-1); // -1 represents an ellipsis
      }
      if (currentPage > 2 && currentPage < totalPages - 1) {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      } else if (currentPage === 2) {
        pages.push(currentPage, currentPage + 1);
      } else if (currentPage === totalPages - 1) {
        pages.push(currentPage - 1, currentPage);
      }
      if (currentPage < totalPages - 2) {
        pages.push(-1); // -1 represents an ellipsis
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage - 1)}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {visiblePages().map((page, index) =>
            page === -1 ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href={createPageURL(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginationComponent;
