import { run } from '../services/neo4j';

export async function shortestTrip(srcIata: string, dstIata: string, maxHops = 8) {
  const rows = await run(
    `MATCH (s:Airport {iata:$src}), (t:Airport {iata:$dst})
     MATCH p = shortestPath((s)-[:ROUTE*..$H]->(t))
     RETURN [n IN nodes(p) | n.iata] AS path LIMIT 1`,
    { src: srcIata, dst: dstIata, H: Number(maxHops) }
  );
  return rows[0] ?? { path: [] };
}

export async function constrainedTrip(srcIata: string, dstIata: string, zStops = 1, maxHops = 8) {
  const rows = await run(
    `MATCH (s:Airport {iata:$src}), (t:Airport {iata:$dst})
     CALL {
       WITH s,t
       MATCH p=(s)-[r:ROUTE*..$H]->(t)
       WHERE all(x IN r WHERE x.stops <= $Z)
       RETURN p ORDER BY length(p) ASC LIMIT 1
     }
     RETURN [n IN nodes(p) | n.iata] AS path`,
    { src: srcIata, dst: dstIata, H: Number(maxHops), Z: Number(zStops) }
  );
  return rows[0] ?? { path: [] };
}

export async function boundedReachable(iata: string, d: number) {
  return run(
    `MATCH (src:Airport {iata:$iata})-[:ROUTE*..$D]->(dst:Airport)
     RETURN DISTINCT dst.iata AS iata, dst.city AS city, dst.country AS country
     ORDER BY city LIMIT 500`,
    { iata, D: Number(d) }
  );
}
