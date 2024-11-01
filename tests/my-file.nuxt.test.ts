// @vitest-environment nuxt
import {expect, test} from 'vitest'

test('my test', () => {
    const result = 3 + 2; // Calculate the result

    expect(result).equals(5) // Use closeTo correctly
});