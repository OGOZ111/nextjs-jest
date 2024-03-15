import { configureStore } from "@reduxjs/toolkit";
import countriesService from "../services/countries";
import countriesSlice, { initializeCountries } from "../store/countriesSlice";

jest.mock("../services/countries");

describe("countriesSlice tests", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        countries: countriesSlice,
      },
    });
  });

  it("should handle the initialState correctly", () => {
    const { countries, isLoading } = store.getState().countries;

    expect(countries).toEqual([]);
    expect(isLoading).toBe(true);
  });

  it("should handle getCountries", () => {
    store.dispatch({
      type: "countries/getCountries",
      payload: ["Country 1", "Country 2"],
    });
    expect(store.getState().countries.countries).toEqual([
      "Country 1",
      "Country 2",
    ]);
    expect(store.getState().countries.isLoading).toBe(false);
  });

  it("should handle initializeCountries", async () => {
    const mockCountries = ["Country 1", "Country 2"];

    countriesService.getAll.mockResolvedValue(mockCountries);

    await store.dispatch(initializeCountries());

    expect(store.getState().countries.countries).toEqual(mockCountries);
    expect(store.getState().countries.isLoading).toBe(false);
  });
});
