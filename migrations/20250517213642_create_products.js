export function up(knex) {
  return knex.schema.createTable('products', table => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('price').notNullable();
    table.string('date_posted');
    table.string('hash').notNullable().unique();
    table.timestamp('timestamp').defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable('products');
}
