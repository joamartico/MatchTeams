import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from '@ionic/react';
import firebase from 'firebase';
import { addOutline } from 'ionicons/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import NewPlayer from '../components/NewPlayer';
import { Button, Icon, Scroll, Text } from '../components/StyledComponents';
import { useGlobalState } from '../Context';

const shuffleArray = arr =>
  arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

const NewTournament = () => {
  const router = useIonRouter();
  const [playersArr, setPlayersArr] = useState([]);
  const [tournamentName, setTournamentName] = useState('');
  const [manyPlayers, setManyPlayers] = useState(0);
  const { setTournamentId, setFechasTotales, setPlayers, setTournament } = useGlobalState();
  const [loading, setLoading] = useState(false);
  const [present] = useIonToast();

  const handleAddPlayer = () => {
    setPlayersArr([...playersArr, { name: '', id: manyPlayers }]);
    setManyPlayers(manyPlayers + 1);
  };

  const handleRemovePlayer = id => {
    const newPlayersArr = playersArr.filter(player => player.id !== id);
    setPlayersArr(newPlayersArr);
  };

  const handleUpdatePlayer = (id, val) => {
    const newPlayer = {
      name: val,
      id,
    };
    const newPlayers = playersArr.filter(player => player.id !== id);
    setPlayersArr([...newPlayers, newPlayer]);
  };

  const handleShuffle = async () => {
    if (tournamentName == '') {
      // alert("Ingrese el nombre del torneo");
      // ion alert danger:
      present({
        message: 'Ingrese el nombre del torneo',
        color: 'danger',
        duration: 2000,
      });
      return;
    }
    await setLoading(true);
    const firstFecha = await shuffleArray(playersArr);
    var newFechasTotales = firstFecha.slice();

    // setFirstFecha(newFecha);

    let swaps = Array.from({ length: firstFecha.length - 2 });

    swaps.map((o, index) => {
      let newFecha = firstFecha.slice();
      const a = newFecha[1];
      const b = newFecha[index + 2];
      newFecha[1] = b;
      newFecha[index + 2] = a;
      newFechasTotales = [...newFechasTotales, ...newFecha];

      console.log('FECHA ', index + 2, newFecha);
      console.log('NUEVO ARR: ', [...newFechasTotales, ...newFecha]);

      setFechasTotales(newFechasTotales);
    });

    setPlayers(playersArr);
    setTournament({
      name: tournamentName,
      shuffledPlayers: newFechasTotales,
    });

    await db
      .collection('tournaments')
      .add({
        name: tournamentName,
        shuffledPlayers: newFechasTotales,
        firstFecha: newFechasTotales,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(async docRef => {
        await setTournamentId(docRef.id);
        await newFechasTotales.map(player => {
          db.collection('tournaments').doc(docRef.id).collection('players').doc(player.name).set({
            name: player.name,
            wonGames: 0,
            drawnGames: 0,
            lostGames: 0,
            points: 0,
            goals: 0,
            goalsConceded: 0,
          });
        });
        await setLoading(false);
        router.push('/tournament/' + docRef.id);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>

          <IonTitle>Nuevo Torneo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Scroll>
          {loading && <IonLoading translucent isOpen mode="ios" />}

          <PlayerInput
            placeholder="Nombre del Torneo"
            autoFocus={true}
            value={tournamentName}
            onIonChange={e => setTournamentName(e.detail.value)}
          />
          <Text size={20} weight="bold" mb={'16px'}>
            Jugadores ({playersArr.length}):
          </Text>

          <div
            style={{
              borderTop: '1px solid #666',
              marginTop: '-5px',
              flexDirection: 'column',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            {playersArr
              .sort((a, b) => {
                return a.id - b.id;
              })
              .map(player => (
                <NewPlayer
                  onRemove={() => handleRemovePlayer(player.id)}
                  onChange={e => handleUpdatePlayer(player.id, e.detail.value)}
                  name={player.name}
                />
              ))}

            <AddButton onClick={() => handleAddPlayer()}>
              <Icon icon={addOutline} size={30} weight="43" iconColor="#444" />
            </AddButton>

            <Button
              color="black"
              onClick={() => handleShuffle()}
              background="linear-gradient(192deg, rgba(252,209,10,1) 0%, rgba(255,232,34,1) 41%, rgba(235,202,0,1) 100%)"
            >
              Sortear
            </Button>
          </div>
        </Scroll>
      </IonContent>
    </IonPage>
  );
};

const AddButton = styled.div`
  background-color: #cfcfcfaa;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  margin-top: 10px;
`;

const PlayerInput = styled(IonInput)`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 25px;
`;

export default NewTournament;
