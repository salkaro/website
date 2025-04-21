export const validateTextInput = (
    text: string,
    maxLength: number = 254
): boolean => {
    // Check if the input exceeds the maximum length.
    if (text.length > maxLength) {
        return false;
    }

    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(text);
};


export function validateNumber(value: string): boolean {
    const regex = /^[0-9]+$/;
    return regex.test(value);
}

export const validateContainsInput = (
    text: string,
    maxLength: number = 254
): boolean => {
    // Check if the input exceeds the maximum length.
    if (text.length > maxLength) {
        return false;
    }

    const pattern = /^[a-zA-Z_]+$/;
    return pattern.test(text);
};