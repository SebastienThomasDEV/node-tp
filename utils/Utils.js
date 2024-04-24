const Utils = {
    removeDuplicateObjects(array, property) {
        const uniqueIds = [];
        return array.filter(element => {
            const isDuplicate = uniqueIds.includes(element[property]);

            if (!isDuplicate) {
                uniqueIds.push(element[property]);
                return true;
            }
            return false;
        });
    }
}
module.exports = Utils;