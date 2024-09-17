import { refreshMixtures } from "$lib/backend/backend"

const getRates = (color, salon) => {

    const pricing = salon?.preferences?.colorlines ?? {};
    const markup = salon?.preferences?.markup ?? 0;

    let costRate = -1;
    let retailRate = -1;

    if (color && color.company && pricing[color.company] !== undefined) {
        const cl = pricing[color.company];
        const i = cl.findIndex(c => c.id === color.colorLineColorsId);
        if (i >= 0) {
            const c = cl[i];
            let price = c?.pricing ?? -1;
            let size = c?.size ?? -1;
            let units = c?.units ?? 'ml';

            if (c.hasOwnProperty('colors') && (c?.colors?.hasOwnProperty(color.id) ?? false)) {
                price = c.colors[color.id]?.pricing ?? price;
                size = c.colors[color.id]?.size ?? size;
                units = c.colors[color.id]?.units ?? units;
            }
            if (price >= 0 && size >= 0) {
                costRate = price / size;
                if (units === 'oz') {
                    costRate /= 29.5735;
                }
                retailRate = costRate * (100 + parseFloat(markup)) / 100;
            }
        }
    }

    return {costRate, retailRate};
}

export const getMixtures= async () => {
    const {mixtures, mixTraces} = await refreshMixtures();
    let mixT = [], mixs = [];

    await Promise.all(mixTraces.map(async (trace) => {
        const mixture = await trace.mixture;
        const color = await trace.color;
        const component = await trace.component;

        let formula = {};
        let stylist = {};
        let salon = {};
        let client = {};
        if (mixture !== undefined) {
            formula = await mixture.formula;
            if (formula !== undefined) {
                client = await formula.client;
                if (client !== undefined) {
                    stylist = await client.stylist;
                    if (stylist !== undefined) {
                        salon = await stylist.salon;
                        if (salon === undefined) {
                            salon = {name: 'Unknown Salon'};
                        }
                    } else {
                        stylist = {name: 'Unknown Stylist'};
                    }
                } else {
                    client = {name: 'Unknown Client'};
                }
            }
        }

        const {costRate, retailRate} = getRates(color, salon);

        const out = {
            ...trace,
            mixture,
            color,
            component,
            stylist,
            salon,
            formula,
            client,
            costRate,
            retailRate,
            cost: costRate * (trace.pouredAmount + trace.amount),
            retail: retailRate * (trace.pouredAmount + trace.amount),
            goodPricing: costRate >= 0 && retailRate >= 0,
        };
        mixT.push(out);
    }));
    await Promise.all(mixtures.map(async (mixture) => {
        const formula = await mixture.formula;
        const mixTrace = await mixture.mixTrace.toArray();
        let client = {name: 'Unknown Client'};
        let stylist = {name: 'Unknown Stylist'};
        let salon = {name: 'Unknown Salon'};
        if (formula !== undefined) {
            client = await formula.client;
            if (client !== undefined) {
                stylist = await client.stylist;
                if (stylist !== undefined) {
                    salon = await stylist.salon;
                    if (salon === undefined) {
                        salon = {name: 'Unknown Salon'};
                    }
                } else {
                    stylist = {name: 'Unknown Stylist'};
                }
            } else {
                client = {name: 'Unknown Client'};
            }
        }

        

        const colorTraces = [];
        await Promise.all(mixTrace.map(async (trace) => {
            const color = await trace.color;
            if (color !== undefined) {
                const {costRate, retailRate} = getRates(color, salon);

                const colorName = color.colorKey;
                const colorType = color.colorType;
                const colorLine = color.colorLine;
                const company = color.company;
                colorTraces.push({
                    ...trace,
                    colorName,
                    colorType, 
                    colorLine,
                    company,
                    color,
                    costRate,
                    retailRate,
                    cost: costRate * (trace.pouredAmount + trace.amount),
                    retail: retailRate * (trace.pouredAmount + trace.amount),
                    goodPricing: costRate >= 0 && retailRate >= 0,
                });
            }
        }));

        // Ignore colors that dont exist, so add up totals on colorTraces
        const totalAmount = colorTraces?.reduce((acc, curr) => {
            return acc + curr.pouredAmount + curr.amount;
        }, 0) ?? 0;
        const {totalCost, retailCost, goodCost} = colorTraces?.reduce((acc, curr) => {
            if (curr.goodPricing) {
                acc.totalCost += curr.cost;
                acc.retailCost += curr.retail;
            } else {
                acc.goodCost = false;
            }
            return acc;
        }, {totalCost: 0, retailCost: 0, goodCost: true}) ?? {totalCost: 0, retailCost: 0, goodCost: true};

        if (totalAmount < 0)
            console.log(totalAmount, mixTrace, mixture);

        const out = {
            ...mixture,
            formula,
            mixTrace: colorTraces,
            client,
            stylist,
            salon,
            totalAmount,
            totalCost,
            retailCost,
            goodCost,
        };
        mixs.push(out);
    }));
    return {mixtures: mixs, mixTraces: mixT};
}

export const getAllMixturesOrdered = async () => {
    const {mixtures, mixTraces} = await getMixtures();

    const ordered = mixtures.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const orderedTraces = mixTraces.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return {mixtures: ordered, mixTraces: orderedTraces};
}

export const totalAmountSummary = async () => {
    const {mixtures, mixTraces} = await getAllMixturesOrdered();
    
    const today = new Date();

    const summary = mixTraces.reduce((acc, curr) => {
        const cType = curr?.color?.colorType ?? 'PERM';

        acc.all.total += curr.pouredAmount + curr.amount;
        if (cType === 'DEV') {
            acc.all.dev += curr.pouredAmount + curr.amount;
        } else {
            acc.all.color += curr.pouredAmount + curr.amount;
        }

        const date = new Date(curr.createdAt);
        if (date.getFullYear() === today.getFullYear()) {
            acc.year.total += curr.pouredAmount + curr.amount;
            if (cType === 'DEV') {
                acc.year.dev += curr.pouredAmount + curr.amount;
            } else {
                acc.year.color += curr.pouredAmount + curr.amount;
            }
            if (date.getMonth() === today.getMonth()) {
                acc.month.total += curr.pouredAmount + curr.amount;
                if (cType === 'DEV') {
                    acc.month.dev += curr.pouredAmount + curr.amount;
                } else {
                    acc.month.color += curr.pouredAmount + curr.amount;
                }
                if (date.getDate() === today.getDate()) {
                    acc.day.total += curr.pouredAmount + curr.amount;
                    if (cType === 'DEV') {
                        acc.day.dev += curr.pouredAmount + curr.amount;
                    } else {
                        acc.day.color += curr.pouredAmount + curr.amount;
                    }
                }
            }
        }
        if ((today.getTime() - date.getTime()) / (1000*3600*24) < 7.5) {
            acc.week.total += curr.pouredAmount + curr.amount;
            if (cType === 'DEV') {
                acc.week.dev += curr.pouredAmount + curr.amount;
            } else {
                acc.week.color += curr.pouredAmount + curr.amount;
            }
        }

        return acc;
    }, {
        all: {total: 0, dev: 0, color: 0},
        day: {total: 0, dev: 0, color: 0},
        week: {total: 0, dev: 0, color: 0},
        month: {total: 0, dev: 0, color: 0},
        year: {total: 0, dev: 0, color: 0}
    });

    return {mixtures, mixTraces, summary}
}