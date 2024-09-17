// Take the .json/js obj and convert them to DataStore write.
//  - check against whats already available and update if needed instead
// through line to read and then update ingredients as well

import { Color, ColorLine, Company } from '$src/models';
import { DataStore } from 'aws-amplify';

export const enableColor = async (colorCompany) => {
    const colorCompanyObj = await DataStore.query(Company, co => co.name.eq(colorCompany))
    if (colorCompanyObj && colorCompanyObj.length > 0) {
        console.warn('Already enabled')
        console.log(colorCompanyObj)
        return;
    }
    const newCoObj = await DataStore.save(new Company({
        key: colorCompany,
        name: colorCompany
    }))
    console.log('Enabled Color Company')
    console.log(newCoObj);
}

export const updateColorLineIngredients = async (colorLineId, newIngredients) => {
    if (!Array.isArray(newIngredients)) {
        console.warn('Ingredients must be an array')
        return;
    }
    const colors = await DataStore.query(Color, c => c.colorLineColorsId.eq(colorLineId));
    if (!colors || colors.length === 0) {
        console.warn('No colors found for this line')
        return;
    }
    await Promise.all(colors.map(async (color) => {
        const colorObj = await DataStore.save(Color.copyOf(color, updated => {
            updated.ingredients = newIngredients;
        }));
    }));
}

export const updateColorLine = async (colorLineId, newColorLineObj) => {
    console.log('Updating Color Line');
    console.log(newColorLineObj);
    const colorLineObj = await DataStore.query(ColorLine, colorLineId);
    if (!colorLineObj) {
        console.warn('Could not find color line')
        return false;
    }
    const newColorLine = await DataStore.save(ColorLine.copyOf(colorLineObj, updated => {
        updated.name = newColorLineObj.name;
        updated.description = newColorLineObj.description;
        updated.type = newColorLineObj.type;
        updated.size = String(newColorLineObj.size);
        updated.units = newColorLineObj.units;
    }));
    console.log('Updated Color Line');
    console.log(newColorLine);
    return newColorLine;
};

export const updateColor = async (colorId, newColorObj) => {
    console.log('Updating Color');
    console.log(newColorObj);
    const colorObj = await DataStore.query(Color, colorId);
    if (!colorObj) {
        console.warn('Could not find color')
        return false;
    }
    const newColor = await DataStore.save(Color.copyOf(colorObj, updated => {
        updated.colorKey = newColorObj.colorKey;
        updated.altKey = newColorObj.altKey;
        updated.level = newColorObj.level;
        updated.ingredients = newColorObj.ingredients;
        updated.description = newColorObj.description;
        updated.segment = newColorObj.segment;
        updated.material = newColorObj.material;
        updated.size = String(newColorObj.size);
        updated.units = newColorObj.units;
    }));
    console.log('Updated Color');
    console.log(newColor);
    return newColor;
};

export const newColor = async (colorObj) => {
    console.log('Creating Color');
    console.log(colorObj);
    const newColor = await DataStore.save(new Color(colorObj));
    console.log('Created Color');
    console.log(newColor);
    return newColor;
};

export const updateColorTable = async (colorObj, colorCompany) => {
    //console.log(colorObj);
    //console.log(colorCompany);

    let keepAround = {}
    await Promise.all(Object.keys(colorObj).map(async (type) => {
        if (type.startsWith('_')) {
            return;
        }
        await Promise.all(colorObj[type].map(async (lineObj) => {
            const colorLineName = lineObj.name == '' ? lineObj.type : lineObj.name;
            let s = undefined
            if (lineObj?.size ?? false) {
                s = lineObj.size + ''
            }

            let colorLinePrep = {
                name: colorLineName,
                company: colorCompany,
                description: colorCompany+' '+colorLineName,
                type: lineObj.type,
                size: s,
            }
            const lineQueryOut = await DataStore.query(ColorLine, cl =>
                cl.and(cl => [
                    cl.name.eq(colorLineName),
                    cl.company.eq(colorCompany),
                    cl.type.eq(lineObj.type)
                ])
            )

            let colorLineObj = {};
            if (lineQueryOut && lineQueryOut.length > 0) {
                console.log('Already have a colorline with these properties...')
                colorLineObj = lineQueryOut[0];
            } else {
                console.log('Creating the colorline with these properties...')
                colorLineObj = await DataStore.save(new ColorLine(colorLinePrep))
            }
            console.log('name = ' + colorLineName
                    + '; co = ' + colorCompany
                    + '; type = ' + lineObj.type)
            
            keepAround[colorLineName] = colorLineObj;

            const colorObjPrep = {
                colorType: lineObj.type,
                colorLine: colorLineName,
                material: lineObj.material,
                company: colorCompany,
                colorLineColorsId: colorLineObj.id,
            }
            let lineIngredients = []
            if ('_ingredients' in lineObj.data) {
                lineIngredients = lineObj.data['_ingredients']
            }
            await Promise.all(Object.keys(lineObj.data).map(async (segmentName) => {
                if (segmentName.startsWith('_')) {
                    return;
                }
                const segmentObj = lineObj.data[segmentName]

                await Promise.all(segmentObj.colors.map(async (colorName, index) => {
                    // Derive an initial starting level
                    let level = '';
                    if ((segmentObj?.level?.length ?? 0) > 0 && segmentObj.level[index] !== null) {
                            level = '' + segmentObj.level[index];
                    } else if (type === 'Color') {
                        // 5.11 or 5.NA or 5 or 5+
                        if (/^[0-9]+\.[A-Za-z0-9]+$/.test(colorName) || /^[0-9]$/.test(colorName) || /^[0-9]\+$/.test(colorName)) {
                            level = colorName.split('+',1)[0].split('.', 1)[0];
                        // 5,11 or 5,NA or 5
                        } else if(/^[0-9]+,[A-Za-z0-9]+$/.test(colorName)||/^[0-9]$/.test(colorName)) {
                            level = colorName.split(',', 1)[0];
                        // 5NA or 11
                        } else if (/^[0-9]+[A-Za-z+]+$/.test(colorName)||/^[0-9]+$/.test(colorName)) {
                            level = colorName.replace(/(^\d+)(.+$)/i, '$1');
                        //5-NA or 11
                        } else if (/^[0-9]+\-[A-Za-z0-9]+$/.test(colorName)||/^[0-9]+$/.test(colorName)){
                            level = colorName.split('-', 1)[0]; 
                        //-NA or -11                           
                        } else if (/^\-[A-Za-z0-9]+$/.test(colorName)) {
                            level = 'Booster'
                        } else if (/^[0-9]+ [a-zA-Z]/.test(colorName)) {
                            level = colorName.split(' ',1)[0]
                        } else {
                            level = segmentName
                        }
                    } else if (type === 'Developer' || type === 'Activator') {
                        level = 'Developer'
                    } else {
                        level = segmentName
                    }

                    // Get ingredients out of the object
                    let ingredients = [];
                    if (segmentObj.ingredients.length == 0) {
                        ingredients = lineIngredients
                    } else if (typeof segmentObj.ingredients[0] === 'string') {
                        ingredients = segmentObj.ingredients
                    } else {
                        ingredients = segmentObj.ingredients[index]
                    }
                    
                    let alt = undefined
                    if ((segmentObj?.alt?.length ?? 0) > 0 && segmentObj.colors.length === (segmentObj?.alt?.length ?? -1)) {
                        alt = segmentObj.alt[index] == '' ? undefined : ("" + segmentObj.alt[index])
                    }

                    let description = colorCompany + ' ' + colorLineName + ' ' + colorName
                    if ((segmentObj?.names?.length ?? 0) > 0 && segmentObj.colors.length === (segmentObj?.names?.length ?? -1) && segmentObj.names[index] != '') {
                        description += ' ' + segmentObj.names[index]
                    }
                    let s = undefined;
                    if ((segmentObj?.size?.length ?? 0) > 0) {
                        const t = segmentObj.size[index]
                        s = t ? t + '' : undefined;
                    }

                    let colorInfoObj = {
                        ...colorObjPrep,
                        colorKey: colorName,
                        altKey: alt || '',
                        level: level,
                        ingredients: ingredients,
                        description: description,
                        segment: segmentName,
                        size: s,
                        units: segmentObj?.units[index] ?? undefined,
                    }

                    const colorQueryOut = await DataStore.query(Color, c => 
                        c.and(c => [
                            c.colorKey.eq(colorInfoObj.colorKey),
                            c.company.eq(colorInfoObj.company),
                            c.colorLine.eq(colorInfoObj.colorLine),
                            c.material.eq(colorInfoObj.material)
                        ])
                    )
                    
                    let colorObj = {}
                    if (colorQueryOut && colorQueryOut.length > 0) {
                        let colorID = '';
                        if (colorQueryOut.length > 1) {
                            const filteredColorQueryOut = colorQueryOut.filter(c => c.segment === colorInfoObj.segment)
                            if (filteredColorQueryOut.length > 1) {
                                console.warn('Multiple of One Color?')
                                console.log(filteredColorQueryOut)
                                return;
                            } else {
                                colorID = filteredColorQueryOut[0].id
                            }
                        } else {
                            colorID = colorQueryOut[0].id
                        }
                        console.log('Updating color @ ' + colorID)
                        const oldColorObj = await DataStore.query(Color, colorID)
                        if (!oldColorObj) {
                            console.warn('Could not get color to update: ' + colorID)
                            return
                        }
                        const colorObj = await DataStore.save(Color.copyOf(oldColorObj, updated => {
                            updated.altKey = colorInfoObj.altKey;
                            updated.level = colorInfoObj.level;
                            updated.ingredients = colorInfoObj.ingredients;
                            updated.description = colorInfoObj.description;
                            updated.segment = colorInfoObj.segment;
                            updated.material = colorInfoObj.material;
                        }))
                    } else {
                        console.log('New Color - ' + description);
                        const colorObj = await DataStore.save(new Color(colorInfoObj));
                    }

                }))
            }))

        }))
    }))

    console.log('= = = = = = = = = = = = = = = = = = = =')
    console.log('Assigning Parent/children relationships')

    await Promise.all(Object.keys(colorObj).map(async (type) => {
        if (type.startsWith('_')) {
            return;
        }
        await Promise.all(colorObj[type].map(async (lineObj) => {

            if (!lineObj.children && lineObj.chilrden) {
                lineObj.children = [...lineObj.chilrden]
            }
            if ((lineObj?.children?.length ?? 0) === 0 &&
                (lineObj?.parents?.length ?? 0) === 0) {
                return;
            }
            const colorLineName = lineObj.name == '' ? lineObj.type : lineObj.name;

            const childArray = lineObj?.children ?? []
            const parentArray = lineObj?.parents ?? []

            const childrenIDs = childArray.map(name => {
                return keepAround[name]?.id ?? null
            }).filter(id => id != null)

            const parentIDs = parentArray.map(name => {
                return keepAround[name]?.id ?? null
            }).filter(id => id != null)

            const colorLineID = keepAround[colorLineName].id
            const oldColorLineObj = await DataStore.query(ColorLine, colorLineID)
            if (!oldColorLineObj)
                return;
            const newColorLineObj = await DataStore.save(
                ColorLine.copyOf(oldColorLineObj, updated => {
                    updated.childrenIds = childrenIDs
                    updated.parentIds = parentIDs
                })
            )

            console.log('Updated Color line with Assigned parents/children')
            console.log(newColorLineObj)
        }))
    }))

}
