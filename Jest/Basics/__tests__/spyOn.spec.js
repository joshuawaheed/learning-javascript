const crypto = require("crypto");

const { getData } = require("../app");

test("Fetch data", async () => {
    jest.spyOn(crypto, "randomBytes").mockResolvedValueOnce("bytes");

    let res = await getData();

    expect(res).toBe("bytes");
});