'use client'
import { FiltersWrapper } from '@/components/custom/filtersWrapper'
import { useScripts } from '@/core/hooks/useScript'
import { RefreshCcw } from 'lucide-react'
import { Button } from '../../ui/button'
import { ScriptSheet } from './scriptSheet'

export function ScriptsFilters() {
  const { refetchScripts, handleSearch, isFetchingScripts } = useScripts();
  return (
    <FiltersWrapper>
      <div className="flex items-center justify-between w-full gap-3 lg:justify-end">
        <Button
          size="sm"
          variant="outlineSecondary"
          onClick={() => refetchScripts()}
          disabled={isFetchingScripts}
        >
          <RefreshCcw
            className={`size-4 mr-4 ${isFetchingScripts && 'animate-spin'}`}
          />
          Atualizar
        </Button>

        <ScriptSheet />
      </div>
    </FiltersWrapper>
  )
}
