import neo4j from 'neo4j-driver';
import { config } from '../config';

export const driver = neo4j.driver(
  config.neo4j.uri,
  neo4j.auth.basic(config.neo4j.user, config.neo4j.pass),
  { /* you can set encrypted: 'ENCRYPTION_ON' for Aura */ }
);

export async function run<T=any>(cypher: string, params: any = {}) {
  const session = driver.session({ database: config.neo4j.database });
  try {
    const res = await session.run(cypher, params);
    return res.records.map(r => r.toObject()) as T[];
  } finally {
    await session.close();
  }
}
