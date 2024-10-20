import CooperFilmeIcon from "@/components/icons/logo";
import { LoginForm } from "../../../../components/custom/loginForm";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 bg-white lg:bg-background">
      <header className="fixed top-0 left-0 right-0 bg-white border-0 flex items-center h-20 px-8 lg:border-b">
        <CooperFilmeIcon/>
        <p className="text-brand font-bold">COO<span className="text-grays-80">PERFILME</span></p>
      </header>
      <div className="flex flex-col flex-1 items-center justify-center">
        <LoginForm />
      </div>
      <footer className="fixed bottom-0 left-0 right-0 text-center py-8 text-neutral-800 text-base lg:py-16">
        {new Date().getFullYear()} © todos os direitos reservados.
      </footer>
    </main>
  );
}
