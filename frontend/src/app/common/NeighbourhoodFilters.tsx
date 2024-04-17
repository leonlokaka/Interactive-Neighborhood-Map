"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from "../serverSide/main";
import { FilterContainer } from "../common/Component";

interface NeighbourhoodFilterData {
  year: string;
  areaCode: string;
}

enum NeighbourhoodFilterTypes {
  "year" = "year",
  "areaCode" = "areaCode",
}

interface NeighbourhoodFiltersArgs {
  onChange: (neighbourhoodFilterData: NeighbourhoodFilterData) => void;
  show: NeighbourhoodFilterTypes[];
}

function NeighbourhoodFilters(args: NeighbourhoodFiltersArgs) {
  const [yearOptions, setYearOptions] = useState<any[]>([]);
  const [areaCodeOptions, setAreaCodeOptions] = useState<any[]>([]);
  const [neighbourhoodFilterData, setNeighbourhoodFilterData] =
    useState<NeighbourhoodFilterData>({ year: "", areaCode: "" });

  async function initFilters() {
    const initData = await getData();
    setYearOptions(initData.yearOptions);
    setAreaCodeOptions(initData.areaCodeOptions);
  }

  useEffect(() => {
    initFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    args.onChange(neighbourhoodFilterData);
  }, [args, neighbourhoodFilterData]);

  return (
    <>
      <FilterContainer>
        <h5>Data Filter:</h5>
        {yearOptions.length == 0 ? (
          <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </>
        ) : (
          <>
            {args.show.includes(NeighbourhoodFilterTypes.year) && (
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="year-label">Year</InputLabel>
                <Select
                  labelId="year-label"
                  id="year"
                  label="Year"
                  onChange={(e: any) => {
                    setNeighbourhoodFilterData({
                      ...neighbourhoodFilterData,
                      year: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {yearOptions.map((option, i) => (
                    <MenuItem value={option.__value} key={i}>
                      {option.__text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {args.show.includes(NeighbourhoodFilterTypes.areaCode) && (
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="areaCode-label">Area</InputLabel>
                <Select
                  labelId="areaCode-label"
                  id="areaCode"
                  label="areaCode"
                  onChange={(e: any) => {
                    setNeighbourhoodFilterData({
                      ...neighbourhoodFilterData,
                      areaCode: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {areaCodeOptions.map((option, i) => (
                    <MenuItem value={option.__value} key={i}>
                      {option.__text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}
      </FilterContainer>
    </>
  );
}

export type { NeighbourhoodFiltersArgs, NeighbourhoodFilterData };

export { NeighbourhoodFilters, NeighbourhoodFilterTypes };
