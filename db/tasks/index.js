module.exports = {
  get(model, where, order) {
    return new Promise((resolve, reject) => {
      for (const key in where) if (where[key] === '') delete where[key];
      model.findAll({
        where: where,
        order: order
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
  }
}