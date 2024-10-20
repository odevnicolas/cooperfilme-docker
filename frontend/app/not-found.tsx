
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-20 text-center">
      <p className="font-medium text-neutral-500 leading-relaxed max-w-sm">
        Página não encontrada
      </p>
      <Link
        className="px-10 py-4 rounded bg-brand text-white hover:bg-brand/90 transition-colors"
        href="/"
      >
        Voltar para o início
      </Link>
    </div>
  )
}
