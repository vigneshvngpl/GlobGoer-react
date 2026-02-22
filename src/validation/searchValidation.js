import * as Yup from "yup";

export const searchValidationSchema = Yup.object({
  from: Yup.object()
    .nullable()
    .required("From city is required"),

  to: Yup.object()
    .nullable()
    .required("To city is required")
    .test(
      "not-same-city",
      "From and To cities cannot be same",
      function (value) {
        return value?.city !== this.parent.from?.city;
      }
    ),

  flightType: Yup.string()
    .required("Flight type is required"),

  travelClass: Yup.string()
    .required("Travel class is required"),

  tripType: Yup.string()
    .required("Trip type is required"),

  departDate: Yup.date()
    .nullable()
    .required("Departure date is required"),

  returnDate: Yup.date()
    .nullable()
    .when("flightType", {
      is: "round",
      then: (schema) =>
        schema.required("Return date is required for round trip"),
      otherwise: (schema) => schema.nullable(),
    }),
});