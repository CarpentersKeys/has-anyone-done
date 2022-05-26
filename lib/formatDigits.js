export default function formatDigits({ value, numberOfDigits, emptyCharacter }) {
    // replaces empty positions in a multidigit number with emptyCharacter
    const splitVal = value.toString().split('');
    if (splitVal.length === numberOfDigits) { return value; };

    return new Array(numberOfDigits)
        .fill('')
        .map((_, i) => splitVal[splitVal.length - i] || emptyCharacter)
        .join('')
}