const D = require('./index');

describe('D class', () => {
  test('should instantiate with current date', () => {
    const currentDate = new D();
    expect(currentDate._date).toBeInstanceOf(Date);
  });

  // GETTERS

  describe('getters', () => {
    const dateInstance = new D(2023, 0, 18, 9, 10, 25);

    test('year', () => {
      expect(dateInstance.year).toBe(2023);
    });

    test('yr', () => {
      expect(dateInstance.yr).toBe(23);
    });

    test('month', () => {
      expect(dateInstance.month).toBe('January');
    });

    test('mon', () => {
      expect(dateInstance.mon).toBe('Jan');
    });

    test('day', () => {
      expect(dateInstance.day).toBe('Wednesday');
    });

    test('dy', () => {
      expect(dateInstance.dy).toBe('Wed');
    });

    test('date', () => {
      expect(dateInstance.date).toBe(18);
    });

    test('hours', () => {
      expect(dateInstance.hours).toBe(9);
    });

    test('mins', () => {
      expect(dateInstance.mins).toBe(10);
    });

    test('secs', () => {
      expect(dateInstance.secs).toBe(25);
    });
  });

  // format() method
  describe('format', () => {
    const dateInstance = new D(2023, 2, 18, 9, 1, 5);

    test('default format', () => {
      expect(dateInstance.format()).toBe('2023 March 18');
    });

    test('formatting characters', () => {
      expect(dateInstance.format('y/m/d')).toBe('23/Mar/18');
      expect(dateInstance.format('H:I:S')).toBe('09:01:05');
      expect(dateInstance.format('h:i:s')).toBe('9:1:5');
      expect(dateInstance.format('Y-M-D h:I:S')).toBe('2023-March-18 9:01:05');
    });
  });

  // when() method

  describe('when', () => {
    const futureDate = new D(2025, 8, 5, 3, 4, 5);
    const pastDate = new D(2022, 1, 5, 3, 4, 5);

    test('should handle future dates correctly', () => {
      expect(futureDate.when()).toBe('2 years from now');
    });

    test('should handle past dates correctly', () => {
      expect(pastDate.when()).toBe('1 year ago');
    });

    test('should handle past dates correctly', () => {
      expect(pastDate.when()).toBe('1 year ago');
    });

    test('Today', () => {
      const currentDate = new D();
      expect(currentDate.when()).toBe('today');
    });
  });
});
