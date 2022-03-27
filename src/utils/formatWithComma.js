/**
 * Formats a number to include commas in appropriate places
 *
 * @param {number} number The number which is formatted to include commas
 */
const formatWithComma = (number) => {
    const digitsArray = String(number).split('');
    for (let i = digitsArray.length - 3; i > 0; i -= 3) {
        digitsArray[i] = ',' + digitsArray[i];
    }

    return digitsArray.join('');
};

export { formatWithComma };
