function thunk(store) {
    return (next) => (action) => {
        if (typeof action === 'function') {
            return action(store.dispatch, store.getState);
        }

        return next(action);
    };
}

export default thunk;