export function formatTimes (dates) {
    let formatDates = dates.split('.')[0].split('T')
    const leftDate = formatDates[0].split('-').reverse().join('/')   
    return `${leftDate} à ${formatDates[1]}`
}