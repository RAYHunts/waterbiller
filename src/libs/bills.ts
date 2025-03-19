export function calculateAmountDue(previous: number, current: number) {

    const consumption = current - previous;

    if (consumption <= 0) {
        return 0;
    }

    // Calculate high-rate units
    const countCurrent = (Math.floor(current / 10) * 5 + Math.min(current % 10, 5));

    const countPrevious = (Math.floor(previous / 10) * 5 + Math.min(previous % 10, 5));

    const highRates = countCurrent - countPrevious;

    const lowRates = consumption - highRates;

    const amountDue = highRates * 10000 + lowRates * 5000;

    return amountDue;
}
