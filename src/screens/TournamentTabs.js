import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import Team from '../components/Team';
import { useGlobalState } from '../Context';
import Matches from './Matches';
import Standings from './Standings';

const Tournament = () => {
  const [segment, setSegment] = useState('fechas');
  const router = useIonRouter();
  const { tournament, setTournament, setPlayers, setStandingsPlayers } = useGlobalState();

  const tournamentId = router.routeInfo.pathname.split('tournament/')[1];

  useEffect(() => {
    tournamentId &&
      db
        .collection('tournaments')
        .doc(tournamentId)
        .get()
        .then(snapshot => {
          setTournament(snapshot.data());
        });

    db.collection('tournaments')
      .doc(tournamentId)
      .collection('players')
      .get()
      .then(response => {
        const newPlayers = [];
        response.forEach(document => {
          const player = {
            id: document.id,
            ...document.data(),
          };
          newPlayers.push(player);
        });
        setPlayers(newPlayers);
      });

    console.log('PIDIENDO DATOS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>

          <IonTitle>{tournament?.name}</IonTitle>
        </IonToolbar>

        <IonToolbar>
          <IonSegment mode="md" value={segment} onIonChange={e => setSegment(e.detail.value)}>
            <IonSegmentButton value="fechas">Fechas</IonSegmentButton>
            <IonSegmentButton value="posiciones">Posiciones</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      {segment === 'fechas' ? (
        <Matches tournamentId={tournamentId} />
      ) : (
        <Standings tournamentId={tournamentId} />
      )}
    </IonPage>
  );
};

export default Tournament;

const Match = styled(IonRow)`
  max-width: 400px;
  margin: 50px auto;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Fecha = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 13px;
  margin-bottom: -10 px;
  margin-top: 60px;
`;
