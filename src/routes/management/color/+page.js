/** @type {import('./$types').PageLoad} */
export function load({ url: {searchParams, ...rest}, ...x }) {
    console.log(x);

    return {
        brandId: searchParams.get('brandId'),
        lineId: searchParams.get('lineId'),
        colorId: searchParams.get('colorId'),
    };
}