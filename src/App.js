import Navbar from "./components/navbar";
import Info from "./components/info";
import Stats from "./components/stats";
import Charts from "./components/charts";
import DoughnoutCharts from "./components/doughnoutCharts";
import Transactions from "./components/transactions";
import Accounts from "./components/accounts";
import { useStore } from './store/useStore';

const App = () => {
  const theme = useStore((state) => state.theme);
  return <main className= {theme}>
    <div className="w-full px-6 md:px-20 bg-white dark:bg-slate-900">
      <Navbar />
      <div className="px-0 md:px-5 2xl:px-20">
        <Info title='Dashboard' subTitle='Monitor your financial activities'/>
        <Stats />
        <div className="w-full flex flex-col-reverse md:flex-row items-center gap-10">
          <Charts />
          <DoughnoutCharts />
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-0 md:gap-10 2xl:gap-20">
          <Transactions />
          <Accounts />
        </div>
      </div>
    </div>
  </main>
};

export default App;
