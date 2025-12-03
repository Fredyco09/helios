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

export async function getShortestTrip(src: string, dst: string, maxHops: number) {
  const q = new URLSearchParams({ srcIata: src, dstIata: dst, maxHops: String(maxHops) });
  const r = await fetch(`${BASE}/api/trips/shortest?` + q.toString());
  return r.json();
}

export async function getConstrainedTrip(src: string, dst: string, zStops: number, maxHops: number) {
  const q = new URLSearchParams({
    srcIata: src, dstIata: dst, zStops: String(zStops), maxHops: String(maxHops)
  });
  const r = await fetch(`${BASE}/api/trips/constrained?` + q.toString());
  return r.json();
}

export async function getBoundedReachability(origin: string, d: number) {
  const q = new URLSearchParams({ srcIata: origin, maxHops: String(d) });
  const r = await fetch(`${BASE}/api/trips/bounded?` + q.toString());
  return r.json(); // expected { cities: string[] }
}