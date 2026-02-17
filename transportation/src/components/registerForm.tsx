import "../assets/css/style.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { EmailInput, PasswordInput, TextInput }  from "./formInput/formInput";
import { RegisterDTO, type IRegisterFormData } from "./contract";


const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      profilePhoto: null,
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(RegisterDTO),
  });
  const onSubmit: SubmitHandler<IRegisterFormData> = async (data) => {
    console.log(data);
    console.log("Form submitted");

    // TODO: API call
  };
  return (
    <div className="flex justify-center lg:justify-end">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl animate-fade-in-up">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-slate-400 mt-2">
            Join SuvYatra for a better travel experience
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
              Full Name
            </label>
            <TextInput
              control={control}
              name={"fullName"}
              errMsg={errors?.fullName?.message as string}
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
              Email Address
            </label>
            <EmailInput
              control={control}
              name={"email"}
              errMsg={errors?.email?.message as string}
            />
          </div>

          {/* Phone Number & Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
                Phone Number
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <>
                    <div>
                    <input
                      {...field}
                      type="tel"
                      className="w-full px-5 py-3 bg-slate-900/50 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 placeholder:text-slate-600"
                      placeholder="98xxxxxxxx"
                    />
                    <p className="text-red-400 text-xs mt-1 ml-1">
                      {errors?.phone?.message as string}
                    </p>
                    </div>
                  </>
                )}
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
                Profile Photo
              </label>
              <Controller
                name="profilePhoto"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0] ?? null)
                    }
                    className="w-full text-sm text-slate-400
        file:mr-4 file:py-2 file:px-4 file:rounded-full
        file:border-0 file:text-sm file:font-semibold
        file:bg-emerald-500/10 file:text-emerald-400
        hover:file:bg-emerald-500/20 cursor-pointer
        bg-slate-900/50 border border-white/10 rounded-2xl py-1.75 px-2"
                  />
                )}
              />
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
                Password
              </label>
              <PasswordInput
                control={control}
                name={"password"}
                errMsg={errors?.password?.message as string}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
                Confirm
              </label>
              <PasswordInput
                control={control}
                name={"confirmPassword"}
                errMsg={errors?.confirmPassword?.message as string}
              />
            </div>
          </div>

         
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60
              text-slate-900 font-bold rounded-2xl transition-all transform
              hover:scale-[1.01] active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            {isSubmitting
              ? "Register for SuvYatra...."
              : "Register for SuvYatra"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Already have an account?{" "}
          <a
            href="/"
            className="text-emerald-400 font-semibold hover:underline transition-all"
          >
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
