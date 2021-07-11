import React from "react";

import AlgoliaPlaces from "algolia-places-react";
import { DatePicker, Select } from "antd";

import moment from "moment";

const { Option } = Select;

const bedCount = [
  {
    id: 1,
    count: 1,
  },
  {
    id: 2,
    count: 2,
  },
  {
    id: 3,
    count: 3,
  },
  {
    id: 4,
    count: 4,
  },
  {
    id: 5,
    count: 5,
  },
];

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  //   countries: ["au"],
};

const HotelForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
  location,
  setLocation,
}) => {
  const { title, content, price } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          className="form-control m-2"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          value={title}
        />

        <textarea
          className="form-control m-2"
          name="content"
          onChange={handleChange}
          placeholder="Content"
          value={content}
        />

        <AlgoliaPlaces
          className="form-control ml-2 mr-2"
          placeholder="Location"
          defaultValue={location}
          options={config}
          onChange={({ suggestion }) => setLocation(suggestion.value)}
          style={{ height: "50px" }}
        />

        <input
          type="number"
          className="form-control m-2"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          value={price}
        />

        <Select
          className="w-100 m-2"
          size="large"
          placeholder="Numbers of bed"
          onChange={(value) => setValues({ ...values, bed: value })}
        >
          {bedCount.map((bed) => (
            <Option key={bed.id}>{bed.count}</Option>
          ))}
        </Select>
      </div>

      <DatePicker
        defaultValue={moment(values.from, "YYYY-MM-DD")}
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <DatePicker
        defaultValue={moment(values.to, "YYYY-MM-DD")}
        placeholder="To date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
};

export default HotelForm;
