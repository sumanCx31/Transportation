import * as Yup from "yup";

export interface IRegisterFormData {
    fullName: string;
    email: string;
    phone: string;
    profilePhoto?: File | null;
    password: string;
    confirmPassword: string;
  }

export const RegisterDTO: Yup.ObjectSchema<IRegisterFormData> = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),

  profilePhoto: Yup.mixed<File>().nullable().optional(),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});