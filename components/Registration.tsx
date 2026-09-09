"use client";

import {
  CreditCard, Send, User, Phone, MapPin, Building, Hash,
  Mail, MessageCircle, Wallet, ClipboardCheck, GraduationCap, Map, CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import BdAddress from "@/utilities/bdAddress/bdAddress";
import eventHandler from "@/tracking/eventHandler";
import { generateEventId } from "@/tracking/event.helpers";

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
  occupation: string;
  institution: string;
  paymentMethod: string;
  senderNumber: string;
  transactionId: string;
  agreeAll: boolean;
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

// Reusable inline field error
const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <div className="flex items-center gap-1.5 mt-1.5 text-red-600">
      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
      <p className="text-xs font-medium">{message}</p>
    </div>
  ) : null;

export default function Registration() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasFiredLead, setHasFiredLead] = useState(false);

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
  const selectedOccupation = watch("occupation");

  const divisions = BdAddress.divisions("bn");
  const districts = selectedDivision ? BdAddress.districts(selectedDivision, "bn") : [];
  const upazilas = selectedDistrict ? BdAddress.upazilas(selectedDistrict, "bn") : [];

  const checkAndFireLead = () => {
    if (hasFiredLead) return;
    const { fullName, gender, phone, whatsapp, email } = watch();
    if (fullName && gender && phone && whatsapp && phone.length >= 11) {
      setHasFiredLead(true);
      const eventId = generateEventId("lead");
      eventHandler({
        event_name: "lead",
        content_name: "জাতীয় মিলাদুন্নবী অলিম্পিয়াড ২০২৬",
        event_id: eventId,
        fullName,
        ge: gender,
        ph: phone,
        em: email,
      });
    }
  };

  const institutionLabel =
    selectedOccupation === "student" ? "শিক্ষাপ্রতিষ্ঠানের নাম" :
      selectedOccupation === "job" ? "প্রতিষ্ঠান / কর্মক্ষেত্রের নাম" :
        selectedOccupation === "business" ? "ব্যবসা প্রতিষ্ঠানের নাম / ধরন" :
          selectedOccupation === "housewife" ? "ঠিকানা (ঐচ্ছিক)" :
            selectedOccupation === "farmer" ? "জমির এলাকা / কৃষি ধরন (ঐচ্ছিক)" :
              "শিক্ষাপ্রতিষ্ঠান / পেশার বিবরণ";

  const institutionPlaceholder =
    selectedOccupation === "student" ? "যেমন: ঢাকা বিশ্ববিদ্যালয়, রাজশাহী কলেজ..." :
      selectedOccupation === "job" ? "যেমন: বাংলাদেশ ব্যাংক, সরকারি প্রাথমিক বিদ্যালয়..." :
        selectedOccupation === "business" ? "যেমন: কাপড়ের দোকান, মুদি ব্যবসা..." :
          selectedOccupation === "housewife" ? "(পূরণ না করলেও চলবে)" :
            selectedOccupation === "farmer" ? "যেমন: ধান চাষ, সবজি চাষ..." :
              "শিক্ষাপ্রতিষ্ঠান / পেশার নাম লিখুন";

  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Generate a unique event ID for Meta Pixel/CAPI deduplication
    const eventId = generateEventId("reg");

    // Resolve IDs → Bangla names so Google Sheets receives readable text
    const payload = {
      ...data,
      eventId, // Added for CAPI
      division: BdAddress.divisionNameById(data.division, "bn").name,
      district: BdAddress.districtNameById(data.district, "bn").name,
      upazila: BdAddress.upazilaNameById(data.upazila, "bn").name,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        // Fire GTM event for registration using centralized handler
        eventHandler({
          event_name: "complete_registration",
          content_name: "জাতীয় মিলাদুন্নবী অলিম্পিয়াড ২০২৬",
          currency: "BDT",
          value: 100.00,
          event_id: eventId,
          fullName: data.fullName,
          ge: data.gender,
          ph: data.phone,
          em: data.email,
          upazila_id: data.upazila
        });

        reset();
        router.push("/success");
      } else {
        setSubmitError("রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch {
      setSubmitError("নেটওয়ার্ক সমস্যা। ইন্টারনেট সংযোগ যাচাই করে আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="register" className="bg-[#f4f9f6] py-6 md:py-8 px-4 sm:px-6 border-t border-green-100">
      <div className="max-w-6xl mx-auto">

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">

            {/* Left Column */}
            <div className="flex-1 w-full">

              {/* Section 1: Personal Info */}
              <FormSection title="১. ব্যক্তিগত তথ্য" icon={<User className="w-6 h-6" />}>
                <div className="space-y-5" onBlur={checkAndFireLead}>
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
                    <FieldError message={errors.fullName?.message} />
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
                    <FieldError message={errors.gender?.message} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">Mobile Number <span className="text-red-500">*</span></label>
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
                      <FieldError message={errors.phone?.message} />
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
                      <FieldError message={errors.whatsapp?.message} />
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
                    <FieldError message={errors.email?.message} />
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
                      <FieldError message={errors.division?.message} />
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
                      <FieldError message={errors.district?.message} />
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
                    <FieldError message={errors.upazila?.message} />
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
                    <FieldError message={errors.currentAddress?.message} />
                  </div>
                </div>
              </FormSection>

              {/* Section 3: Education & Occupation */}
              <FormSection title="৩. শিক্ষা ও পেশা" icon={<GraduationCap className="w-6 h-6" />}>
                <div className="space-y-5">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        শিক্ষাগত/পেশাগত পরিচয় <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("identity", { required: "আপনার পরিচয় নির্বাচন করুন" })}
                        defaultValue=""
                        className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 ${errors.identity ? "border-red-400" : "border-gray-300"}`}
                      >
                        <option value="" disabled>আপনার পরিচয় নির্বাচন করুন—</option>
                        <option value="group1">ষষ্ঠ–দশম / শহরে বেকায়া / সমমান পর্যন্ত</option>
                        <option value="group2">একাদশ–দ্বাদশ / আলিম / হেদায়া সমমান পর্যন্ত</option>
                        <option value="group3">ডিগ্রি / ফাজিল / অনার্স / কামিল / মাস্টার্স / দাওরায়ে হাদিস সমমান পর্যন্ত</option>
                        <option value="group4">যেকোনো পেশাজীবী / অন্যান্য</option>
                      </select>
                      <FieldError message={errors.identity?.message} />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        পেশা <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("occupation", { required: "পেশা সিলেক্ট করুন" })}
                        defaultValue=""
                        className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 ${errors.occupation ? "border-red-400" : "border-gray-300"}`}
                      >
                        <option value="" disabled>বেছে নিন</option>
                        <option value="student">ছাত্র / ছাত্রী</option>
                        <option value="job">চাকরিজীবী</option>
                        <option value="business">ব্যবসায়ী</option>
                        <option value="housewife">গৃহিণী</option>
                        <option value="farmer">কৃষক</option>
                        <option value="other_occ">অন্যান্য</option>
                      </select>
                      <FieldError message={errors.occupation?.message} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      {institutionLabel}
                      {selectedOccupation !== "housewife" && selectedOccupation !== "farmer" && (
                        <span className="text-red-500"> *</span>
                      )}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register("institution", {
                          required:
                            selectedOccupation === "housewife" || selectedOccupation === "farmer"
                              ? false
                              : "এই তথ্যটি দেওয়া আবশ্যক",
                        })}
                        type="text"
                        placeholder={institutionPlaceholder}
                        className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5b3a]/50 focus:border-[#0f5b3a] transition-all text-gray-800 ${errors.institution ? "border-red-400" : "border-gray-300"
                          }`}
                      />
                    </div>
                    <FieldError message={errors.institution?.message} />
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
                  <FieldError message={errors.paymentMethod?.message} />

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
                    <FieldError message={errors.senderNumber?.message} />
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
                <div className="p-5">
                  <div className="space-y-4 mb-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm">আমি নিশ্চিত করছি যে প্রদত্ত তথ্য সঠিক।</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm">আমি প্রতিযোগিতার সকল নিয়ম মেনে চলব।</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm">ভুল তথ্য বা একাধিক রেজিস্ট্রেশনের ক্ষেত্রে আয়োজক কর্তৃপক্ষ রেজিস্ট্রেশন বাতিল করতে পারবে।</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-yellow-200">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" {...register("agreeAll", { required: "শর্তাবলিতে সম্মতি প্রদান করুন" })} className="mt-1 w-4 h-4 text-[#0f5b3a] rounded border-gray-300 focus:ring-[#0f5b3a]" />
                      <span className="text-sm font-bold text-gray-800">আমি উপরোক্ত শর্তাবলি পড়েছি এবং একমত পোষণ করছি।</span>
                    </label>
                    <FieldError message={errors.agreeAll?.message} />
                  </div>
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

          {/* Error Message */}
          {submitError && (
            <div className="bg-red-50 border border-red-300 text-red-700 rounded-xl px-5 py-4 text-sm font-medium flex items-center gap-3">
              <span className="text-red-500 text-lg">⚠️</span>
              {submitError}
            </div>
          )}

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
