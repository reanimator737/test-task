/**
 * Get Date and return symbolic representation of the day of the week
 * @returns string
 */
export const getWeekDay = (date: Date) => {
  const days: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  return days[date.getDay()];
};

/**
 * Get Date and return name of the month in Russian
 * @returns string
 */
export const getMonth = (date: Date) => {
  const month: string[] = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Ноября',
    'Декабря',
  ];
  return month[date.getMonth()];
};
