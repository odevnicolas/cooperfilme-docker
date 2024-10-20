'use client'

import { CustomSheetHeader } from '@/components/custom/customSheetHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AuthResponse } from '@/core/models/login'
import { api } from '@/core/services/api'
import { formatPhoneNumber } from '@/core/utils/masks'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

export function ScriptSheet() {
  const session = useSession()
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneNumerAlt, setPhoneNumerAlt] = useState<string>('');

  const handleCreateScript = async () => {
    const payload = {
      name: (session.data?.user as AuthResponse)?.acess.name,
      email: (session.data?.user as AuthResponse)?.acess.email,
      phoneNumber: phoneNumber,
      phoneNumerAlt: phoneNumerAlt,
      scriptFile: fileData,
    }

    try {
      await api.post('/script/create', payload)
      toast.success('Roteiro criado com sucesso!')
    } catch (error) {
      toast.error('Ocorreu um erro ao criar o roteiro, tente novamente.')
      console.error(error)
      return
    }

    console.log(payload)
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="size-4 mr-4" />
          <span className="hidden lg:block">novo roteiro</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={'right'}
        className="py-8 px-4 w-screen overflow-y-auto h-[90vh] lg:h-screen lg:w-[450px]"
      >
        <CustomSheetHeader
          className="mb-10 lg:mb-16"
          title={`Novo roteiro`}
          description={`
            Essa é a chance de mostrar para o mundo o seu talento :)
            `}
        />

        <div className="w-full flex flex-col gap-4">
          <Label className="text-sm font-normal">Nome <span className='text-brand'>*</span></Label>
          <Input
            value={(session.data?.user as AuthResponse)?.acess.name}
            placeholder="Nome"
            disabled
          />

          <Label className="text-sm font-normal">Email <span className='text-brand'>*</span></Label>
          <Input
            value={(session.data?.user as AuthResponse)?.acess.email}
            placeholder="Email"
            disabled
          />
        </div>

        <div className="flex justify-between mt-6 gap-x-4 flex-col gap-y-6 lg:gap-y-0 lg:flex-row">
          <div className="w-full flex flex-col gap-4">
            <Label className="text-sm font-normal">Telefone <span className='text-brand'>*</span></Label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="w-full flex flex-col gap-4">
            <Label className="text-sm font-normal">Telefone 2</Label>
            <Input
              value={phoneNumerAlt}
              onChange={(e) => setPhoneNumerAlt(formatPhoneNumber(e.target.value))}
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        <div className='w-full border-dashed border-2 border-gray-300 hover:border-brand hover:text-brand text-gray-500 duration-200 transition-colors rounded-md p-4 flex justify-center cursor-pointer items-center mt-6'>
          <input
            type="file"
            accept=".pdf"
            className='absolute opacity-0 w-full cursor-pointer'
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                  const base64String = reader.result;
                  setFileData(base64String as string);
                };
                reader.readAsDataURL(file);
                setFileName(file.name);
              }
            }}
          />
          <p className='text-center text-sm  font-normal'>
            {fileName ? fileName : 'Enviar arquivo de roteiro (PDF)'}
          </p>
        </div>

        <Button
          onClick={() => handleCreateScript()}
          className='mt-5 w-full'>
          <span className="hidden lg:block">Criar roteiro</span>
        </Button>
      </SheetContent>
    </Sheet>
  )
}
