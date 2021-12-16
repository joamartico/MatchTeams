import {
  IonPage,
  IonContent,
  useIonRouter,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/react';
import { addOutline, trashOutline } from 'ionicons/icons';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { COLORS } from '../../styles/theme';
import { Icon, Padding, Text } from '../components/StyledComponents';
import { useGlobalState } from '../Context';

const Main = () => {
  const [tournaments, setTournaments] = useState([]);
  const router = useIonRouter();
  const { setPlayers, setTournament } = useGlobalState();

  async function getTournaments() {
    console.log('RESET');
    await setPlayers([]);
    await setTournament();

    db.collection('tournaments')
      .orderBy('timestamp', 'desc')
      // .get()
      // .then(snapshot => {
      .onSnapshot(snapshot => {
        console.log(snapshot.docs);
        setTournaments(
          snapshot.docs.map(doc => {
            var newDoc = doc.data();
            newDoc.id = doc.id;
            return newDoc;
          })
        );
      });
  }

  useEffect(() => {
    const isDarkMode =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    getTournaments();
    if (router.routeInfo.pathname === '/') {
      document
        .querySelector('meta[name="theme-color"]')
        // .setAttribute('content', isDarkMode ? '#000' : '#ceebeb');
        .setAttribute('content', isDarkMode ? '#1e1e1e' : '#ceebeb');
    } else {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute('content', isDarkMode ? '#0d0d0d' : '#fff');
    }
  }, [router.routeInfo.pathname]);

  const deleteTournament = id => {
    db.collection('tournaments').doc(id).delete();
  };

  return (
    <IonPage>
      <IonContent className="scroll" fullscreen>
        <FloatingButton onClick={() => router.push('new-tournament')}>
          <Icon icon={addOutline} size={40} weight="40" iconColor="#530" />
        </FloatingButton>

        <IonList>
          <Text size="34" weight="bold" ml="4%">
            Torneos
          </Text>
          {tournaments.map(tournament => (
            <StaticCard>
              <SlidingCard
                lines="none"
                key={tournament.id}
                onClick={() => router.push('tournament/' + tournament.id)}
              >
                <Text size="16" weight="bold">
                  {tournament.name}
                </Text>
              </SlidingCard>

              <IonItemOptions side="end">
                <DeleteOption
                  color="danger"
                  // expandable
                  onClick={() => deleteTournament(tournament.id)}
                >
                  <Icon icon={trashOutline} size={20} iconColor="white" weight="35" />
                </DeleteOption>
              </IonItemOptions>
            </StaticCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Main;

const DeleteOption = styled(IonItemOption)`
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 55px;
  margin-right: 4.1%;
  margin-left: 8px;
  z-index: 99999999 !important;

`;

const SlidingCard = styled(IonItem)`
  width: 92%;
  border-radius: 15px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  height: 55px;
`;

const StaticCard = styled(IonItemSliding)`
  height: 70px;
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${COLORS.primary};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;
