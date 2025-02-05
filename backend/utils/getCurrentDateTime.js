export const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are 0-based in JavaScript
    const day = today.getDate();

    return { year, month, day };
}