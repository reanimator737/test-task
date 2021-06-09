import React from 'react';
import './PossibleDateAndTime.css';
import {IonSlide, IonSlides} from '@ionic/react';
import {dateAndTime} from '../../store/psychologistInfo.reducer';
import {getWeekDay} from '../../helper/dateFunc';

export type stateParams = {
  state: number,
  setState: (newState: number) => void,
}

export interface IPossibleDateAndDate {
  dateAndTime: dateAndTime[]
  selectedDate: stateParams,
  selectedTime: stateParams,
}

/**
 * Component that displays the selected date and time.
 * Has a button that, when clicked, will overwrite the data in the database
 * @prop dateAndTime - array of object that contains information about the date and time[] of meeting
 * @prop stateParams - object:
 *   state - active element index
 *   setState - void function that change state when you call it with new state
 * @returns React.FC
 */
export const PossibleDateAndDate: React.FC<IPossibleDateAndDate> = (props) => {
  const slideOpts = {
    slidesPerView: 3.65,
    spaceBetween: 16,
    speed: 400,
  };

  /**
   * Array of dateSlide. Take data from props.dateAndTime[elem].date
   * @remarks set active elem when props.selectedDate.state === index
   * @returns JSX.Element[]
   */
  const dateSlides: JSX.Element[] = props.dateAndTime.map((elem, index) => {
    const dayOfWeek: string = index === 0 ? 'Сегодня' : getWeekDay(elem.date);
    const date: number = elem.date.getDate();
    return (
      <IonSlide
        onClick={() => props.selectedDate.setState(index)}
        className={props.selectedDate.state === index ?
          'possible-date-and-time__slide_box-active possible-date-and-time__slide' :
          'possible-date-and-time__slide_box possible-date-and-time__slide'}
        key={index}
      >
        <p className="text-16">{dayOfWeek}</p>
        <p className="text-24_bold">{date}</p>
      </IonSlide>
    );
  });

  /**
   * Array of timeSlides. Take data from props.dateAndTime[props.selectedDate.state].time[elem]
   * @remarks set active elem when props.selectedTime.state === index
   * @returns JSX.Element[]
   */
  const timeSlides: JSX.Element[] = props.dateAndTime[props.selectedDate.state].time.map((elem, index) => {
    return (
      <IonSlide
        onClick={() => props.selectedTime.setState(index)}
        className={props.selectedTime.state === index ?
          'possible-date-and-time__slide possible-date-and-time__slide_active' :
          'possible-date-and-time__slide'}
        key={index}
      >
        {props.selectedTime.state === index ? <span className="text-32_bold">{elem}</span> :
          <span className="text-24">{elem}</span>}
      </IonSlide>
    );
  });

  return (
    <>
      <div className="possible-date-and-time-container">
        <div className="possible-date-and-time__header">
          <div className="text-16_bold">
            Возможная дата
          </div>
          <div>
            <img
              src="/img/list.svg"
              alt="broken"
              className="possible-date-and-time__icon possible-date-and-time__icon_left"
            />
            <img
              src="/img/calendar.svg"
              alt="broken"
              className="possible-date-and-time__icon"
            />
          </div>
        </div>
        <IonSlides options={slideOpts} className="possible-date-and-time__slider">
          {dateSlides}
        </IonSlides>
      </div>
      <div className="possible-date-and-time-container">
        <div className="possible-date-and-time__header text-16_bold">
          Свободное время
        </div>
        <IonSlides options={slideOpts} className="possible-date-and-time__slider">
          {timeSlides}
        </IonSlides>
      </div>
    </>
  );
};
