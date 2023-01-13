const { uniqueId } = require("../utilities/generateId");

const getDefaultModel = () => {
	const id = uniqueId();
	const date = new Date().toISOString();
	const DefaultModel = {
		id: id,
		finished: false,
		insertedAt: date,
		updatedAt: date,
	};
	return DefaultModel;
};

module.exports = { getDefaultModel };
