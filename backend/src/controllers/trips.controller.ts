import { run } from '../services/neo4j';

export async function shortestTrip(srcIata: string, dstIata: string, maxHops = 8) {
  // clamp / whitelist to avoid injection
  const H = Math.max(1, Math.min(12, Number(maxHops) || 8));

  // NOTE: H is injected as a NUMBER literal in the pattern (Cypher disallows params there)
  const cypher = `
    MATCH (s:Airport {iata:$src}), (t:Airport {iata:$dst})
    MATCH p = (s)-[:ROUTE*..${H}]->(t)
    RETURN [n IN nodes(p) | n.iata] AS path
    ORDER BY length(p) ASC
    LIMIT 1
  `;

  const rows = await run(cypher, { src: srcIata, dst: dstIata });
  return rows[0] ?? { path: [] };
}

export async function constrainedTrip(srcIata: string, dstIata: string, zStops = 1, maxHops = 8) {
  const H = Math.max(1, Math.min(12, Number(maxHops) || 8));
  const Z = Math.max(0, Math.min(5, Number(zStops) || 1));

  const cypher = `
    MATCH (s:Airport {iata:$src}), (t:Airport {iata:$dst})
    CALL {
      WITH s,t
      MATCH p = (s)-[r:ROUTE*..${H}]->(t)
      WHERE all(x IN r WHERE x.stops <= $Z)
      RETURN p
      ORDER BY length(p) ASC
      LIMIT 1
    }
    RETURN [n IN nodes(p) | n.iata] AS path
  `;

  const rows = await run(cypher, { src: srcIata, dst: dstIata, Z });
  return rows[0] ?? { path: [] };
}

export async function boundedReachable(iata: string, d: number) {
  const D = Math.max(1, Math.min(8, Number(d) || 3));
  const cypher = `
    MATCH (src:Airport {iata:$iata})-[:ROUTE*..${D}]->(dst:Airport)
    RETURN DISTINCT dst.iata AS iata, dst.city AS city, dst.country AS country
    ORDER BY city
    LIMIT 500
  `;
  return run(cypher, { iata });
}
