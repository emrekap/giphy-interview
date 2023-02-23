const formatQueryParams = (keyPairs) => {
    let queryParts = '';
    Object.keys(keyPairs).forEach((key) => {
        const value = keyPairs[key];
        if (queryParts === '') {
            queryParts += `?${key}=${encodeURIComponent(value)}`
        } else {
            queryParts += `&${key}=${encodeURIComponent(value)}`
        }
    });

    return queryParts;
}

module.exports = { formatQueryParams };