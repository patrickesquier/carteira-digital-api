import knex from 'knex'
import config from './knexfile'

export const knexConnection = knex(config.development)
