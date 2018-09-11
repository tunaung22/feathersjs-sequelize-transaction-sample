

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async function (context) {
        const { app, data, params } = context;
        // inventory object
        const inv = await app.service('inventory').get(data.inventory_id);
        // inventory quantity - sale quantity
        const newQty = await inv.qty - data.saleQty;

        const transOptions = {
          autocommit: true,
          // isolationLevel: 'REPEATABLE_READ',
          // deferrable: 'NOT DEFERRABLE' // implicit default of postgres
        };

        return app.get('sequelizeClient').transaction(transOptions, t => {
          return app.service('inventory').patch(data.inventory_id, { qty: newQty }, { sequelize: {transaction: t} })
            .then(result => {
              // console.log('transaction for inventory was succeeded.', result);

              // but an unexpected error occued!!!
              throw new Error();

              // the following won't run and go to catch
              return app.service('message').create({ text: `new quantity is ${newQty}` }, { sequelize: {transaction: t} })
                .then(result => {
                  console.log('transaction for message was succeeded', result);
                })
                .catch(err => {
                  console.log('transaction for message was failed', err);
                  // cancel creation of sale service call 
                  context.result = null;
                });

            })
            .catch(err => {
              console.log('transaction for inventory was failed.', err);
              // cancel creation of sale service call 
              context.result = null;
              // thow error for inventory service
              throw new Error();
            });

        }).then(() => {
          console.log('TRANSACTION RESULT');
        }).catch(() => {
          console.log('TRANSACTION ERROR');
          // cancel create sale record
          context.result = null;
        });

      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
