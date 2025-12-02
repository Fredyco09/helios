const BASE = import.meta.env.VITE_API_BASE || '';

export async function getAirportsByCountry(country: string, page=1, pageSize=25, sort='city') {
  const r = await fetch(`${BASE}/api/airports/by-country?country=${encodeURIComponent(country)}&page=${page}&pageSize=${pageSize}&sort=${sort}`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function getAirlinesWithStops(stops=1) {
  const r = await fetch(`${BASE}/api/airlines/with-stops?stops=${stops}`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function getCodeShareAirlines() {
  const r = await fetch(`${BASE}/api/airlines/codeshare`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function getActiveUSAirlines() {
  const r = await fetch(`${BASE}/api/airlines/active-us`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function getShortestTrip(srcIata: string, dstIata: string, maxHops=8) {
  const r = await fetch(`${BASE}/api/trips/shortest?srcIata=${srcIata}&dstIata=${dstIata}&maxHops=${maxHops}`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function getConstrainedTrip(srcIata: string, dstIata: string, zStops=1, maxHops=8) {
  const r = await fetch(`${BASE}/api/trips/constrained?srcIata=${srcIata}&dstIata=${dstIata}&zStops=${zStops}&maxHops=${maxHops}`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
