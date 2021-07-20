import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import moment from "moment";
import AlgoliaPlaces from "algolia-places-react";

const { RangePicker } = DatePicker;
const { Option } = Select;

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  //   countries: ["au"],
};

const SearchField = () => {
  const history = useHistory();

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [bedCount, setBedCount] = useState(0);

  const handleSubmit = () => {
    history.push(
      `search-result?location=${location}&date=${date}&bed${bedCount}`
    );
  };

  return (
    <div className="d-flex pb-4">
      <div className="w-100">
        <AlgoliaPlaces
          className="form-control ml-2 mr-2"
          placeholder="Location"
          defaultValue={location}
          options={config}
          onChange={({ suggestion }) => setLocation(suggestion.value)}
          style={{ height: "50px" }}
        />
        <RangePicker
          className="w-100"
          onChange={(value, dateString) => setDate(dateString)}
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
        <Select
          className="w-100"
          onChange={(value) => setBedCount(value)}
          size="large"
          placeholder="Number of bed"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
        <SearchOutlined
          onClick={handleSubmit}
          className="btn btn-primary p-3"
        />
      </div>
    </div>
  );
};

export default SearchField;
