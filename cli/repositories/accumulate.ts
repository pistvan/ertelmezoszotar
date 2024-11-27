/**
 * Generates a sequence of chunks of elements from the input sequence.
 * Starts a new chunk whenever the decider function returns false.
 *
 * @param elements Input sequence.
 * @param decider Decider function. Should add the element to carry and return true, or do nothing and return false.
 * @param initial A function that returns the initial carry.
 */
export default async function* accumulate<TElement extends unknown, TCarry extends object>(
    elements: Iterable<TElement>,
    decider: (carry: TCarry, element: TElement) => boolean,
    initial: () => TCarry,
): AsyncGenerator<TCarry> {
    let carry = initial();
    let carryIsEmpty = true;

    for (const element of elements) {
        while (true) {
            if (decider(carry, element)) {
                carryIsEmpty = false;
                break;
            }

            if (carryIsEmpty) {
                throw new Error('Decider function did not add any elements to carry.');
            }

            yield carry;
            carry = initial();
            carryIsEmpty = true;
        }
    }
}
