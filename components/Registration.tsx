"use client";

import { 
  CreditCard, Send, CheckCircle, User, Phone, MapPin, Building, Hash, 
  Mail, MessageCircle, Wallet, ClipboardCheck, GraduationCap, Map
} from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import BdAddress from "@/utilities/bdAddress/bdAddress";

type RegistrationFormInputs = {
  fullName: string;
  gender: string;
  phone: string;
  whatsapp: string;
  email: string;
  division: string;
  district: string;
  upazila: string;
  currentAddress: string;
  identity: string;
  institution: string;
  paymentMethod: string;
  senderNumber: string;
  transactionId: string;
  agreeInfoCorrect: boolean;
  agreeRules: boolean;
  agreeCancelation: boolean;
};

// Reusable Section Wrapper
const FormSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
    <div className="bg-[#0f5b3a] text-white px-5 py-3 flex items-center gap-3">
      {icon}
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
    <div className="p-5">
      {children}
    </div>
  </div>
);

export default function Registration() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<RegistrationFormInputs>();

  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  const divisions = BdAddress.divisions("bn");
  const districts = selectedDivision ? BdAddress.districts(selectedDivision, "bn") : [];
  const upazilas = selectedDistrict ? BdAddress.upazilas(selectedDistrict, "bn") : [];

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (data) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Form Data:", data);
      setIsSubmitted(true);
      setIsSubmitting(false);
      reset();
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div id="register" className="bg-[#f4f9f6] py-16 px-6 border-t border-green-100 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-green-200 text-center max-w-2xl w-full">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-3xl font-black text-gray-800 mb-4">রেজিস্ট্রেশন সফল হয়েছে!</h3>
          <p className="text-gray-600 text-lg mb-8">আমরা আপনার পেমেন্ট যাচাই করে কনফার্মেশন মেসেজ পাঠাবো। অলিম্পিয়াডের প্রস্তুতির জন্য শুভকামনা!</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-3 bg-[#0f5b3a] text-white font-bold rounded-xl hover:bg-green-800 transition-colors shadow-md"
          >
            নতুন রেজিস্ট্রেশন করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="register" className="bg-[#f4f9f6] py-6 md:py-8 px-4 sm:px-6 border-t border-green-100">
      <div className="max-w-6xl mx-auto">
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
            
            {/* Left Column */}
            <div className="flex-1 w-full">
              
              {/* Section 1: Personal Info */}
              <FormSection title="১. ব্যক্তিগত তথ্য" icon={<User className="w-6 h-6" />}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">পূর্ণ নাম <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        {...register("fullName", { required: "পূর্ণ নাম লিখুন" })} 
                        type="text" 
                        placeholder="আপনার পূর্ণ নাম লিখুন" 
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 ${errors.fullName ? 'border-red-400' : 'border-gray-300'}`} 
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">লিঙ্গ <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-6 items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="male" {...register("gender", { required: "লিঙ্গ সিলেক্ট করুন" })} className="w-4 h-4 text-[#0f5b3a] focus:ring-[#0f5b3a]" />
                        <span className="text-gray-700">পুরুষ</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="female" {...register("gender", { required: "লিঙ্গ সিলেক্ট করুন" })} className="w-4 h-4 text-[#0f5b3a] focus:ring-[#0f5b3a]" />
                        <span className="text-gray-700">নারী</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="other" {...register("gender", { required: "লিঙ্গ সিলেক্ট করুন" })} className="w-4 h-4 text-[#0f5b3a] focus:ring-[#0f5b3a]" />
                        <span className="text-gray-700">অন্যান্য</span>
                      </label>
                    </div>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">Phone Number <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                          {...register("phone", { required: "ফোন নম্বর লিখুন" })} 
                          type="tel" 
                          placeholder="01XXXXXXXXX" 
                          className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 ${errors.phone ? 'border-red-400' : 'border-gray-300'}`} 
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">WhatsApp Number <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MessageCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <input 
                          {...register("whatsapp", { required: "WhatsApp নম্বর লিখুন" })} 
                          type="tel" 
                          placeholder="01XXXXXXXXX" 
                          className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 ${errors.whatsapp ? 'border-red-400' : 'border-gray-300'}`} 
                        />
                      </div>
                      {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        {...register("email", { pattern: { value: /\S+@\S+\.\S+/, message: "সঠিক ইমেইল দিন" } })} 
                        type="email" 
                        placeholder="example@mail.com" 
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 ${errors.email ? 'border-red-400' : 'border-gray-300'}`} 
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
              </FormSection>

              {/* Section 2: Address */}
              <FormSection title="২. ঠিকানা" icon={<User className="w-6 h-6" />}>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">বিভাগ <span className="text-red-500">*</span></label>
                      <select 
                        {...register("division", { 
                          required: "বিভাগ সিলেক্ট করুন",
                          onChange: (e) => {
                            setValue("district", "");
                            setValue("upazila", "");
                          }
                        })} 
                        defaultValue="" 
                        className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 ${errors.division ? 'border-red-400' : 'border-gray-300'}`}
                      >
                        <option value="" disabled>বিভাগ সিলেক্ট করুন</option>
                        {divisions.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                      {errors.division && <p className="text-red-500 text-xs mt-1">{errors.division.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">জেলা <span className="text-red-500">*</span></label>
                      <select 
                        {...register("district", { 
                          required: "জেলা সিলেক্ট করুন",
                          onChange: (e) => {
                            setValue("upazila", "");
                          }
                        })} 
                        defaultValue="" 
                        disabled={!selectedDivision}
                        className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 disabled:bg-gray-50 disabled:text-gray-400 ${errors.district ? 'border-red-400' : 'border-gray-300'}`}
                      >
                        <option value="" disabled>জেলা সিলেক্ট করুন</option>
                        {districts.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                      {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">উপজেলা / থানা <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Map className="h-5 w-5 text-gray-400" />
                      </div>
                      <select 
                        {...register("upazila", { required: "উপজেলা / থানা সিলেক্ট করুন" })} 
                        defaultValue="" 
                        disabled={!selectedDistrict}
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 disabled:bg-gray-50 disabled:text-gray-400 ${errors.upazila ? 'border-red-400' : 'border-gray-300'}`}
                      >
                        <option value="" disabled>উপজেলা / থানা সিলেক্ট করুন</option>
                        {upazilas.map((u) => (
                          <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                      </select>
                    </div>
                    {errors.upazila && <p className="text-red-500 text-xs mt-1">{errors.upazila.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">ঠিকানা <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        {...register("currentAddress", { required: "ঠিকানা লিখুন" })} 
                        type="text" 
                        placeholder="গ্রাম/এলাকা/বাসা নম্বর/রাস্তা..." 
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 ${errors.currentAddress ? 'border-red-400' : 'border-gray-300'}`} 
                      />
                    </div>
                    {errors.currentAddress && <p className="text-red-500 text-xs mt-1">{errors.currentAddress.message}</p>}
                  </div>
                </div>
              </FormSection>

              {/* Section 3: Education */}
              <FormSection title="৩. শিক্ষা / পেশাগত পরিচয়" icon={<GraduationCap className="w-6 h-6" />}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">আপনার পরিচয় <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="6-10" {...register("identity", { required: "পরিচয় সিলেক্ট করুন" })} className="w-4 h-4 text-[#0f5b3a] focus:ring-[#0f5b3a]" />
                        <span className="text-gray-700">ষষ্ঠ-দশম শ্রেণি</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="11-12" {...register("identity", { required: "পরিচয় সিলেক্ট করুন" })} className="w-4 h-4 text-[#0f5b3a] focus:ring-[#0f5b3a]" />
                        <span className="text-gray-700">একাদশ - দ্বাদশ শ্রেণি</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="university" {...register("identity", { required: "পরিচয় সিলেক্ট করুন" })} className="w-4 h-4 text-[#0f5b3a] focus:ring-[#0f5b3a]" />
                        <span className="text-gray-700">ডিগ্রি / ফাজিল / অনার্স / কামিল / মাস্টার্স</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="other" {...register("identity", { required: "পরিচয় সিলেক্ট করুন" })} className="w-4 h-4 text-[#0f5b3a] focus:ring-[#0f5b3a]" />
                        <span className="text-gray-700">অন্যান্য</span>
                      </label>
                    </div>
                    {errors.identity && <p className="text-red-500 text-xs mt-1">{errors.identity.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">শিক্ষাপ্রতিষ্ঠান / পেশার নাম <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        {...register("institution", { required: "শিক্ষাপ্রতিষ্ঠান / পেশার নাম লিখুন" })} 
                        type="text" 
                        placeholder="শিক্ষাপ্রতিষ্ঠান / পেশার নাম লিখুন" 
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 ${errors.institution ? 'border-red-400' : 'border-gray-300'}`} 
                      />
                    </div>
                    {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution.message}</p>}
                  </div>
                </div>
              </FormSection>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[450px]">
              
              {/* Fee Card */}
              <div className="bg-[#f0f9f4] rounded-xl overflow-hidden mb-6 border border-green-200">
                <div className="bg-[#0f5b3a] text-white px-5 py-3 flex items-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  <h3 className="font-bold text-lg">রেজিস্ট্রেশন ফি</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="bg-red-600 text-white text-5xl font-black py-4 px-8 rounded-lg inline-block mb-4 transform -skew-x-6">
                    <span className="skew-x-6 block">৳১০০</span>
                  </div>
                  <p className="font-bold text-gray-800 mb-4">bKash/Nagad-এ ৳১০০ Send Money করুন।</p>
                  
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1 bg-pink-600 text-white rounded-lg p-3 relative overflow-hidden group">
                      <div className="font-bold text-xl drop-shadow-sm mb-1">bKash</div>
                      <div className="font-bold text-sm tracking-wide">+880 1521-726231</div>
                    </div>
                    <div className="flex-1 bg-orange-600 text-white rounded-lg p-3 relative overflow-hidden group">
                      <div className="font-bold text-xl drop-shadow-sm mb-1">নগদ</div>
                      <div className="font-bold text-sm tracking-wide">+880 1616-125201</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-[#0f5b3a] font-medium flex items-center justify-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">i</span>
                    পেমেন্ট করার পর Transaction ID প্রদান করুন।
                  </p>
                </div>
              </div>

              {/* Payment Verification */}
              <FormSection title="আপনি কোন মাধ্যমে পেমেন্ট করেছেন?" icon={<Wallet className="w-6 h-6" />}>
                <div className="space-y-5">
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="bkash" {...register("paymentMethod", { required: "পেমেন্ট মাধ্যম সিলেক্ট করুন" })} className="w-4 h-4 text-[#0f5b3a] focus:ring-[#0f5b3a]" />
                      <span className="text-gray-700 font-medium">bKash</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="nagad" {...register("paymentMethod", { required: "পেমেন্ট মাধ্যম সিলেক্ট করুন" })} className="w-4 h-4 text-[#0f5b3a] focus:ring-[#0f5b3a]" />
                      <span className="text-gray-700 font-medium">Nagad</span>
                    </label>
                  </div>
                  {errors.paymentMethod && <p className="text-red-500 text-xs mt-[-10px]">{errors.paymentMethod.message}</p>}

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">যে মোবাইল নম্বর থেকে টাকা পাঠিয়েছেন <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        {...register("senderNumber", { required: "সেন্ডার নম্বর লিখুন" })} 
                        type="tel" 
                        placeholder="01XXXXXXXXX" 
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 ${errors.senderNumber ? 'border-red-400' : 'border-gray-300'}`} 
                      />
                    </div>
                    {errors.senderNumber && <p className="text-red-500 text-xs mt-1">{errors.senderNumber.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Transaction ID (ঐচ্ছিক)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Hash className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        {...register("transactionId")} 
                        type="text" 
                        placeholder="Transaction ID লিখুন" 
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 font-mono uppercase border-gray-300`} 
                      />
                    </div>
                  </div>
                </div>
              </FormSection>

              {/* Terms and Conditions */}
              <div className="bg-[#fcf8e8] rounded-xl overflow-hidden mb-6 border border-yellow-200">
                <div className="px-5 py-3 flex items-center gap-3 border-b border-yellow-200 bg-[#f7eed1]">
                  <ClipboardCheck className="w-5 h-5 text-yellow-800" />
                  <h3 className="font-bold text-lg text-yellow-900">শর্তাবলি</h3>
                </div>
                <div className="p-5 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" {...register("agreeInfoCorrect", { required: true })} className="mt-1 w-4 h-4 text-[#0f5b3a] rounded border-gray-300 focus:ring-[#0f5b3a]" />
                    <span className={`text-sm ${errors.agreeInfoCorrect ? 'text-red-500 font-bold' : 'text-gray-700'}`}>আমি নিশ্চিত করছি যে প্রদত্ত তথ্য সঠিক।</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" {...register("agreeRules", { required: true })} className="mt-1 w-4 h-4 text-[#0f5b3a] rounded border-gray-300 focus:ring-[#0f5b3a]" />
                    <span className={`text-sm ${errors.agreeRules ? 'text-red-500 font-bold' : 'text-gray-700'}`}>আমি প্রতিযোগিতার সকল নিয়ম মেনে চলব।</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" {...register("agreeCancelation", { required: true })} className="mt-1 w-4 h-4 text-[#0f5b3a] rounded border-gray-300 focus:ring-[#0f5b3a]" />
                    <span className={`text-sm ${errors.agreeCancelation ? 'text-red-500 font-bold' : 'text-gray-700'}`}>ভুল তথ্য দিয়ে রেজিস্ট্রেশন করলে কর্তৃপক্ষ রেজিস্ট্রেশন বাতিল করতে পারবে।</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Notice */}
          <div className="bg-[#e8f5e9] border border-green-200 rounded-xl p-4 flex items-start gap-4">
            <div className="bg-green-100 p-2 rounded-full shrink-0">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-green-900 mb-1">গুরুত্বপূর্ণ আপডেট</h4>
              <p className="text-green-800 text-sm md:text-base leading-relaxed">
                রেজিস্ট্রেশন শেষে আপনাকে WhatsApp গ্রুপে যুক্ত করা হবে এবং সেখানেই পরীক্ষাসহ গুরুত্বপূর্ণ সব আপডেট দেওয়া হবে।
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-2 bg-[#0f5b3a] hover:bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all flex items-center justify-center gap-2 text-xl disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="animate-pulse">প্রসেসিং হচ্ছে...</span>
            ) : (
              <>
                <Send className="w-6 h-6" />
                রেজিস্ট্রেশন সম্পন্ন করুন &rarr;
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
