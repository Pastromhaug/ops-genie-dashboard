/**
 * Created by perandre on 6/7/16.
 */
var moment = require('moment');
import {AVAILABILITY_DAYS} from '../constants/appConstants';

export function timeDiff(current_time, alert_time) {
    if (alert_time == null) {
        return ''
    }

    const a = moment.utc(current_time);
    const b = moment.utc(alert_time);

    var days = a.diff(b, 'days');
    var hours = a.diff(b, 'hours') % 24;
    var minutes = a.diff(b, 'minutes') % 60;
    var seconds = a.diff(b, 'seconds') % 60;

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

export function calcAvailabiliyTime() {
    var availability_time = moment(moment.utc().valueOf()).subtract(AVAILABILITY_DAYS, 'days');
    availability_time = availability_time.valueOf();
    return availability_time;
}

export function calcCurrentTime() {
    return moment.utc().valueOf();
}

export function displayUnixTime(time) {
    return moment.utc(time).format('ddd M/D HH:mm');
}

export function displayMoment(time) {
    return time.format('ddd M/D HH:mm');
}

export function calcSummedAvailabilityIntervals(service, current_time) {
    var intervals = service.availabilityIntervals;
    var sum = 0;
    if (intervals.length == 0) {
        if (service.last_time_available == null) {
            return 0;
        }
        else {
            return current_time - service.last_time_available
        }
    }
    var max_time;
    if (service.last_time_available != null) {
        sum += current_time - service.last_time_available;
        max_time = service.last_time_available;
    }
    else {
        max_time = current_time;
    }

    for (var i = 0; i < intervals.length; i++) {
        if (intervals[i].start >= max_time) break;
        sum += intervals[i].end - intervals[i].start;
    }
    return sum;
}

export function calcAvailabilityPercent(service, current_time) {
    var sum_unavailability = calcSummedAvailabilityIntervals(service, current_time);
    var total_time = current_time - calcAvailabiliyTime();
    var percent = (total_time - sum_unavailability.valueOf())/total_time * 100;
    return (percent + '').slice(0,6) + '%';
}

export function maxTime(time1, time2) {
    if (time1.isAfter(time2)) return time1;
    else return time2;
}

export function minTime(time1, time2) {
    if (time1.isBefore(time2)) return time1;
    else return time2;
}