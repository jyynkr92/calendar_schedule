export const getDateFromString = dateStr => {
  const dateArr = dateStr.split("-");
  const year = Number(dateArr[0]);
  const month =
    dateArr[1].indexOf("0") === 0 ? Number(dateArr[1].substring(1)) : Number(dateArr[1]);
  const date = dateArr[2].indexOf("0") === 0 ? Number(dateArr[2].substring(1)) : Number(dateArr[2]);

  return new Date(year, month - 1, date);
};

export const getCleanValue = str => {
  str = str.replace(/&quot;/gi, "'");
  str = str.replace(/<b>/gi, "");
  str = str.replace(/<\/b>/gi, "");

  return str;
};

export const getDateFormatFromDate = pubDate => {
  const date = new Date(pubDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthStr = month < 10 ? "0" + month : month;
  const day = date.getDate();
  const dayStr = day < 10 ? "0" + day : day;

  return year + "-" + monthStr + "-" + dayStr;
};
