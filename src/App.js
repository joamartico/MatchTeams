import { IonApp, IonRouterOutlet } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Context from './Context';
import Main from './screens/Main';
import NewTournament from "./screens/NewTournament";
import Tournament from './screens/TournamentTabs';

const App = () => {



  return (
    <Context>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route path="/" render={() => <Redirect to="/" />} />
            <Route exact path="/" render={() => <Main />} />
            <Route path="/tournament/:tournamentId" render={() => <Tournament />} />
            <Route path="/new-tournament" render={() => <NewTournament />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Context>
  );
};

export default App;
