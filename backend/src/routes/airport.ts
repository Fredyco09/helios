import { Router } from "express";
import { run } from "../services/neo4j";

const r = Router();
r.get("/by-country", async (req, res) => {
  const country = (req.query.country as string) || "United States";
  const rows = await run(
    `MATCH (a:Airport {country:$country}) RETURN a.iata AS iata, a.name AS name, a.city AS city ORDER BY city LIMIT 300`,
    { country }
  ); res.json(rows);
});
export default r;