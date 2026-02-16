import { Controller } from "react-hook-form";

export interface IEmailInputProps {
    control:any;
    name:string;
}
export const EmailInput = ({ control, name }: Readonly<IEmailInputProps>) => {
    return (
      <>
        <Controller
          name={name}
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field, formState: { errors } }) => (
            <input
              {...field}
              type="email"
              autoComplete={name}
              id={name}
              placeholder="name@company.com"
              className={`w-full px-5 py-4 bg-slate-900/50 border rounded-2xl text-white
                outline-none transition-all duration-300 placeholder:text-slate-600
                ${
                  errors[name]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/10 focus:ring-emerald-500"
                } focus:ring-2`}
            />
          )}
        />
      </>
    );
  };
  

export const PasswordInput = ({ control, name }: Readonly<IEmailInputProps>) => {
    return (
        <>
            <Controller
              name={name}
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              }}
              render={({ field , formState:{errors}}) => (
                <input
                  {...field}
                  type="password"
                  autoComplete={name}
                  id={name}
                  placeholder="••••••••"
                  className={`w-full px-5 py-4 bg-slate-900/50 border rounded-2xl text-white
                    outline-none transition-all duration-300 placeholder:text-slate-600
                    ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/10 focus:ring-emerald-500"
                    } focus:ring-2`}
                  
                />
              )}
            />
        </>
    );
}