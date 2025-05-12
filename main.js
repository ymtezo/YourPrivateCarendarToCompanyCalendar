function deleteNonInvitedEvents() {
  var targetCalendarId = 'hiroaki.yamato@sparkplus.co.jp'; // 移行先のカレンダーID
  var startDate = new Date(); // 今日から
  var endDate = new Date();
  endDate.setDate(endDate.getDate() + 14); // 2週間後までの予定を対象に

  var targetCalendar = CalendarApp.getCalendarById(targetCalendarId);
  
  // ターゲットカレンダーのイベントを取得
  var events = targetCalendar.getEvents(startDate, endDate);
  
  // イベントを1つずつ確認して削除
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    
    // あなたがゲストとして招待されている場合
    var guestEmails = event.getGuestList().map(function(guest) {
      return guest.getEmail();
    });

    // あなたがそのイベントの主催者ではない、そしてゲストとして招待されていない場合に削除
    if (event.getCreators().indexOf(targetCalendarId) === -1 && guestEmails.indexOf(targetCalendarId) === -1) {
      // イベントを削除
      event.deleteEvent();
      Logger.log('Deleted event: ' + event.getTitle());
    }
  }
}
