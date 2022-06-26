export function colorMapBuilder(keyList){
    const colorNames = [
        "stdLightYellow",
        "stdLightRed",
        "stdLightGreen",
        "stdBrightYellow",
        "stdDarkPink",
        "stdBrightOrange", 
        "stdBrightGreen",
        "stdDarkYellow",
        "stdDarkRed",
        "stdLightPink",
        "stdBrightPink", 
    "stdLightGray",
    "lightCyan",
    "lightRed", 
    "lightGreen" ];

    var colorMap = new Map();

    keyList.forEach((key,index) => {
        colorMap.set(key,colorNames[index]);
    });

    return colorMap;
}

