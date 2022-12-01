import { dayNumber } from './zone';

export function generateAllX(x) {
    let uberXHour = [];
    let lyftXHour = [];
    let uberXDay = [];
    let lyftXDay = [];
    for(let i = 0; i < 24; i++) {
        uberXHour.push({
            ...x,
            taxi_company: 0,
            request_hour: i,
            pickup_hour: i,
            dropoff_hour: i
        });
        lyftXHour.push({
            ...x,
            taxi_company: 1,
            request_hour: i,
            pickup_hour: i,
            dropoff_hour: i
        });
    }
    for(let i = 0; i < 7; i++) {
        uberXDay.push({
            ...x,
            taxi_company: 0,
            trip_day: dayNumber[i]
        });
        lyftXDay.push({
            ...x,
            taxi_company: 1,
            trip_day: dayNumber[i]
        });
    }
    let allXTogether = [];
    allXTogether = allXTogether.concat(uberXHour.map(x => Object.values(x)));
    allXTogether = allXTogether.concat(lyftXHour.map(x => Object.values(x)));
    allXTogether = allXTogether.concat(uberXDay.map(x => Object.values(x)));
    allXTogether = allXTogether.concat(lyftXDay.map(x => Object.values(x)));
    return allXTogether;
}
