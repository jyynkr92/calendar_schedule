export const getDateFromString = dateStr => {
  const dateArr = dateStr.split("-");
  const year = Number(dateArr[0]);
  const month =
    dateArr[1].indexOf("0") === 0
      ? Number(dateArr[1].substring(1))
      : Number(dateArr[1]);
  const date =
    dateArr[2].indexOf("0") === 0
      ? Number(dateArr[2].substring(1))
      : Number(dateArr[2]);

  return new Date(year, month - 1, date);
};
