const BASE = 'https://app.ticketmaster.com/discovery/v2';
const KEY = import.meta.env.VITE_TM_API_KEY

async function request(
    path,
    params = {},
    notFoundMessage = 'Not found',
    networkMessage = 'Network error. Please check your connection and try again.'
) { 
    const cleaned = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== '' && value != null)
    );
    const query = new URLSearchParams({ apikey: KEY, ...cleaned });

    let res;
    try {
        res = await fetch(`${BASE}${path}?${query}`);
    } catch {
        throw new Error(networkMessage);
    }

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('Invalid or missing Ticketmaster API key');
        }
        if (res.status === 404) {
            throw new Error(notFoundMessage);
        }
        if (res.status === 429) {
            throw new Error('Rate limit reached. Please wait a moment and try again.');
        }
        throw new Error(`Unexpected error: HTTP ${res.status}`);
    }

    return res.json();
}

export async function fetchEvents(params = {}) {
    const data = await request('/events.json', { size: 12, ...params });
    return data._embedded?.events ?? [];
}

export async function fetchEventsById(id) {
    return request(
        `/events/${encodeURIComponent(id)}.json`,
        {},
        'Event not found',
        'Could not load this event. It may not exist, or your connection may be down.'
    );
}