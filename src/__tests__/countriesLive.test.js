import countries from "../services/countries";

test("getAll returns data from API", async () => {
  // call function getAll from countries service
  const data = await countries.getAll();

  // check if data is an array since we are expecting an array of countries from the API
  expect(Array.isArray(data)).toBe(true);

  // check that each item in the array has the properties name, population, and area we expect
  data.forEach((country) => {
    expect(country).toHaveProperty("name");
    expect(country).toHaveProperty("population");
    expect(country).toHaveProperty("area");
  });
});
