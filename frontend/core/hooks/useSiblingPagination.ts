import { useMemo } from 'react'

const range = (start: number, end: number) => {
  const length = end - start + 1
  /*
  	Cria um array de determinado tamanho e define os elementos dentro do valor de início (start) e de fim (end).
  */
  return Array.from({ length }, (_, idx) => idx + start)
}

interface UseSiblingPaginationData {
  totalCount: number
  pageSize: number
  siblingCount: number
  currentPage: number
}

export const DOTS = '..'
export const useSiblingPagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UseSiblingPaginationData) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    // A contagem de páginas é determinada com siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5

    /*
      Caso 1:
      Se o número de páginas for inferior aos números das páginas que queremos exibir em nosso paginationComponent, retornamos o intervalo [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    /*
    	Calcular o índice irmão à esquerda e à direita e garantir que eles estão dentro do intervalo entre 1 e totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    )

    /*
      Não mostramos pontos apenas quando há apenas um número de página a ser inseridos entre os extremos dos irmãos e os limites das páginas, ou seja, 1 e totalPageCount. Assim, estamos usando leftSiblingIndex > 2 e rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    /*
    	Caso 2: Não há pontos à esquerda para serem exibidos, mas pontos à direita para exibir
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    /*
    	Caso 3: Não há pontos à direita para serem exibidos, mas pontos à esquerda para exibir
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
    	Caso 4: Pontos à esquerda e à direita para exibir
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}
