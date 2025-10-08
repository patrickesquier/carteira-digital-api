import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transfers', (table) => {
        table.increments('id').primary()
        
        table.integer('sender_id').unsigned().notNullable()
        table.integer('receiver_id').unsigned().notNullable()
        
        table.decimal('amount', 14, 2).notNullable()
        table.string('description')
        table.timestamp('created_at').defaultTo(knex.fn.now())

        table.foreign('sender_id').references('id').inTable('users').onDelete('CASCADE')
        table.foreign('receiver_id').references('id').inTable('users').onDelete('CASCADE')
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transfers')
}
