export function formatCurrency(num) {
    if (num !== undefined) {
        return parseFloat(num)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
    }
}

export function getColletionBySlug(collections, slug) {
    if (collections.length > 0) {
        const result = collections.find(item => item.slug === slug.toString());
        if (result !== undefined) {
            return result.products;
        } else {
            return [];
        }
    } else {
        return [];
    }
}

export function getListOfProductId(products) {
    let queries = [];
    products.forEach(item => {
        queries.push(item.id);
    });
    if (queries.length > 0) {
        return queries
    }
    else {
        return [];
    }
}


export function addParamsToLocation(params , store , route) {
    store.dispatch('myProduct/getProducts' , params)
    params.page = 1;
    const payload = params.GroupCode ? {FatherCode : params.GroupCode} : {}
    store.dispatch('collection/getShopGroups' , payload)
   
    history.pushState(
        {},
        null,
        route.path +
        '?' +
        Object.keys(params)
            .map(key => {
            return (
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
            )
            })
            .join('&')
    )
}
