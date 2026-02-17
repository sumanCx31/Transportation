import { Controller } from "react-hook-form";

export interface IEmailInputProps {
    control:any;
    name:string;
    errMsg?:string;
}

export const EmailInput = ({ control, name, errMsg='' }: Readonly<IEmailInputProps>) => {
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
          render={({ field }) => (
            <input
              {...field}
              type="email"
              autoComplete={name}
              id={name}
              placeholder="name@company.com"
              className={`w-full px-5 py-4 bg-slate-900/50 border rounded-2xl text-white
                outline-none transition-all duration-300 placeholder:text-slate-600
                ${
                  errMsg && errMsg.trim() !== ""
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/10 focus:ring-emerald-500"
                } focus:ring-2`}
            />
          )}
        />
      </>
    );
};
  
export const PasswordInput = ({ control, name, errMsg='' }: Readonly<IEmailInputProps>) => {
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
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  autoComplete={name}
                  id={name}
                  placeholder="••••••••"
                  className={`w-full px-5 py-4 bg-slate-900/50 border rounded-2xl text-white
                    outline-none transition-all duration-300 placeholder:text-slate-600
                    ${
                      errMsg && errMsg.trim() !== ""
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/10 focus:ring-emerald-500"
                    } focus:ring-2`}
                  
                />
              )}
            />
        </>
    );
}

export const TextInput = ({ control, name ,errMsg=''}: Readonly<IEmailInputProps>) => {
    return (
        <>
        <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className="w-full px-5 py-3 bg-slate-900/50 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 placeholder:text-slate-600"
                    placeholder="Brad Pit"
                  />
                  <p className="text-red-400 text-xs mt-1 ml-1">
                    {errMsg}
                  </p>
                </>
              )}
            />
        </>
    )
}