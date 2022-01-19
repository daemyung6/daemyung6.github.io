export function getSec(time) {
    if(typeof time !== 'string') { console.error('string이 아닙니다.'); return; }
    time = time.split(':');
    if(time.length !== 3) { console.error('올바른 형식이 아닙니다.'); return; }

    let returnTime = 0;
    returnTime += Number(time[0]) * 60 * 60;
    returnTime += Number(time[1]) * 60;
    returnTime += Number(time[2]);

    return returnTime;
}

export function sec2str(time) {
    if(typeof time !== 'number') { console.error('number가 아닙니다.'); return; }
    let hour = parseInt(time / (60 * 60));
    hour = hour < 10 ? '0' + hour : hour;
    time -= hour * 60 * 60;

    let min = parseInt(time / (60));
    min = min < 10 ? '0' + min : min;
    time -= min * 60;

    time = parseInt(time);

    time = time < 10 ? '0' + time : time;
    

    return `${hour}:${min}:${time}`;
}