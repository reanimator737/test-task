import React from 'react';
import {IonCol, IonGrid, IonRow} from '@ionic/react';
import './PsychologistCard.css';

export interface IPsychologistCardProps {
  name: string,
  sessionDuration: string,
  photo: string,
}

/**
 * Basic information about a psychologist. Render photo, sessionDuration and name.
 * @prop all - static info
 * @returns React.FC
 */
export const PsychologistCard: React.FC<IPsychologistCardProps> = (props) => {
  return (
    <IonGrid className="psychologist-card-container">
      <IonRow className="psychologist-card__row psychologist-card__row_header">
        <IonCol size="12" className="psychologist-card__column text-18_bold">
          {props.name}
        </IonCol>
      </IonRow>
      <IonRow className="psychologist-card__row">
        <IonCol size="6" className="psychologist-card__column">
          <img src={props.photo} alt="broken"/>
        </IonCol>
        <IonCol size="6" className="psychologist-card__column session-duration text-16">
          <p className="session-duration__p session-duration__p_gray">Длительность консультации</p>
          <p className="session-duration__p text-16_bold">
            {props.sessionDuration}
          </p>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
