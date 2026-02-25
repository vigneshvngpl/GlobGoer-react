import React from 'react';
import { DatePicker, theme } from 'antd';
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import searchBarOptions from '../data/Searchbaroptions';
import { resetSearch, setSearchParams } from '../store/searchSlice';
import { searchValidationSchema } from "../validation/searchValidation";
import CityDropdown from './CityDropdown';
import './SearchBar.css';


const { RangePicker } = DatePicker;

export default function SearchBar() {
  const dispatch = useDispatch();
  const { token } = theme.useToken();

  const formik = useFormik({
    initialValues: {
      from: null,
      to: null,
      flightType: "",
      travelClass: "",
      tripType: "",
      departDate: null,
      returnDate: null,
      travellers:""
    },
    validationSchema: searchValidationSchema,
    validateOnMount:false,
    onSubmit: (values) => {
      dispatch(
        setSearchParams({
          fromCity: values.from?.city || null,
          toCity: values.to?.city || null,
          tripType: values.tripType,
          travelClass: values.travelClass,
          flightType:values.flightType,
          departDate:values.departDate || null,
          returnDate:values.returnDate || null,
          travellers:values.travellers || 0
        })
      );
    },
  });

  const handleReset=()=>{
      dispatch(resetSearch())
 formik.resetForm({
  values:formik.initialValues,
 })

 setTimeout(()=>{
formik.setTouched({})
 formik.setErrors({})
 },0)
 
  
  
  }

  const isRoundTrip = formik.values.flightType === "round";

  const cellRender = (current, info) => {
    const style = {
      border: `1px solid ${token.colorPrimary}`,
      borderRadius: '50%',
    };

    if (info.type !== 'date') return info.originNode;

    return (
      <div
        className="ant-picker-cell-inner"
        style={current.date() === 1 ? style : {}}
      >
        {current.date()}
      </div>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="searchbar">

      <div className="searchbar-top">
        <div>
          <select
            name="flightType"
            value={formik.values.flightType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="searchbar-select"
          >
            <option value="">
              {searchBarOptions.flightType.placeholder}
              
            </option>
            {searchBarOptions.flightType.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.touched.flightType && formik.errors.flightType && (
            <div className="error-text">{formik.errors.flightType}</div>
          )}
        </div>

        <div>
          <select
            name="travelClass"
            value={formik.values.travelClass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="searchbar-select"
          >
            <option value="">
              {searchBarOptions.travelClass.placeholder}
            </option>
            {searchBarOptions.travelClass.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.touched.travelClass && formik.errors.travelClass && (
            <div className="error-text">{formik.errors.travelClass}</div>
          )}
        </div>

        <div>
          <select
            name="tripType"
            value={formik.values.tripType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="searchbar-select"
          >
            <option value="">
              {searchBarOptions.tripType.placeholder}
            </option>
            {searchBarOptions.tripType.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.touched.tripType && formik.errors.tripType && (
            <div className="error-text">{formik.errors.tripType}</div>
          )}
        </div>

      </div>

      <div className="searchbar-bottom">

        
        <div>
          <CityDropdown
            placeholder="From"
            icon="/SearchBar/from.png"
            value={formik.values.from}
            onChange={(val) => formik.setFieldValue("from", val)}
          />
          {formik.touched.from && formik.errors.from && (
            <div className="error-text">{formik.errors.from}</div>
          )}
        </div>

        <button
          type="button"
          className="searchbar-swap"
          onClick={() => {
            const temp = formik.values.from;
            formik.setFieldValue("from", formik.values.to);
            formik.setFieldValue("to", temp);
          }}
        >
          <img src="/SearchBar/swap.png" alt="swap" className="searchbar-icon" />
        </button>
        
        <div>
          <CityDropdown
            placeholder="To"
            icon="/SearchBar/to.png"
            value={formik.values.to}
            onChange={(val) => formik.setFieldValue("to", val)}
          />
          {formik.touched.to && formik.errors.to && (
            <div className="error-text">{formik.errors.to}</div>
          )}
        </div>

        <div className="searchbar-input-wrap searchbar-date-wrap">
          <img src="/SearchBar/date.png" alt="date" className="searchbar-icon" />

          {isRoundTrip ? (
            <RangePicker
              cellRender={cellRender}
              placeholder={["Departing", "Returning"]}
              variant="borderless"
              className="searchbar-antd-picker"
              onChange={(dates) => {
                formik.setFieldValue("departDate", dates?.[0] ?? null);
                formik.setFieldValue("returnDate", dates?.[1] ?? null);
              }}
            />
          ) : (
            <DatePicker
              cellRender={cellRender}
              placeholder="Departing"
              variant="borderless"
              className="searchbar-antd-picker"
              value={formik.values.departDate}
              onChange={(date) =>
                formik.setFieldValue("departDate", date)
              }
            />
          )}

        </div>

        {(formik.touched.departDate && formik.errors.departDate) && (
          <div className="error-text">{formik.errors.departDate}</div>
        )}

        {(formik.touched.returnDate && formik.errors.returnDate) && (
          <div className="error-text">{formik.errors.returnDate}</div>
        )}
        <div className="searchbar-input-wrap">
          <img
            src="/SearchBar/passengers.png"
            alt="passengers"
            className="searchbar-icon"
          />
          <input
            type="number"
            placeholder="Travellers"
            min={1}
            className="searchbar-input"
            value={formik.values.travellers}
            onChange={(e)=>{
              formik.setFieldValue("travellers",e.target.value)
            }}
           
          />
        </div>
        <button
          type="submit"
          className="searchbar-search-btn"
        >
          <img
            src="/SearchBar/search.png"
            alt="search icon"
            className="searchbar-icon"
          />
          Search
        </button>
          <button
          onClick={handleReset}
          type="submit"
          className="searchbar-search-btn"
        >
          
          Reset
        </button>

      </div>
    </form>
  );
}