const vowels: string[] = ['a', 'e', 'i', 'o', 'u'];
const consonants: string[] = [
  'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
  'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'
];

interface ILetterObj {
    lcl: string;
    isUpperCase: boolean;
    isVowel: boolean;
    isConsonant: boolean;
    letter: string;
    nPoss: bigint;
}

const convert = (letter: string): ILetterObj => {
    const lcl = letter.toLowerCase();
    const isVowel = vowels.includes(lcl);
    const isConsonant = consonants.includes(lcl);
    const isUpperCase = letter !== lcl;
    const nPoss = isVowel ? BigInt(vowels.length) : isConsonant ? BigInt(consonants.length) : BigInt(1);
    return { lcl, isUpperCase, isVowel, isConsonant, letter, nPoss }
}

export const encrypt = (message: string, cryptoNumber: number): string => {
    const cryptBI = BigInt(cryptoNumber);
    const messageArray: ILetterObj[] = message.split('').map(convert);
    const nAllPoss = messageArray.reduce((acc, curr) => acc * curr.nPoss, BigInt(1));
    const _encrypt = (letObj: ILetterObj, index: number, arr: ILetterObj[]): string => {
        const { lcl, isUpperCase, isVowel, isConsonant, letter } = letObj;
        if (!isVowel && !isConsonant) return letter;
        const lettersAfter = arr.slice(index + 1);
        const letters = isVowel ? vowels : isConsonant ? consonants : [];
        const variantsAfter = lettersAfter.reduce((acc, curr) => acc * curr.nPoss, BigInt(1));
        const bigNumberE = cryptBI % nAllPoss;
        const timesToChange = (bigNumberE / variantsAfter) % BigInt(letters.length);
        const currentIndex = BigInt(letters.indexOf(lcl))
        const newIndex = (currentIndex + timesToChange + bigNumberE) % BigInt(letters.length);
        const newLetter = letters[Number(newIndex)];
        return isUpperCase ? newLetter.toUpperCase() : newLetter;
    };

    return messageArray.map(_encrypt).join('');
};

export const decrypt = (message: string, cryptoNumber: number): string => {
    const cryptBI = BigInt(cryptoNumber);
    const messageArray: ILetterObj[] = message.split('').map(convert);
    const nAllPoss = messageArray.reduce((acc, curr) => acc * curr.nPoss, BigInt(1));
    const _decrypt = (letObj: ILetterObj, index: number, arr: ILetterObj[]): string => {
        const { lcl, isUpperCase, isVowel, isConsonant, letter } = letObj;
        if (!isVowel && !isConsonant) return letter;
        const lettersAfter = arr.slice(index + 1);
        const letters = isVowel ? vowels : isConsonant ? consonants : [];
        const variantsAfter = lettersAfter.reduce((acc, curr) => acc * curr.nPoss, BigInt(1));
        const bigNumberE = cryptBI % nAllPoss;
        const timesToChange = (bigNumberE / variantsAfter) % BigInt(letters.length);
        const currentIndex = BigInt(letters.indexOf(lcl))
        const newIndex = (currentIndex - timesToChange - bigNumberE + (BigInt(letters.length) * bigNumberE)) % BigInt(letters.length);
        const newLetter = letters[Number(newIndex)];
        return isUpperCase ? newLetter.toUpperCase() : newLetter;
    };

    return messageArray.map(_decrypt).join('');
};
