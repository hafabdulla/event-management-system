const BASE = 'https://app.ticketmaster.com/discovery/v2';
const KEY = import.meta.env.VITE_TM_API_KEY

export async function fetchEvents(params = {}){
    const query = new URLSearchParams({apikey: KEY, size: 12, ...params});
    const url = `${BASE}/events.json?${query}`;
    const res = await fetch(url);
    if(!res.ok){
        if(res.status === 401){
            throw new Error('Invalid or missing Ticketmaster Api Key');
        }
        if(res.status === 429){
            throw new Error('Rate limit reached');
        }
        throw new Error(`Unexpected Error: HTTP${res.status}`);
    }
    const data = await res.json();

    return data._embedded?.events ?? [];
}

export async function fetchEventsById(id){
    const query = new URLSearchParams({apikey: KEY});
    const url = `${BASE}/events/${encodeURIComponent(id)}.json?${query}`;
    const res = await fetch(url);

    if(!res.ok){
        if(res.status === 401){
            throw new Error('Invalid or missing ticketmaster API Key');
        }

        if(res.status === 429){
            throw new Error("Rate Limit Reached");
        }

        throw new Error(`Error: ${res.status}`);
    }
    return await res.json();
}