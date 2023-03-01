import { Timer } from '../Timer/Timer';
import style from './app.module.css';

function App() {
  return (
    <div className={style.app}>
      <section className={style.sapper}>
        <header className={style.header}>
          <Timer m={40} type='timer' />
          <Timer m={0} type='stopwatch' />
        </header>
        <div className={style.minefield}></div>
      </section>
    </div>
  );
}

export default App;
