import { IonCol, IonContent, IonGrid, IonList, IonLoading, IonRow, IonSpinner } from '@ionic/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { COLORS } from '../../styles/theme';
import { Row, Scroll } from '../components/StyledComponents';

import { useGlobalState } from '../Context';

const Standings = ({ tournamentId }) => {
  //   const { standingsCalculated } = useGlobalState();
  const [standingsPlayers, setStandingsPlayers] = useState([]);
  const [totalGD, setTotalGD] = useState();
  const [loading, setLoading] = useState(false);

  async function calculateTotalGD() {
    const total = 0;
    await standingsPlayers.map(player => {
      total = total + player.goals - player.goalsConceded;
    });
    setTotalGD(total);
  }

  async function getStandingsPlayers() {
    tournamentId &&
      (await db
        .collection('tournaments')
        .doc(tournamentId)
        .collection('players')
        .get()
        .then(snapshot => {
          setStandingsPlayers(
            snapshot.docs.map(doc => {
              var newDoc = doc.data();
              newDoc.id = doc.id;
              return newDoc;
            })
          );
        }));

    await calculateTotalGD();

    if (totalGD != 0) {
      getStandingsPlayers();
    }
  }

  useEffect(() => {
    getStandingsPlayers();

    // setTimeout(() => {
    //   console.log('RENDER STANDINGS');
    // }, 2300);
  }, []);

  return (
    <IonContent>
      <Scroll>
        <Row mb="3.5%" mt="3.5%" columns="12.5% 25% 12.5% 12.5% 12.5% 12.5% 12.5%" color="#868686">
          <Col> </Col>
          <Col name={true}>Team</Col>
          <Col>PTS</Col>
          <Col>PG</Col>
          <Col>PE</Col>
          <Col>PP</Col>
          <Col>DG</Col>
        </Row>
        {standingsPlayers.length === 0 && (
          <>
            <IonSpinner name="crescent" />
          </>
        )}

        {standingsPlayers
          ?.sort((a, b) => b.goals - b.goalsConceded - (a.goals - a.goalsConceded))
          .sort((a, b) => b.points - a.points)
          .map((player, i) => (
            <Row mb="3.5%" columns="12.5% 25% 12.5% 12.5% 12.5% 12.5% 12.5%">
              <Position first={i == 0}>{i + 1}</Position>
              <Col name={true}>{player.name}</Col>
              <Col>{player.points}</Col>
              <Col>{player.wonGames}</Col>
              <Col>{player.drawnGames}</Col>
              <Col>{player.lostGames}</Col>
              <Col>
                {player.goals}:{player.goalsConceded}
                {/* {player.goals - player.goalsConceded > 0 && '+'} */}
                {/* {player.goals - player.goalsConceded} */}
              </Col>
            </Row>
          ))}
      </Scroll>
    </IonContent>
  );
};

export default Standings;

const Position = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ first }) => (first ? COLORS.primary : '#ccc')};
  height: 32px;
  width: 32px;
  padding: 0;
`;

const Col = styled.div`
  /* display: flex;
  justify-content: center;
  /* flex-shrink: ${name => (name ? '0.3' : '0.1')}; */
  /* width: ${name => (name ? '25px' : '5px')} !important; */
  /* flex-grow: ${name => (name && '1') || '0'}; */ */
  display: flex;
  justify-content: center;
  text-align: ${({ name }) => !name && 'center'};
`;
