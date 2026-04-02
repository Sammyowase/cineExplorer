const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const getImageUrl = (
    path: string | null,
    size: 'w200' | "w300" | "w500" | "w780" | "original" = "w500"
): string | null => {
    if (!path) return null;
    return `${TMDB_IMAGE_BASE}/${size}${path}`;

}

export const formatRating=(rating: number): string=>{
    return rating.toFixed(1);
}

export const formatYear =(dateString: string): string=>{
    if(!dateString) return "N/A";
    return dateString.split("-")[0];
}

export const formatRuntime =(minutes: number | null): string=>{
    if(!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60
    if(hours === 0) return `${mins}m`;
    return `${hours}h ${mins}m`;
}

export const formatNumber =(num: number): string =>{
    return num.toLocaleString("en-US");
}

export const formatCurrency =(amount: number): string=>{
    if(amount === 0) return "N/A";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(amount);
}