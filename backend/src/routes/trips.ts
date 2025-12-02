import { Router } from "express"; import { run } from "../services/neo4j";
const r = Router();
r.get("/shortest", async (req, res) => {
  const srcIata = req.query.srcIata as string, dstIata = req.query.dstIata as string, H = Number(req.query.maxHops||8);
  const rows = await run(
    `MATCH (s:Airport {iata:$src}), (t:Airport {iata:$dst})
     MATCH p = shortestPath((s)-[:ROUTE*..$H]->(t))
     RETURN [n IN nodes(p) | n.iata] AS path LIMIT 1`,
     { src: srcIata, dst: dstIata, H }
  );
  res.json(rows[0] ?? { path: [] });
});
export default r;
