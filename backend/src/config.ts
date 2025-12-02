export const config = {
  port: Number(process.env.PORT || 4000),
  neo4j: {
    uri: process.env.NEO4J_URI!,
    user: process.env.NEO4J_USER!,
    pass: process.env.NEO4J_PASS!,
    database: process.env.NEO4J_DATABASE || 'neo4j',
  }
};
