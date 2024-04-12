"use server";

import { OptionData } from "../const";
import { getBackendApiUrl } from "../utils";

type InitData = {
  yearOptions: OptionData[];
  areaCodeOptions: OptionData[];
};
async function getData() {
  const data: InitData = {
    yearOptions: [],
    areaCodeOptions: [],
  };

  // Fetch data from external API
  let res: Response = await fetch(
    getBackendApiUrl(process.env.BACKEND_CRIME_RATES_YEAR_OPTIONS_PATH)
  );
  if (res.ok) {
    data.yearOptions = await res.json();
  }
  res = await fetch(
    getBackendApiUrl(process.env.BACKEND_AREA_CODE_OPTIONS)
  );
  if (res.ok) {
    data.areaCodeOptions = await res.json();
  }
  return data;
}

export { getData };
