import { useState } from 'react';
import { Icon } from './StyledComponents';
import { closeOutline } from 'ionicons/icons';
import { IonInput } from '@ionic/react';
import styled from "styled-components";

const NewPlayer = ({ name, onRemove, onChange }) => {
  return (
    <PlayerRow>
      <Input
        placeholder="Nuevo jugador"
        autoFocus={true}
        autofocus={true}
        value={name}
        onIonChange={onChange}
      />

      <RemoveButton onClick={onRemove}>
        <Icon icon={closeOutline} size={24} color="black" />
      </RemoveButton>
    </PlayerRow>
  );
};

const Input = styled(IonInput)`
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: bold;
  font-size: 14px;
  background: none;
  border: none;
  width: 78%;
`;

const PlayerRow = styled.div`
  height: 35px;
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #666;
  width: 100%;
`;

const RemoveButton = styled.div`
  /* background-color: #cfcfcfaa; */
  /* border-radius: 50%; */
  display: flex;
  height: 25px;
  width: 25px;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;

export default NewPlayer;
