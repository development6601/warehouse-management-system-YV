const storage = {

    getItem(key) {
        return Promise.resolve(
            sessionStorage.getItem(key)
        );
    },

    setItem(key, value) {
        sessionStorage.setItem(
            key,
            value
        );
        return Promise.resolve();
    },

    removeItem(key) {
        sessionStorage.removeItem(key);
        return Promise.resolve();
    }
};


export default storage;