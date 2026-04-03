export const numberToWord = (number) => {
    const words = [
        'zero',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
    ];
    return words[number];
}

export const formatMoney = (amount) =>
    new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(amount / 100);

export const formatDate = (value) => {
    if (!value) return 'Pending activation';
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(value));
};