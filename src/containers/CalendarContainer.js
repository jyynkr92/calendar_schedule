import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { setInitMonth, setMonth } from "../modules/calendar";
import { setModal } from "../modules/modal";
import { selectSchedule } from "../modules/schedule";
import Calendar from "../components/Calendar";
import ModalContainer from "./ModalContainer";

class CalendarContainer extends PureComponent {
  componentDidMount() {
    const { settingInitial, date } = this.props;
    const initMonth = getMonthInfo(0, date);
    const dateStr = initMonth.date;
    const dayList = initMonth.dayList;
    const today = initMonth.today;
    settingInitial(dateStr, dayList, today);
  }

  setCalendar = gap => {
    const { setMonth, date } = this.props;
    const monthInfo = getMonthInfo(gap, date);
    const dateStr = monthInfo.date;
    const dayList = monthInfo.dayList;
    setMonth(dateStr, dayList);
  };

  setModal = date => {
    const { setModal } = this.props;
    setModal(date);
  };

  selectSchedule = (scheduleId, date) => {
    const { selectSchedule, setModal } = this.props;
    selectSchedule(scheduleId);
    setModal(date);
  };

  render() {
    const { date, dayList, today, modal, scheduleList } = this.props;
    const { setCalendar, setModal } = this;
    return (
      <div>
        <Calendar
          date={date}
          dayList={dayList}
          today={today}
          setCalendar={setCalendar}
          setModal={setModal}
          scheduleList={scheduleList}
        ></Calendar>
        {modal ? <ModalContainer /> : null}
      </div>
    );
  }
}

const getMonthInfo = (gap, date) => {
  let dateStr = date;
  let nowMonthDayList = [];
  let nowDate = new Date();

  if (dateStr !== "") {
    const strArr = dateStr.split("-");
    const strYear = strArr[0];
    const strMonth =
      strArr[1].indexOf("0") === 0 ? strArr[1].substring(1) : strArr[1];
    const strDate =
      strArr[2].indexOf("0") === 0 ? strArr[2].substring(1) : strArr[2];

    nowDate.setFullYear(strYear);
    nowDate.setMonth(strMonth - 1);
    nowDate.setDate(strDate);
  }

  const nowYear = nowDate.getFullYear();
  const nowMonth =
    nowDate.getMonth() + 1 < 10
      ? "0" + (nowDate.getMonth() + 1)
      : nowDate.getMonth() + 1;

  const nowday =
    nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
  const today = nowYear + "-" + nowMonth + "-" + nowday;

  nowDate.setMonth(nowDate.getMonth() + gap);

  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1;
  let monthStr = month;

  if (month < 10) {
    monthStr = "0" + monthStr;
  }

  dateStr = year + "-" + monthStr + "-01";

  //dayList arr
  const dayLength = 32 - new Date(year, month - 1, 32).getDate();
  let dayArr = [];

  for (let i = 0; i < dayLength; i++) {
    nowDate.setDate(i + 1);
    const dayNum = i + 1;
    const dayIdx = nowDate.getDay();
    const dailyYear = nowDate.getFullYear();
    const dailyMonth =
      nowDate.getMonth() + 1 < 10
        ? "0" + (nowDate.getMonth() + 1)
        : nowDate.getMonth() + 1;
    const dailyDay =
      nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();

    if (i === 0) {
      if (dayIdx !== 0) {
        for (let j = 0; j < dayIdx; j++) {
          const prevDate = new Date(nowDate);
          prevDate.setDate(prevDate.getDate() - (dayIdx - j));
          const prevYear = prevDate.getFullYear();
          const prevMonth = prevDate.getMonth() + 1;
          const prevDay = prevDate.getDate();
          const prevMonthStr = prevMonth < 10 ? "0" + prevMonth : prevMonth;
          const prevDayStr = prevDay < 10 ? "0" + prevDay : prevDay;

          dayArr.push({
            dayIdx: -1,
            date: prevYear + "-" + prevMonthStr + "-" + prevDayStr,
            dayNum: prevDay,
            isThisMonth: false
          });
        }
      }
    }

    if (nowDate.getDay() === 6) {
      dayArr.push({
        dayIdx: dayIdx,
        date: dailyYear + "-" + dailyMonth + "-" + dailyDay,
        dayNum: dayNum,
        isThisMonth: true
      });

      nowMonthDayList.push(dayArr);
      dayArr = [];
    } else {
      dayArr.push({
        dayIdx: dayIdx,
        date: dailyYear + "-" + dailyMonth + "-" + dailyDay,
        dayNum: dayNum,
        isThisMonth: true
      });

      if (i === dayLength - 1) {
        if (dayIdx !== 6) {
          const restDayNum = 6 - dayIdx;
          for (let j = 0; j < restDayNum; j++) {
            const nextDate = new Date(nowDate);
            nextDate.setDate(nextDate.getDate() + (j + 1));
            const nextYear = nextDate.getFullYear();
            const nextMonth = nextDate.getMonth() + 1;
            const nextDay = nextDate.getDate();
            const nextMonthStr = nextMonth < 10 ? "0" + nextMonth : nextMonth;
            const nextDayStr = nextDay < 10 ? "0" + nextDay : nextDay;

            dayArr.push({
              dayIdx: -1,
              date: nextYear + "-" + nextMonthStr + "-" + nextDayStr,
              dayNum: nextDay,
              isThisMonth: false
            });
          }
        }
        nowMonthDayList.push(dayArr);
      }
    }
  }

  const returnObj = {
    date: dateStr,
    dayList: nowMonthDayList,
    today: today
  };

  return returnObj;
};

const mapStateToProps = state => ({
  date: state.calendar.date,
  dayList: state.calendar.dayList,
  today: state.calendar.today,
  modal: state.modal.modal,
  modalDate: state.modal.modalDate,
  scheduleList: state.schedule.scheduleList
});

const mapToDispatch = dispatch => ({
  settingInitial: (date, dayList, today) => {
    dispatch(setInitMonth(date, dayList, today));
  },
  setMonth: (date, dayList) => {
    dispatch(setMonth(date, dayList));
  },
  setModal: date => {
    dispatch(setModal(date));
  },
  selectSchedule: scheduleId => {
    dispatch(selectSchedule(scheduleId));
  }
});

export default connect(
  mapStateToProps,
  mapToDispatch
)(CalendarContainer);
