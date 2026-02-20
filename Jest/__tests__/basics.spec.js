test("addition", () => {
    expect(2 + 2).toBe(4);
});

test("null", () => {
    let i = null;

    expect.assertions(2);
    expect(i).toBeNull()
    expect(i).toBeDefined();
});

test("Animal Array", () => {
    const animals = ["cat", "dog"];

    expect(animals).toContain("cat");
    expect(animals).toBeInstanceOf(Array);
});

test("Get Data", () => {
    expect(() => getData()).toThrow("Not found");

    function getData() { throw new Error("Not found"); }
});