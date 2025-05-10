
// Helper to get ordinal suffix (st, nd, rd, th)
const getOrdinal = (n : number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// Format it

export function getFormattedDate(isoDate: string) : string {
    const date = new Date(isoDate);
    
    const day = getOrdinal(date.getUTCDate());
    const month = date.toLocaleString('default', { month: 'short', timeZone: 'UTC' }); // "May"
    const year = date.getUTCFullYear();
    
    const formatted = `${day} ${month} ${year}`;

    return formatted;
}
