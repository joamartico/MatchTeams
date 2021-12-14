import React, { useState } from 'react';
import { Icon } from './StyledComponents';
import { closeOutline } from 'ionicons/icons';
import { IonInput } from "@ionic/react";

const NewPlayer = ({ name, onRemove, onChange }) => {
  return (
    <div
      style={{
        height: '35px',
        marginTop: '0px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1px solid #666',
        width: '100%',
      }}
    >
      <IonInput
        style={{
          marginTop: '0px',
          marginBottom: '0px',
          fontWeight: 'bold',
          // marginLeft: '18px',
          fontSize: '14px',
          background: 'none',
          border: 'none',
          width: '78%',
        }}
        placeholder="Nuevo jugador"
        autoFocus={true}
        autofocus={true}
        value={name}
        onIonChange={onChange}
      />

      <div //BOTON ELIMINAR
        style={{
          background: '#bbb2',
          borderRadius: '40px',
          height: '25px',
          width: '25px',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '15px',
        }}
        onClick={onRemove}
      >
        <Icon icon={closeOutline} size={24} color="black" />
        {/* name="ios-close" */}
      </div>
    </div>
  );
};

export default NewPlayer;
