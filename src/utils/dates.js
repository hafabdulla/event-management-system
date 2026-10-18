export function getToday(){
    return new Date().toISOString().slice(0, 10);
}

export function isPastDate(date){
    return Boolean(date) && date < getToday();
}