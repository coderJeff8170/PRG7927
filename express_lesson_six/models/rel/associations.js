module.exports = function(models) {
    models.actor.belongsToMany(models.film, 
        { 
            through: models.film_actor,
            foreignKey: 'actor_id'
        });
    models.film.belongsToMany(models.actor,
        {
            through: models.film_actor,
            foreignKey: 'film_id'
        });
}
//^^ this defines the relationship (many to many) of actors to films through the film_actor table