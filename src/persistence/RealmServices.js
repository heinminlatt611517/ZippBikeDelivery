import RealmSchemas from './RealmSchemas';

let RealmServices = {
  save: function (obj) {
    var saved = null;
    console.log('save(): ' + obj);
    RealmSchemas.write(() => {
      saved = RealmSchemas.create('ZippBike', obj, true);
    });
    return saved;
  },

  delete: function (obj) {
    console.log('delete(): ' + obj);
    RealmSchemas.write(() => {
      RealmSchemas.delete(obj);
    });
  },

  search: function (query) {
    let list = RealmSchemas.objects('ZippBike');
    if (query !== '') {
      return list.filtered('description CONTAINS "' + query + '" ');
    }
    return list;
  },

  findAll: function () {
    return RealmSchemas.objects('ZippBike');
  },

  find: function (id) {
    let list = RealmSchemas.objects('ZippBike');
    return list.filtered('id == ' + id + ' ')[0];
  },

  searchByIsRead: function (isRead) {
    let list = RealmSchemas.objects('ZippBike');

    return list.filtered('isRead ==' + isRead + '');
  },
};

export default RealmServices;
