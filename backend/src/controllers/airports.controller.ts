import { run } from '../services/neo4j';

export async function getAirportsByCountry(country: string) {
  return run(
    `MATCH (a:Airport {country:$country})
     RETURN a.iata AS iata, a.name AS name, a.city AS city, a.country AS country
     ORDER BY city LIMIT 500`,
    { country }
  );
}

export async function getCountryWithMostAirports() {
  return run(
    `MATCH (a:Airport)
     WITH a.country AS country, count(*) AS c
     RETURN country, c ORDER BY c DESC LIMIT 1`
  );
}

export async function getTopKCitiesByOutgoingAirlines(k: number) {
  return run(
    `MATCH (a:Airport)-[r:ROUTE]->()
     WITH a.city AS city, collect(DISTINCT r.airlineId) AS airlines
     RETURN city, size(airlines) AS distinct_outgoing
     ORDER BY distinct_outgoing DESC LIMIT $k`,
    { k: Number(k) }
  );
}
