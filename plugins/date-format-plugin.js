var dateFormatPlugin = function (schema, options) {
    schema.virtual('DateCreated').
    get(function () {
        return this._DateCreated;
    }).
    set(function (v) {
        this._DateCreated = v;
    });

    schema.post(['find', 'findOne'], function (docs) {
        if (!Array.isArray(docs)) {
            docs = [docs];
        }
        for (const doc of docs) {
            doc.DateCreated = doc.CreatedOn;
        }
    });
};
module.exports = {
    dateFormatPlugin
};