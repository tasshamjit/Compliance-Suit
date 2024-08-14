import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )

    .required("Email equrired"),
  password: Yup.string()
    .min(
      8,
      "Password must be atleast 8 characters and must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be atleast 8 characters and must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password required"),
});

export default validationSchema;
