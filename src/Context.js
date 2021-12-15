import { useState, createContext, useContext } from 'react';
import { isPlatform } from '@ionic/react';

const Context = createContext();

const ContextComponent = props => {
  const [tournamentId, setTournamentId] = useState('');
  const [tournament, setTournament] = useState({});
  const [players, setPlayers] = useState([]);
  const [fechasTotales, setFechasTotales] = useState([]);
  const [standingsCalculated, setStandingsCalculated] = useState(true);
  const [standingsPlayers, setStandingsPlayers] = useState([]);

  return (
    <Context.Provider
      value={{
        ...props.value,
        tournamentId,
        setTournamentId,
        tournament,
        setTournament,
        players,
        setPlayers,
        fechasTotales,
        setFechasTotales,
        standingsCalculated,
        setStandingsCalculated,
        standingsPlayers,
        setStandingsPlayers,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export function useGlobalState() {
  const globalState = useContext(Context);
  return globalState;
}

export default ContextComponent;
