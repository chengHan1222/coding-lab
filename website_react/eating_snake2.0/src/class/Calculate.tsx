export default class Calculate {
    static LCM(numberA: number, numberB: number): number {
        return numberA * numberB / Calculate.euclidean_algorithm(numberA, numberB);
    }

    private static euclidean_algorithm (numberA: number, numberB: number): number {
        if (numberA === 0 || numberB === 0) {
            return (numberA === 0)? numberB : numberA;
        }

        return Calculate.euclidean_algorithm(numberB, numberA % numberB);
    }
}