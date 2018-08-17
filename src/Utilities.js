export default class Utilities {
    static chunkArrayByNumber(list, n) {
        let groupedArray = [];

        for (let i = 0, j = 0; i < list.length; i++) {
            if (i >= n && i % n === 0)
                j++;
            groupedArray[j] = groupedArray[j] || [];
            groupedArray[j].push(list[i])
        }

        return groupedArray;
    }

    static shuffleArray(array) {
        let rand, index = -1,
            length = array.length,
            result = Array(length);
        while (++index < length) {
            rand = Math.floor(Math.random() * (index + 1));
            result[index] = result[rand];
            result[rand] = array[index];
        }
        return result;
    }
}