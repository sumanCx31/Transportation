import "../assets/css/style.css";

const RegisterForm = () => {
  return (
    <div className="flex justify-center lg:justify-end">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl animate-fade-in-up">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-slate-400 mt-2">Join SuvYatra for a better travel experience</p>
        </div>

        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Full Name</label>
            <input 
              type="text" 
              className="w-full px-5 py-3 bg-slate-900/50 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 placeholder:text-slate-600"
              placeholder="John Doe"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              className="w-full px-5 py-3 bg-slate-900/50 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 placeholder:text-slate-600"
              placeholder="name@company.com"
            />
          </div>

          {/* Phone Number & Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Phone Number</label>
              <input 
                type="tel" 
                className="w-full px-5 py-3 bg-slate-900/50 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 placeholder:text-slate-600"
                placeholder="98xxxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Profile Photo</label>
              <div className="relative">
                <input 
                  type="file" 
                  className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer bg-slate-900/50 border border-white/10 rounded-2xl py-1.75 px-2"
                />
              </div>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Password</label>
              <input 
                type="password" 
                className="w-full px-5 py-3 bg-slate-900/50 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Confirm</label>
              <input 
                type="password" 
                className="w-full px-5 py-3 bg-slate-900/50 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all duration-300 placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.01] active:scale-95 shadow-lg shadow-emerald-500/20 mt-4">
            Register for SuvYatra
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Already have an account? <a href="/" className="text-emerald-400 font-semibold hover:underline transition-all">Log in here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;