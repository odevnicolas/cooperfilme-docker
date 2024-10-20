/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { UsePaginationResult } from '@/core/hooks/usePagination'
import { DOTS, useSiblingPagination } from '@/core/hooks/useSiblingPagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface Props {
  paging: UsePaginationResult
  totalRecords: number
}

export const DefaultPagination = ({ paging, totalRecords }: Props) => {
  const { page, pageSize, setPage } = paging
  const paginationRange = useSiblingPagination({
    currentPage: page,
    totalCount: totalRecords,
    siblingCount: 1,
    pageSize,
  })
  const isLastPage = page === Math.ceil(totalRecords / pageSize)

  const onNext = () => {
    !isLastPage && setPage(page + 1)
  }

  const onPrevious = () => {
    page !== 1 && setPage(page - 1)
  }

  return (
    <Pagination>
      <PaginationContent className="flex items-center gap-6">
        <PaginationItem
          onClick={onPrevious}
          className="flex items-center gap-2 cursor-pointer text-sm data-[disabled=true]:text-neutral-500 data-[disabled=true]:cursor-not-allowed"
          data-disabled={page === 1}
        >
          <ChevronLeft className="size-4" /> <span>Anterior</span>
        </PaginationItem>
        <div className="flex items-center gap-2">
          {paginationRange?.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return <PaginationEllipsis key={pageNumber} />
            }
            return (
              <PaginationItem key={pageNumber}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <PaginationLink
                        isActive={page === pageNumber}
                        onClick={() => setPage(pageNumber as number)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </TooltipTrigger>
                    <TooltipContent>
                      Ir para a página {pageNumber}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </PaginationItem>
            )
          })}
        </div>
        <PaginationItem
          onClick={onNext}
          className="flex items-center gap-2 cursor-pointer text-sm data-[disabled=true]:text-neutral-500 data-[disabled=true]:cursor-not-allowed"
          data-disabled={isLastPage}
        >
          Próximo <ChevronRight className="size-4" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
