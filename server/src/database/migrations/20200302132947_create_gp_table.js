
exports.up = function(knex) {
    return knex.schema.createTable('gp', table => {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.bigInteger('address_id').unsigned().index().references('id').inTable('address');
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('gp');      
};
