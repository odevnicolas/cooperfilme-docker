import CooperFilmeIcon from '../icons/logo'

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-screen h-screen bg-white">
      <div className="animate-pulse">
        <CooperFilmeIcon />
      </div>
      <h2 className="text-base text-neutral-700">Carregando...</h2>
    </div>
  )
}
