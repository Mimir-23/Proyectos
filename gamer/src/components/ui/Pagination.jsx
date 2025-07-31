import { motion } from 'framer-motion';
import { 
  FaChevronLeft, 
  FaChevronRight 
} from 'react-icons/fa';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalCount, 
  pageSize = 20,
  loading = false 
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    // En móvil solo mostrar página actual y adyacentes
    const isMobile = window.innerWidth < 640;
    const delta = isMobile ? 1 : 2;
    const range = [];

    // Siempre incluir la primera página
    if (currentPage > delta + 1) {
      range.push(1);
      if (currentPage > delta + 2) {
        range.push('...');
      }
    }

    // Páginas alrededor de la actual
    for (let i = Math.max(1, currentPage - delta); 
         i <= Math.min(totalPages, currentPage + delta); 
         i++) {
      range.push(i);
    }

    // Siempre incluir la última página
    if (currentPage < totalPages - delta) {
      if (currentPage < totalPages - delta - 1) {
        range.push('...');
      }
      range.push(totalPages);
    }

    // Remover duplicados
    return [...new Set(range)];
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Results info - Solo en desktop */}
      <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium text-gray-900 dark:text-white">
          {startItem}-{endItem}
        </span>
        {' '}de{' '}
        <span className="font-medium text-gray-900 dark:text-white">
          {totalCount.toLocaleString()}
        </span>
      </div>

      {/* Mobile info - Solo página actual */}
      <div className="sm:hidden text-sm text-gray-600 dark:text-gray-400">
        Página{' '}
        <span className="font-medium text-gray-900 dark:text-white">
          {currentPage}
        </span>
        {' '}de{' '}
        <span className="font-medium text-gray-900 dark:text-white">
          {totalPages}
        </span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Página anterior"
        >
          <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {visiblePages.map((page, index) => (
            <motion.div
              key={`${page}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {page === '...' ? (
                <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-gray-400 text-sm">
                  ⋯
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  disabled={loading}
                  className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  } disabled:opacity-30 disabled:cursor-not-allowed`}
                  aria-label={`Ir a página ${page}`}
                >
                  {page}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Página siguiente"
        >
          <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="sm:hidden flex items-center gap-2 text-primary text-sm">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span>Cargando...</span>
        </div>
      )}
    </motion.div>
  );
};

export default Pagination;
