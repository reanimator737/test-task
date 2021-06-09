import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {IonContent, IonPage} from '@ionic/react';
import {
  PsychologistCard,
} from '../components/psychologist card/PsychologistCard';
import {
  PossibleDateAndDate,
} from '../components/possible date and time/PossibleDateAndTime';
import {
  MakeAnAppointment,
} from '../components/make an appointment/MakeAnAppointment';
import {Store} from '../store/root.reducer';
import './Home.css';

/**
 * Single application page
 * @returns React.FC
 */
const Home: React.FC = () => {
  const reduxData = useSelector((state: Store) => {
    return {
      psychologistInfo: state.psychologistInfo,
      dateAndTime: state.psychologistInfo.dateAndTime,
      dataBase: state.user,
    };
  });

  const initialStateDate = reduxData.dateAndTime.findIndex((elem) => {
    return elem.date.getDate() === reduxData.dataBase.date.getDate();
  });
  const initialStateTime = initialStateDate !== -1 ?
    reduxData.dateAndTime[initialStateDate].time.findIndex((elem) => elem === reduxData.dataBase.time) : 1;
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<number>(1);

  useEffect(() => {
    setSelectedDate(initialStateDate !== -1 ? initialStateDate : 0);
    setSelectedTime(initialStateTime !== -1? initialStateTime : 1);
  }, [initialStateTime, initialStateDate]);

  return (
    <IonPage className="container">
      <IonContent>
        <div className="content-container">
          <PsychologistCard {...reduxData.psychologistInfo}/>
          <PossibleDateAndDate
            dateAndTime={reduxData.dateAndTime}
            selectedDate={{state: selectedDate, setState: setSelectedDate}}
            selectedTime={{state: selectedTime, setState: setSelectedTime}}
          />
          <MakeAnAppointment
            dateAndTime={reduxData.dateAndTime[selectedDate]}
            time={selectedTime}
            docRef={reduxData.dataBase.docRef}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
