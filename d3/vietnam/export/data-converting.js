const d3 = require("d3");

const finalData = {
    "name": "vietnam_export_2016",
};

d3.csv("data_categories.csv", function (error, data) {
    const categories = data
        .filter(obj => ((obj.Classification === "H0") && (obj.Level === "2")))
        .reduce(createCategoriesObject, {});

    d3.csv("data.csv", dottype, function (error, data) {
        const groupedDetailedData = groupThenSumUp(data, "Commodity_Code");

        for (let i in groupedDetailedData) {
            const key = i.substring(4, 6);
            categories[key].children.push(groupedDetailedData[i]);
        }

        const arrayOfCategories = Object.keys(categories).map(key => {
            const el = {
                "name": key,
                "description": categories[key].description,
                "children": categories[key].children
            };
            return el;
        });

        finalData["children"] = arrayOfCategories;

        // console.save(finalData, "finalData.json");

    });
});

function createChildren(obj) {
    const categoryCode = obj.Commodity_Code.slice(0, 2);
    categories[categoryCode]
}

function convertObjectToArray(obj) {

}

function createCategoriesObject(acc, obj) {
    const name = obj.Code;

    acc[name] = {
        "description": obj.Description,
        "children": []
    }
    return acc;
}

function dottype(d) {
    return {
        Reporter: d.Reporter,
        Reporter_ISO: d.Reporter_ISO,
        Partner_Code: d.Partner_Code,
        Partner: d.Partner,
        Partner_ISO: d.Partner_ISO,
        Commodity_Code: standardizeCommodityCode(d.Commodity_Code),
        Commodity: d.Commodity,
        Trade_Value: +d.Trade_Value
    }
}

function standardizeCommodityCode(code) {
    // each Commodity Code must contain 04 letters
    if (code.length === 4) { return code }
    if (code.length === 3) {
        return "0" + code;
    }
}

function groupThenSumUp(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        var key = "HS0_" + obj[property];
        if (!acc[key]) {
            acc[key] = {
                value: 0
            };
        }
        acc[key].value = +obj.Trade_Value;
        acc[key].description = obj.Commodity;
        return acc;
    }, {});
}