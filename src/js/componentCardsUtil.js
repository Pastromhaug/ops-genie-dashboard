/**
 * Created by perandre on 6/7/16.
 */
var moment = require('moment');

export function timeDiff(current_time, alert_time) {
    if (alert_time == null) {
        return 'available'
    }

    const a = moment.utc(current_time);
    const b = moment.utc(alert_time);

    var days = a.diff(b, 'days');
    var hours  = a.diff(b, 'hours') % 24;
    var minutes =  a.diff(b, 'minutes') % 60;
    var seconds =  a.diff(b, 'seconds') % 60;

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    var time = '';
    time += hours + ':' + minutes + ':' + seconds;
    if (days > 0) {
        time = days + 'd ' + time;
    }
    return time;
}