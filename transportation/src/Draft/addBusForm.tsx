"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { motion} from "framer-motion";
import { 
  Bus, 
  User, 
  Phone, 
  Upload, 
  CheckCircle, 
  ChevronLeft, 
  Hash, 
  Wind, 
  Users 
} from "lucide-react";
import authSvc from "../services/Auth.service";


interface IFormInputs {
  name: string;
  busNumber: string;
  busType: string;
  isActive: string;
  driverName: string;
  totalSeats: number;
  phone: string;
  image: FileList;
}

const AddBus: React.FC = () => {
  const { register, handleSubmit, reset, watch } = useForm<IFormInputs>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Watch for image changes to show a preview
  const imageFile = watch("image");
  React.useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const url = URL.createObjectURL(imageFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const onSubmit = async (data: IFormInputs) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, value.toString());
        }
      });
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      await authSvc.postRequest("/bus", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      reset();
      navigate("/admin/manage-bus");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please check your fleet data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 lg:p-12 text-slate-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> Back to Fleet
          </button>
          <div className="text-right">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
              Register <span className="text-emerald-500">New Unit</span>
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">SuvYatra Fleet Management</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: IMAGE UPLOAD SECTION */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative group aspect-4/5 bg-slate-900 border-2 border-dashed border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center transition-all hover:border-emerald-500/50">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-slate-600 group-hover:text-emerald-500 transition-colors">
                  <Upload size={48} strokeWidth={1.5} className="mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Upload Bus Image</p>
                </div>
              )}
              <input
                {...register("image")}
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                required
              />
              <div className="absolute bottom-4 inset-x-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-white/5 text-center">
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                   {preview ? "Click to change photo" : "High quality recommended"}
                 </p>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-4xl">
              <div className="flex items-center gap-3 text-emerald-500 mb-2">
                <CheckCircle size={18} />
                <h3 className="text-xs font-black uppercase tracking-widest">Auto-Verify</h3>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                New units are automatically set to 'active' and listed in the global search engine unless specified otherwise.
              </p>
            </div>
          </div>

          {/* RIGHT: FORM FIELDS */}
          <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Bus Details */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Vehicle Identity</h3>
                
                <div className="relative">
                  <Bus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input
                    {...register("name")}
                    placeholder="Bus Name (e.g., Swift Holiday)"
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-700"
                    required
                  />
                </div>

                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input
                    {...register("busNumber")}
                    placeholder="Plate Number (e.g., BA-01-1234)"
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all placeholder:text-slate-700"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Wind className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                    <select
                      {...register("busType")}
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold appearance-none focus:border-emerald-500 outline-none"
                      required
                    >
                      <option value="AC">Deluxe AC</option>
                      <option value="Non-AC">Standard</option>
                      <option value="Sleeper">Sleeper</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                    <input
                      {...register("totalSeats")}
                      type="number"
                      placeholder="Seats"
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Personnel Details */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Operations</h3>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input
                    {...register("driverName")}
                    placeholder="Assigned Driver"
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Driver's Mobile"
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:border-emerald-500 outline-none"
                    required
                  />
                </div>

                <div className="relative">
                   <select
                    {...register("isActive")}
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold appearance-none focus:border-emerald-500 outline-none"
                    required
                  >
                    <option value="active">Operational</option>
                    <option value="inactive">Under Maintenance</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-10 bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-emerald-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                "Commit Unit to Fleet"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBus;