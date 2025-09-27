import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("accounts", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable().unique();
        table.decimal("balance", 14, 2).notNullable().defaultTo(0);
        table.timestamp("created_at").defaultTo(knex.fn.now());

        table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("accounts");
}
