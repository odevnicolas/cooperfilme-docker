import Header from '@/components/custom/header';
import { ScriptsFilters } from '@/components/pageBase/scripts/scriptFilters';
import { ScriptsTable } from '@/components/pageBase/scripts/scriptTable';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-dvh overflow-y-auto overflow-x-hidden lg:overflow-hidden">
      <div className="flex flex-col flex-1">
        <div className="block sticky top-0 bg-white z-20">
          <Header />
        </div>
        <main className="flex flex-1 px-0 lg:px-6">
          <div className="flex flex-col flex-1 w-full border-0 rounded bg-white mb-8 lg:border">
            <ScriptsFilters />
            <div className="flex flex-1">
              <ScriptsTable/>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home;