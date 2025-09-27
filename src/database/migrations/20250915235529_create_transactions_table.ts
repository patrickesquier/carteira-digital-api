import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('transactions', (table) => {
    table.uuid('recipient_id').references('id').inTable('accounts').notNullable()
    table.string('description')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('recipient_id')
    table.dropColumn('description')
  })
}
