'use client'
import { FiltersWrapper } from '@/components/custom/filtersWrapper'
import { useScripts } from '@/core/hooks/useScript'
import { RefreshCcw } from 'lucide-react'
import { Button } from '../../ui/button'
import { ScriptSheet } from './scriptSheet'
import { useSession } from 'next-auth/react'
import { AuthResponse } from '@/core/models/login'

export function ScriptsFilters() {
  const { refetchScripts, isFetchingScripts } = useScripts();
  const session = useSession();
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

        {(session.data?.user as AuthResponse)?.acess.role === 'CLIENT' && (
          <ScriptSheet />
        )}
      </div>
    </FiltersWrapper>
  )
}
