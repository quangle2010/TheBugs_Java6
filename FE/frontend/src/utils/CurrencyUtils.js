import { format } from 'date-fns';
import numeral from 'numeral';

/**
 * Formats a date to 'dd/MM/yyyy' format.
 * @param {string | Date} date - The date to format.
 * @returns {string} - The formatted date or an empty string if invalid.
 */
export const formattedDate = (date) => {
    if (date && !isNaN(new Date(date))) {
        return format(new Date(date), 'dd/MM/yyyy');
    }
    return '';
};

/**
 * Formats an amount to '0,0' format with 'VND' currency.
 * @param {number} amount - The amount to format.
 * @returns {string} - The formatted amount with currency.
 */
export const formatCurrency = (amount) => {
    return `${numeral(amount).format('0,0')} VND`;
};