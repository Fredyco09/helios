import { run } from '../services/neo4j';
import { ROUTE_REL } from '../services/graph';


export async function getAirlinesWithStops(stops: number) {
  const S = Math.max(0, Number(stops) || 0);

  const cypher = `
    MATCH ()-[r:ROUTE|ROUTES|Routes]->()
    WITH toInteger(r.stops) AS s, toInteger(r.airlineId) AS aid
    WHERE s = $S
    WITH DISTINCT aid
    OPTIONAL MATCH (al:Airline) WHERE toInteger(al.airlineId) = aid
    RETURN coalesce(al.name, '(unknown)') AS name,
           al.iata AS iata,
           al.icao AS icao,
           aid     AS airlineId
    ORDER BY name
  `;

  return run(cypher, { S });
}


export async function getCodeShareAirlines() {
  return run(
    `MATCH ()-[r:ROUTE {codeshare:true}]->()
     WITH DISTINCT r.airlineId AS aid
     MATCH (al:Airline {airlineId:aid})
     RETURN al.name AS name, al.iata AS iata, al.icao AS icao
     ORDER BY name`
  );
}

export async function getActiveAirlinesInUS() {
  return run(
    `MATCH (al:Airline {country:'United States', active:true})
     RETURN al.name AS name, al.iata AS iata, al.icao AS icao
     ORDER BY name`
  );
}
