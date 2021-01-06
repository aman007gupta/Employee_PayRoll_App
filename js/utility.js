const stringDate = (date) => {
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    const newDate = !date ? "undefined" : 
                    new Date(Date.parse(date)).toLocaleDateString('en-G8', options);
    return newDate;
}