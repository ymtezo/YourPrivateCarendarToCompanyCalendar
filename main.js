function copyEvents() {
  var sourceCalendarId = '{}'; // 元のカレンダーのID
  var targetCalendarId = '{}'; // 予定を追加したいカレンダーのID
  
  var startDate = new Date(); // 開始日を今日に設定
  var endDate = new Date();
  endDate.setDate(endDate.getDate() + 14); // 2週間後の予定をコピー（期間の調整）
  
  var sourceCalendar = CalendarApp.getCalendarById(sourceCalendarId);
  var targetCalendar = CalendarApp.getCalendarById(targetCalendarId);
  
  var events = sourceCalendar.getEvents(startDate, endDate);
  
  // イベントをターゲットカレンダーに追加
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    
    // 全日イベントかどうかを確認
    if (event.isAllDayEvent()) {
      targetCalendar.createAllDayEvent(event.getTitle(), event.getStartTime(), event.getEndTime(), {
        description: event.getDescription(),
        location: event.getLocation(),
        guests: event.getGuestList().map(function(guest) { return guest.getEmail(); }).join(',')
      });
    } else {
      targetCalendar.createEvent(event.getTitle(), event.getStartTime(), event.getEndTime(), {
        description: event.getDescription(),
        location: event.getLocation(),
        guests: event.getGuestList().map(function(guest) { return guest.getEmail(); }).join(',')
      });
    }
  }
}
