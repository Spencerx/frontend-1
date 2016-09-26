
export function selectQueryById(state, id) {
	return state.entities.queries[id];
}

export function selectQueryByAddress(state, address) {
	const { queries } = state.entities;
	const id = Object.keys(queries).find(id => (queries[id].address == address));
	return id ? queries[id] : undefined;
}

export function selectLocalQueryByAddress(state, address) {
	const { queries } = state.locals
	const id = Object.keys(queries).find(id => (queries[id].address == address));
	return id ? queries[id] : undefined;
}

export function selectLocalQueryById(state, id) {
	return state.locals.queries[id];
}

export function selectQueryChanges(state, queryId) {
	const { changes } = state.entities;
	return changes.filter(change => (change.queryId == queryId));
}

export function selectAllQueries(state) {
	const { queries } = state.entities;
	return Object.keys(queries).map(id => queries[id]).sort((a,b) => {
		return (a.address == b.address) ? 0 : ((a.address < a.address)) ? -1 : 1;
	});
}