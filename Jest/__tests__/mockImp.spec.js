test("mockImplementation", () => {
    const mockFn = jest
        .fn(() => "default")
        .mockImplementation(() => "First call")
        .mockImplementation(() => "Second call");

    const res1 = mockFn();
    const res2 = mockFn();

    expect(res1).toBe("Second call");
    expect(res2).toBe("Second call");
});

test("mockImplementationOnce", () => {
    const mockFn = jest
        .fn(() => "default")
        .mockImplementationOnce(() => "First call")
        .mockImplementationOnce(() => "Second call");

    const res1 = mockFn();
    const res2 = mockFn();
    const res3 = mockFn();

    expect(res1).toBe("First call");
    expect(res2).toBe("Second call");
    expect(res3).toBe("default");
});