import { IonContent, IonGrid, IonRow } from '@ionic/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { Button, Scroll } from '../components/StyledComponents';
import Team from '../components/Team';
import { useGlobalState } from '../Context';

const Matches = ({ tournamentId }) => {
  const { tournament, setTournament, players } = useGlobalState();

  const tournamentRef = tournamentId && db.collection('tournaments').doc(tournamentId);

  const handleMasFechas = async () => {
    const newFechasTotales = [...tournament.shuffledPlayers, ...tournament.firstFecha];
    console.log('MAS FECHAS? TOMA: ', newFechasTotales);
    tournamentRef.update({
      shuffledPlayers: [...tournament.shuffledPlayers, ...tournament.firstFecha],
    });
    setTournament({
      ...tournament,
      shuffledPlayers: newFechasTotales,
    });


  };

  return (
    <>
      <IonContent>
        <Scroll>
          <IonGrid>
            {tournament?.shuffledPlayers?.map(
              (player, index) =>
                index % 2 == 0 && (
                  <>
                    {index % players.length == 0 && (
                      <Fecha>Fecha {index / players.length + 1}</Fecha>
                    )}
                    <Match>
                      <Team
                        name={player.name}
                        goals={player.goals}
                        local
                        i={index}
                        tournamentId={tournamentId}
                      />
                      <>-</>
                      <Team
                        name={tournament.shuffledPlayers[index + 1]?.name}
                        goals={tournament.shuffledPlayers[index + 1]?.goals}
                        tournamentId={tournamentId}
                        i={index + 1}
                      />
                    </Match>
                  </>
                )
            )}
          </IonGrid>
          <Button
              color="black"
              onClick={() => handleMasFechas()}
              background="linear-gradient(192deg, rgba(252,209,10,1) 0%, rgba(255,232,34,1) 41%, rgba(235,202,0,1) 100%)"
            >
              Más Fechas
            </Button>
        </Scroll>
      </IonContent>
    </>
  );
};

// export default memo(Matches);
export default Matches;

const Match = styled(IonRow)`
  /* max-width: 400px; 
  /* max-width: 80vw; */
  margin: 50px auto;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Fecha = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 5vw;
  margin-bottom: -16px;
  margin-top: 50px;
`;
