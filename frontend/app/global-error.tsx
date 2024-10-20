'use client'

export default function ErrorComponent() {
  return (
    <div className="flex flex-col gap-4 w-screen h-screen items-center justify-center text-center">
      <p className="text-base text-neutral-500 font-medium leading-relaxed">
        Infelizmente houve um erro ao carregar esta página, estamos trabalhando
        nisso
      </p>
    </div>
  )
}
