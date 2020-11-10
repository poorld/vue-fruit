
var myDate = new Date();

/*获取一个月的天数 */
function getCountDays() {
    var curDate = new Date();
    var curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    return curDate.getDate();
}

function getEveryDay(stopDay) {
    var dayArry = []
    var day = getCountDays()

    const month = getCurrentMonth()
    for (var k = 1; k <= day; k++) {
      const d = k < 10 ? '0' + k : k
      dayArry.push(`${month}-${d}`)
      if (stopDay === d)
        break
    }
    return dayArry
}

function getCurrentDay() {
  const day = myDate.getDate()            //日
  return day
}
function getCurrentMonth() {
  const month = myDate.getMonth() + 1     //月
  return month
}

function getCurrentMonthAndDay() {

  return getCurrentMonth() + getCurrentDay()
}

export function getEveryDayToCurrent() {
  const currentDay = getCurrentDay()
  return getEveryDay(currentDay)
}
