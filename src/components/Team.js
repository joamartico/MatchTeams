import { IonCol, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import firebase from 'firebase';
import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { useGlobalState } from '../Context';

const Team = ({ name, goals, local, i, tournamentId }) => {
  const { tournament, setTournament, setPlayers, setStandingsCalculated } = useGlobalState();
  //   const [number, setNumber] = useState(goals || 0);

  const tournamentRef = tournamentId && db.collection('tournaments').doc(tournamentId);
  console.log("tournament: ", tournament)

  const onGoalChange = async goals => {
    console.log('onGoalChange GOALS: ', goals);
    const newShuffledPlayers = tournament.shuffledPlayers.slice();
    newShuffledPlayers[i].goals = parseInt(goals);
    tournamentRef.update({
      shuffledPlayers: newShuffledPlayers,
    });
    //   setTournament({
    //     name: tournament.name,
    //     shuffledPlayers: newShuffledPlayers,
    //   });
    await calculateStandings();
  };

  const calculateStandings = useCallback(async () => {
    await tournament?.shuffledPlayers.map(async (player, index) => {
      const indexToCompare = index % 2 == 0 ? `${index + 1}` : `${index - 1}`;

      console.log('PLAYER: ', player);
      console.log('I: ', index);
      console.log('ITC: ', indexToCompare);
      console.log(
        tournament.shuffledPlayers[index],
        ' vs: ',
        tournament.shuffledPlayers[indexToCompare]
      );

      if (tournament.shuffledPlayers[indexToCompare].goals != undefined) {
        // 1. PONER EN 0 TODAS LAS ESTADISTICAS DE JUGADORES

        await tournamentRef.collection('players').doc(player.name).set({
          name: player.name,
          wonGames: 0,
          drawnGames: 0,
          lostGames: 0,
          points: 0,
          goals: 0,
          goalsConceded: 0,
        });

        // 2. SUMAR A LA DB CADA ESTADISTICA DE CADA JUGADOR

        if (
          tournament.shuffledPlayers[index].goals > tournament.shuffledPlayers[indexToCompare].goals
        ) {
          //GANO
          console.log(player.name + ' GANO en INDEX = ' + index);

          tournamentRef
            .collection('players')
            .doc(player.name)
            .update({
              wonGames: firebase.firestore.FieldValue.increment(1),
              points: firebase.firestore.FieldValue.increment(3),
              goals: firebase.firestore.FieldValue.increment(
                tournament.shuffledPlayers[index].goals
              ),
              goalsConceded: firebase.firestore.FieldValue.increment(
                tournament.shuffledPlayers[indexToCompare].goals
              ),
            });
        }

        if (
          tournament.shuffledPlayers[index].goals ===
          tournament.shuffledPlayers[indexToCompare].goals
        ) {
          //EMPATO
          console.log(player.name + ' EMPATO en INDEX = ' + index);

          tournamentRef
            .collection('players')
            .doc(player.name)
            .update({
              drawnGames: firebase.firestore.FieldValue.increment(1),
              points: firebase.firestore.FieldValue.increment(1),
              goals: firebase.firestore.FieldValue.increment(
                tournament.shuffledPlayers[index].goals
              ),
              goalsConceded: firebase.firestore.FieldValue.increment(
                tournament.shuffledPlayers[indexToCompare].goals
              ),
            });
        }

        if (
          tournament.shuffledPlayers[index].goals < tournament.shuffledPlayers[indexToCompare].goals
        ) {
          //PERDIO
          console.log(player.name + ' PERDIO en INDEX = ' + index);

          tournamentRef
            .collection('players')
            .doc(player.name)
            .update({
              lostGames: firebase.firestore.FieldValue.increment(1),
              goals: firebase.firestore.FieldValue.increment(
                tournament.shuffledPlayers[index].goals
              ),
              goalsConceded: firebase.firestore.FieldValue.increment(
                tournament.shuffledPlayers[indexToCompare].goals
              ),
            });
        }
        console.log('-----------------------------------');
      }
    });
  }, [tournamentId]);

  return (
    <Col local={local}>
      {local && name}
      <GoalsSelector
        value={goals}
        onIonChange={e => e.detail.value !== null && onGoalChange(e.detail.value)}
        interface="popover"
        local={local}
      >
        <IonSelectOption value="null"></IonSelectOption>
        <IonSelectOption value={0}>0</IonSelectOption>
        <IonSelectOption value={1}>1</IonSelectOption>
        <IonSelectOption value={2}>2</IonSelectOption>
        <IonSelectOption value={3}>3</IonSelectOption>
        <IonSelectOption value={4}>4</IonSelectOption>
        <IonSelectOption value={5}>5</IonSelectOption>
        <IonSelectOption value={6}>6</IonSelectOption>
        <IonSelectOption value={7}>7</IonSelectOption>
        <IonSelectOption value={8}>8</IonSelectOption>
        <IonSelectOption value={9}>9</IonSelectOption>
      </GoalsSelector>
      {!local && name}
    </Col>
  );
};

// export default memo(Team);
export default Team

const Col = styled(IonCol)`
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  justify-content: ${({ local }) => (local ? 'flex-end' : 'flex-start')};
  align-items: center;
  padding: 0;
  width: fit-content;
`;

const GoalsSelector = styled(IonSelect)`
  background: #fff;
  width: 22px !important;
  height: 32px !important;
  margin: 0 8px;
  border-radius: 5px;
  border: 1px solid #000;
  padding: 0 12px;
`;
