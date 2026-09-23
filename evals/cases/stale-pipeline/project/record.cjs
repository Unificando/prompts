exports.findRecord = (db, id, tenantId) => db.records.find(r => r.id === id);
