import Header from './components/Header';
import Board from './components/Board';
import Keyboard from './components/Keyboard';

function App() {
  return (
    <div className="min-h-screen text-slate-800 dark:bg-dark dark:text-white">
      <div className="mx-auto max-w-[550px] space-y-10 py-6 pb-8">
        <Header />
        <Board />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
