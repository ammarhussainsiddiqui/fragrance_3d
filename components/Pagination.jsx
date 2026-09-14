'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Pagination({ pageCount, currentPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(
        <Link
          key={i}
          href={`/blog?page=${i}`}
          className={`px-4 py-2 mx-1 rounded-full font-sans text-sm transition-colors ${
            currentPage === i ? 'bg-ivory text-ink' : 'bg-transparent text-champagne hover:text-ivory border border-ivory/20'
          }`}
        >
          {i}
        </Link>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <Link
        href={`/blog?page=${Math.max(1, currentPage - 1)}`}
        className={`px-4 py-2 mx-1 rounded-md font-sans text-xs uppercase tracking-[0.2em] ${
          currentPage === 1 ? 'bg-transparent text-stone cursor-not-allowed ' : 'bg-transparent text-champagne hover:text-ivory'
        }`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
      >
        Previous
      </Link>
      {renderPageNumbers()}
      <Link
        href={`/blog?page=${Math.min(pageCount, currentPage + 1)}`}
        className={`px-4 py-2 mx-1 rounded-md font-sans text-xs uppercase tracking-[0.2em] ${
          currentPage === pageCount ? 'bg-transparent text-stone cursor-not-allowed' : 'bg-transparent text-champagne hover:text-ivory'
        }`}
        aria-disabled={currentPage === pageCount}
        tabIndex={currentPage === pageCount ? -1 : undefined}
      >
        Next
      </Link>
    </div>
  );
}
