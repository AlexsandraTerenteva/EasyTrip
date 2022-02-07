const getDur = (minutes) => {
  const hours = Math.trunc(minutes / 60);
  const minutesLeft = minutes % 60;
  if (minutes < 60) {
    return `${minutesLeft} мин`;
  }
  if (minutesLeft < 10) {
    return `${hours} ч 0${minutesLeft} мин`;
  }
  return `${hours} ч ${minutesLeft} мин`;
};

export default getDur;
