import { ENV_CONFIG } from 'config/config'
import { FastifyInstance } from 'fastify'
import { EnvSchemaData } from 'env-schema'
import fastifyEnv from 'fastify-env'
import fastifyNow from 'fastify-now'
import path from 'path'
import supabase from 'fastify-supabase'
import postgres from "fastify-postgres";

export default async function registerPlugins(server: FastifyInstance, config: EnvSchemaData) {
  /**
   * Set up Routing.
   *
   * Usage:
   *    Simply add a new Typescript file to the `routes` directory and it
   *    will be automatically loaded as a Fastify route.
   */
  server.register(fastifyNow, {
    routesFolder: path.join(__dirname, '../routes'),
  })

  /**
   * Environment variables.
   *
   * Usage:
   *   const port = this.config.PORT
   */
  server.register(fastifyEnv, ENV_CONFIG)

  /**
   * Initialize Supabase ANON client
   *
   * Usage:
   *    const supabase = this.supabase.client
   */
  server.register(supabase, {
    namespace: 'client',
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_KEY_ANON!,
  })

  /**
   * Initialize Supabase ADMIN client
   *
   * Usage:
   *    const supabase = this.supabase.admin
   */
  server.register(supabase, {
    namespace: 'admin',
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_KEY_ADMIN!,
  })

  /**
   * Initialize Postgres DIRECT client
   *
   * Usage:
   *    const supabase = this.pg.direct
   */
  server.register(postgres, {
    namespace: "direct",
    connectionString: process.env.PG_URL!,
  });

  /**
   * Initialize Postgres POOL client
   *
   * Usage:
   *    const supabase = this.pg.direct
   */
  server.register(postgres, {
    namespace: "pool",
    connectionString: process.env.PG_POOL_URL!,
  });
}
