import * as Yup from "yup";

export const searchValidationSchema = Yup.object({
  from: Yup.object()
    .nullable()
    .test(
      "from-required-if-to",
      "from city is required",
      function(value){
        const {to}=this.parent

        if(to && !value){
          return false
        }
        return true
      }
    ),

  to: Yup.object()
    .nullable()
    .test(
       "to-required-if-from",
      "to city is required",
      function(value){
        const {from}=this.parent
        if(from && !value){
          return false
        }
        return true
      }
    ),

  
});