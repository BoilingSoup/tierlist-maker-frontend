import { append, filterByID, findIndexByID, insertAtIndex } from "./helpers";

describe("filterByID function", () => {
  test("returns a new instance of an Array", () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const doesntMatter = 0;

    const result = filterByID(arr, doesntMatter);
    const resultIsArray = result instanceof Array;
    const isSameInstance = arr === result;

    expect(resultIsArray).toEqual(true);
    expect(isSameInstance).toEqual(false);
  });

  test("filters only objects in the array that match the provided ID", () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const result = filterByID(arr, 1);
    const expected = [{ id: 2 }, { id: 3 }];

    expect(result).toEqual(expected); // Jest compares values, not references.
  });

  test("filters multiple objects if multiple objects match the provided ID", () => {
    const arr = [{ id: 1 }, { id: 1 }, { id: 3 }];

    const result = filterByID(arr, 1);
    const expected = [{ id: 3 }];

    expect(result).toEqual(expected);
  });
});

describe("findIndexByID function", () => {
  test("returns the index of the object in the array that matches the provided ID", () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 100 }];

    const result1 = findIndexByID(arr, 1);
    const result2 = findIndexByID(arr, 2);
    const result3 = findIndexByID(arr, 3);
    const result4 = findIndexByID(arr, 100);

    expect(result1).toEqual(0);
    expect(result2).toEqual(1);
    expect(result3).toEqual(2);
    expect(result4).toEqual(3);
  });

  test("returns index of the first object in the array that matches the provided ID", () => {
    const arr = [{ id: 1 }, { id: 1 }, { id: 1 }];

    const result = findIndexByID(arr, 1);

    expect(result).toEqual(0);
  });

  test("returns -1 if none of the objects in the array matches the provided ID", () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const result = findIndexByID(arr, 9999);

    expect(result).toEqual(-1);
  });
});

describe("insertAtIndex function", () => {
  test("returns a new instance of an Array", () => {
    const arr = [1];
    const doesntMatter1 = 1;
    const doesntMatter2 = 2;

    const result = insertAtIndex(arr, doesntMatter1, doesntMatter2);
    const resultIsArray = result instanceof Array;
    const isSameInstance = arr === result;

    expect(resultIsArray).toEqual(true);
    expect(isSameInstance).toEqual(false);
  });

  describe("returns an array with the provided data", () => {
    test("inserted at the specified index", () => {
      const arr = [1, 2, 4];

      const result = insertAtIndex(arr, 3, 2);
      const expected = [1, 2, 3, 4];

      expect(result).toEqual(expected);
    });

    test("appeneded to the end if the specified index is > than the provided array's length", () => {
      const arr = [1, 2, 3];

      const result = insertAtIndex(arr, 4, 900);
      const expected = [1, 2, 3, 4];

      expect(result).toEqual(expected);
    });

    describe("prepended to the beginning", () => {
      test("if the specified index is NaN", () => {
        const arr = [1, 2, 3];

        const result = insertAtIndex(arr, 0, NaN);
        const expected = [0, 1, 2, 3];

        expect(result).toEqual(expected);
      });

      test("if the specified index is negative", () => {
        const arr = [1, 2, 3];

        const result = insertAtIndex(arr, 0, -999);
        const expected = [0, 1, 2, 3];

        expect(result).toEqual(expected);
      });
    });
  });
});

describe("append function", () => {
  test("returns a new instance of an Array", () => {
    const arr = [1, 2, 3];
    const doesntMatter = 4;

    const result = append(arr, doesntMatter);
    const resultIsArray = result instanceof Array;
    const isSameInstance = arr === result;

    expect(resultIsArray).toEqual(true);
    expect(isSameInstance).toEqual(false);
  });

  describe("returns an array", () => {
    test("with the provided data inserted at the end of the array when one piece of data is provided", () => {
      const arr = [1, 2, 3];

      const result = append(arr, 4);
      const expected = [1, 2, 3, 4];

      expect(result).toEqual(expected);
    });

    test("with all the provided data inserted at the end of the array, in the same order it was provided", () => {
      const arr = [1, 2, 3];

      const result = append(arr, 4, 5, 6);
      const expected = [1, 2, 3, 4, 5, 6];

      expect(result).toEqual(expected);
    });
  });
});
