import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) {
  if (totalPages <= 1) return null; // Hide if no pagination needed

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Prev Button */}
      <button
        className="btn btn-sm btn-outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" /> Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn btn-sm ${
            currentPage === page ? "btn-primary text-white" : "btn-outline"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="btn btn-sm btn-outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
