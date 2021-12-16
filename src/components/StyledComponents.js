import { IonIcon, IonList } from '@ionic/react';
import styled from 'styled-components';
import { COLORS } from '../../styles/theme';

// const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const Button = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  border-radius: 14px;
  border: 1px solid ${({ red, background }) => (red ? 'red' : background || COLORS.primary)};
  cursor: pointer;
  background: ${({ outlined, red, background }) => {
    if (outlined) {
      return '#0000';
    } else {
      if (red) {
        return 'red';
      } else {
        return background || COLORS.primary;
      }
    }
  }};
  &:active {
    opacity: 0.8 !important;
  }
  font-size: 20px;
  font-weight: bold;
  color: ${({ outlined, red, color }) => {
    if (color) {
      return color;
    } else {
      if (outlined) {
        if (red) {
          return 'red';
        } else {
          return COLORS.primary;
        }
      } else {
        return 'white';
      }
    }
  }};
`;

export const Padding = styled.div`
  width: 90%;
  height: 10%;
  /* height: fit-content; */
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: ${({ spaced }) => spaced && 'space-around'};
  padding-bottom: 20% !important;
  padding-top: ${({ pt }) => (pt ? pt : '5%')};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: ${({ width }) => width || '100%'};
  align-items: center;
  justify-content: ${({ spaced }) => spaced && 'space-between'};
  margin: 0 auto;
  margin-bottom: ${({ mb }) => mb && mb} !important;
  margin-top: ${({ mt }) => mt && mt} !important;
  display: ${({ columns }) => columns && 'grid'};
  grid-template-columns: ${({ columns }) => columns && columns};
  color: ${({ color }) => color && color};
  max-width: 700px;
  margin: 0 auto;
`;

export const Icon = styled(IonIcon)`
  /* --ionicon-stroke-width: 64px !important; */
  /* color: ${({ color }) => (color ? color : COLORS.primary)}; */
  color: ${({ iconColor }) => (iconColor ? iconColor : COLORS.primary)};
  font-size: ${({ size }) => size + 'px'} !important;
  margin-right: ${({ marginRight }) => marginRight + 'px' || '5px'};
  margin-left: ${({ marginLeft }) => marginLeft + 'px' || '5px'};
  align-self: center;
  --ionicon-stroke-width: ${({ weight }) => (weight ? weight + 'px' : '30px')} !important;
`;

export const Text = styled.p`
  display: block;
  /* margin: auto 0; */
  color: ${({ color }) => color && color} !important;
  font-size: ${({ size }) => size + 'px'};
  font-weight: ${({ weight }) => weight && weight};
  margin-left: ${({ ml }) => ml && ml};
`;

export const Scroll = styled(IonList)`
  width: 92%;
  padding: 4% !important;
`;
