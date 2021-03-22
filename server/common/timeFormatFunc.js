const timeOfAnAction = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const timeFormat = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0 ${minutes}` : minutes;
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${hours}:${minutes} ${timeFormat}`;
}

module.exports = {
    timeOfAnAction
};
