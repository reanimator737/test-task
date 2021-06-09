import React from 'react';
import {IonCard, IonCardContent} from '@ionic/react';
import {dateAndTime} from '../../store/psychologistInfo.reducer';
import {getMonth} from '../../helper/dateFunc';
import {pushToDatabase} from '../../store/user.reducer';
import {useDispatch} from 'react-redux';
import {DocumentReference} from 'firebase/firestore';
import './MakeAnAppointment.css';

interface IMakeAnAppointmentProps {
  time: number,
  dateAndTime: dateAndTime,
  docRef?: DocumentReference
}

/**
 * Component that displays the selected date and time.
 * Has a button that use to overwrite data in the database
 * @prop dateAndTime - object that contains information about the date and time of meeting
 * @prop time - index of the needed element in dateAndTime.time
 * @prop docRef - optional props, needed to overwrite existing data and not create new
 * @returns React.FC
 */
export const MakeAnAppointment: React.FC<IMakeAnAppointmentProps> = (props) => {
  const dispatch = useDispatch();
  return (
    <IonCard className="make-an-appointment">
      <IonCardContent className="make-an-appointment__container">
        <div className="make-an-appointment__info-container">
          <div className="info-container__element">
            <p className="info-container__text-16">Дата</p>
            <p className="info-container__text-20_bold">
              {props.dateAndTime.date.getDate() + ' ' + getMonth(props.dateAndTime.date)}
            </p>
          </div>
          <div className="make-an-appointment__divider"/>
          <div className="info-container__element">
            <p className="info-container__text-16">Время</p>
            <p className="info-container__text-20_bold">{props.dateAndTime.time[props.time]}</p>
          </div>
        </div>
        <button
          className="make-an-appointment__action-button"
          onClick={async () => {
            await dispatch(pushToDatabase({
              date: props.dateAndTime.date,
              time: props.dateAndTime.time[props.time],
              docRef: props.docRef,
            }));
            alert('Запись удалась');
          }}
        >
          записаться на бесплатную встречу
        </button>
      </IonCardContent>
    </IonCard>
  );
};
