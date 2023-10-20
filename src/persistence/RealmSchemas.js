import Realm from 'realm';

const ZippBikeSchema = {
  name: 'ZippBike',
  primaryKey: 'id',
  properties: {
    id: 'int',
    description: 'string',
    title: 'string',
    dateTime: 'string',
    isRead: 'bool',
  },
};

// Initialize a Realm with models
let realmSchema = new Realm({schema: [ZippBikeSchema], schemaVersion: 1});
export default realmSchema;
