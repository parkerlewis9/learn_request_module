
exports.up = function(knex, Promise) {
  return knex.schema.createTable("beers", function(table){
  	table.increments().primary();
  	table.text("name");
  	table.integer("fav_count");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("beers");
};
