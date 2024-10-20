'use client'
import VerticalDotsIcon from '@/components/icons/verticalDots';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown';
import { useScripts } from '@/core/hooks/useScript';
import { AuthResponse } from '@/core/models/login';
import { Script } from '@/core/models/script';
import { api } from '@/core/services/api';
import { formatDate, translateStatus } from '@/core/utils/masks';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDownUp, ArrowUpDown, EyeIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { DefaultPagination } from '../../custom/defaultPagination';
import { TableEmptyState } from '../../custom/tableEmptyState';
import { Skeleton } from '../../ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';

export function ScriptsTable() {
  const { paging, isLoadingScripts, scripts, refetchScripts } = useScripts();
  const session = useSession();
  
  const columns: ColumnDef<Script>[] = [
    {
      header: 'Autor',
    },
    {
      header: 'Status',
    },
    {
      header: 'Data de envio',
    },
    {
      header: 'Email',
    },
    {
      header: 'Opções',
    },
  ]

  const table = useReactTable({
    data: scripts.rows,
    columns: columns as never,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const openPdf = (base64String: string) => {
    const pdfWindow = window.open();
    if (pdfWindow) {
      const pdfData = base64String.replace('data:application/pdf;base64,', '');
      const blob = new Blob([Uint8Array.from(atob(pdfData), c => c.charCodeAt(0))], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      pdfWindow.location.href = url;
    }
  };

  const changeToAnalys = async (status: string, id: string) => {
    try {
      await api.patch('/script/update-status', {
        status,
        scriptId: id,
        responsibleId: (session.data?.user as AuthResponse)?.acess.id
      })
      toast.success('Roteiro assumido com sucesso!')
      refetchScripts()
    } catch (error) {
      toast.error('Ocorreu um erro ao assumir o roteiro.')
      console.error(error)
    }
  }


  return (
    <div className="flex flex-col flex-1 pb-6">
      <div className="flex flex-1 flex-col max-h-[calc(100dvh-26rem)] overflow-y-auto relative">
        <div className="w-screen overflow-x-auto lg:w-full relative ">
          <Table>
            <TableHeader className="sticky top-0 bg-[#F8FAFC]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none flex items-center gap-2'
                                : '',
                              onClick: () =>
                                header.column.toggleSorting(
                                  header.column.getIsSorted() === 'asc',
                                ),
                            }}
                          >
                            {isLoadingScripts ? (
                              <Skeleton className="h-5 w-full" />
                            ) : (
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )
                            )}
                            {header.column.getCanSort() &&
                              !isLoadingScripts && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      {['asc', undefined, null].includes(
                                        header.column.getIsSorted() as string,
                                      ) ? (
                                        <ArrowDownUp className="size-4 " />
                                      ) : (
                                        <ArrowUpDown className="size-4 " />
                                      )}
                                    </TooltipTrigger>
                                    <TooltipContent>Ordenar</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                          </div>
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {scripts.rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <div className='flex items-center w-fit px-2 justify-center rounded-full bg-gray-200'>
                      <p className='text-brand font-medium'>{translateStatus(row.status)}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(String(row.createdAt))}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <DropdownMenu >
                      <DropdownMenuTrigger className='cursor-pointer w-fit' >
                        <VerticalDotsIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {(session.data?.user as AuthResponse)?.acess.role !== 'CLIENT' && row.status === 'AWAITNG_ANALYSIS' ? (
                          <div
                            onClick={() => changeToAnalys('IN_ANALYSIS', row.id)}
                            className='flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md'>
                            <p>Assumir roteiro</p>
                          </div>
                        ) : (
                          <div
                            onClick={() => openPdf(row.scriptFile)}
                            className='flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md'>
                            <EyeIcon size={16} />
                            <p>Visualiar</p>
                          </div>
                        )}
                        
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {scripts.rows.length === 0 && !isLoadingScripts && (
          <TableEmptyState>
            Nenhum roteiro no momento.
          </TableEmptyState>
        )}
      </div>

      {scripts.count > 0 && (
        <DefaultPagination totalRecords={scripts.count} paging={paging} />
      )}
    </div>
  )
}
