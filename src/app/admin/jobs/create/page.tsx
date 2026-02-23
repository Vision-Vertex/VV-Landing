// 'use client';

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Briefcase, 
//   MapPin, 
//   DollarSign, 
//   Layers, 
//   Clock, 
//   Save, 
//   X, 
//   Plus,
//   CheckCircle2,
//   AlertCircle
// } from 'lucide-react';

// interface JobFormData {
//   title: string;
//   description: string;
//   employment_type: string;
//   experience_level: string;
//   framework: string;
//   location: string;
//   remote: boolean;
//   required_skills: string[];
//   requirements: string;
//   salary_currency: string;
//   salary_min: number;
//   salary_max: number;
//   status: string;
// }

// const initialFormData: JobFormData = {
//   title: '',
//   description: '',
//   employment_type: '',
//   experience_level: '',
//   framework: '',
//   location: '',
//   remote: false,
//   required_skills: [],
//   requirements: '',
//   salary_currency: 'USD',
//   salary_min: 0,
//   salary_max: 0,
//   status: 'draft',
// };

// const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
// const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Executive'];
// const frameworks = ['React', 'Next.js', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', '.NET', 'Other'];
// const currencies = ['USD', 'EUR', 'GBP', 'ETB', 'CAD', 'AUD'];
// const statuses = ['draft', 'active', 'closed'];

// export default function CreateJobPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState<JobFormData>(initialFormData);
//   const [skillInput, setSkillInput] = useState('');
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, type } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'number' ? parseFloat(value) || 0 : value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleSwitchChange = (checked: boolean) => {
//     setFormData((prev) => ({ ...prev, remote: checked }));
//   };

//   const addSkill = () => {
//     if (skillInput.trim() && !formData.required_skills.includes(skillInput.trim())) {
//       setFormData((prev) => ({
//         ...prev,
//         required_skills: [...prev.required_skills, skillInput.trim()],
//       }));
//       setSkillInput('');
//     }
//   };

//   const removeSkill = (skillToRemove: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       required_skills: prev.required_skills.filter((skill) => skill !== skillToRemove),
//     }));
//   };

//   const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       addSkill();
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.title.trim()) newErrors.title = 'Job title is required';
//     if (!formData.description.trim()) newErrors.description = 'Job description is required';
//     if (!formData.employment_type) newErrors.employment_type = 'Employment type is required';
//     if (!formData.experience_level) newErrors.experience_level = 'Experience level is required';
//     if (!formData.location.trim()) newErrors.location = 'Location is required';
//     if (formData.salary_min < 0) newErrors.salary_min = 'Minimum salary must be positive';
//     if (formData.salary_max < formData.salary_min) 
//       newErrors.salary_max = 'Maximum salary must be greater than minimum';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const payload = {
//         ...formData,
//         required_skills: formData.required_skills.join(', '),
//       };

//       const response = await fetch('/api/admin/jobs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         setSubmitSuccess(true);
//         setTimeout(() => {
//           router.push('/admin/jobs');
//         }, 2000);
//       } else {
//         throw new Error('Failed to create job');
//       }
//     } catch (error) {
//       setErrors((prev) => ({
//         ...prev,
//         submit: 'Failed to create job. Please try again.',
//       }));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Reusable input classes for better visibility
//   const inputClasses = "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200";
//   const textareaClasses = "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 resize-none";
//   const labelClasses = "text-gray-800 font-semibold mb-2 block text-sm";
//   const errorClasses = "text-red-500 text-sm mt-1 flex items-center gap-1";
//   const selectTriggerClasses = "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200";

//   return (
//     <div className="relative min-h-screen bg-gray-50">
      
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
//       </div>

//       <div className="relative z-10 px-6 md:px-16 py-10">
//         {/* Header Section */}
//         <motion.div
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             whileInView={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
//           >
//             <Briefcase size={16} />
//             Create New Position
//           </motion.div>
          
//           <motion.h1
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
//           >
//             Post a{' '}
//             <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//               New Job
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="text-gray-600 max-w-2xl mx-auto"
//           >
//             Fill in the details below to create a new job posting. All fields marked with * are required.
//           </motion.p>
//         </motion.div>

//         {/* Success Message */}
//         {submitSuccess && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8 p-4 bg-green-50 border-2 border-green-300 rounded-xl flex items-center gap-3"
//           >
//             <CheckCircle2 className="text-green-600" size={20} />
//             <span className="text-green-800 font-medium">
//               Job created successfully! Redirecting to jobs list...
//             </span>
//           </motion.div>
//         )}

//         {/* Submit Error */}
//         {errors.submit && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8 p-4 bg-red-50 border-2 border-red-300 rounded-xl flex items-center gap-3"
//           >
//             <AlertCircle className="text-red-600" size={20} />
//             <span className="text-red-800 font-medium">{errors.submit}</span>
//           </motion.div>
//         )}

//         {/* Form Section */}
//         <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-20">
//           {/* Basic Information */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
//           >
//             <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
//                 <Briefcase className="text-primary" size={20} />
//               </div>
//               <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
//             </div>

//             <div className="space-y-6">
//               {/* Job Title */}
//               <div>
//                 <Label htmlFor="title" className={labelClasses}>
//                   Job Title *
//                 </Label>
//                 <Input
//                   id="title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Senior Full-Stack Developer"
//                   className={cn(inputClasses, errors.title && 'border-red-500 focus:border-red-500 focus:ring-red-100')}
//                 />
//                 {errors.title && (
//                   <p className={errorClasses}>
//                     <AlertCircle size={14} /> {errors.title}
//                   </p>
//                 )}
//               </div>

//               {/* Job Description */}
//               <div>
//                 <Label htmlFor="description" className={labelClasses}>
//                   Job Description *
//                 </Label>
//                 <Textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Describe the role, responsibilities, and company culture..."
//                   rows={6}
//                   className={cn(textareaClasses, errors.description && 'border-red-500 focus:border-red-500 focus:ring-red-100')}
//                 />
//                 {errors.description && (
//                   <p className={errorClasses}>
//                     <AlertCircle size={14} /> {errors.description}
//                   </p>
//                 )}
//               </div>

//               {/* Requirements */}
//               <div>
//                 <Label htmlFor="requirements" className={labelClasses}>
//                   Requirements *
//                 </Label>
//                 <Textarea
//                   id="requirements"
//                   name="requirements"
//                   value={formData.requirements}
//                   onChange={handleInputChange}
//                   placeholder="List the qualifications, skills, and experience required..."
//                   rows={5}
//                   className={textareaClasses}
//                 />
//               </div>
//             </div>
//           </motion.div>

//           {/* Job Details */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
//           >
//             <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
//                 <Layers className="text-primary" size={20} />
//               </div>
//               <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Employment Type */}
//               <div>
//                 <Label htmlFor="employment_type" className={labelClasses}>
//                   Employment Type *
//                 </Label>
//                 <Select
//                   value={formData.employment_type}
//                   onValueChange={(value) => handleSelectChange('employment_type', value)}
//                 >
//                   <SelectTrigger className={cn(selectTriggerClasses, errors.employment_type && 'border-red-500 focus:border-red-500')}>
//                     <SelectValue placeholder="Select employment type" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white border-2 border-gray-200">
//                     {employmentTypes.map((type) => (
//                       <SelectItem key={type} value={type} className="text-gray-900 focus:bg-primary/10 focus:text-primary">
//                         {type}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {errors.employment_type && (
//                   <p className={errorClasses}>
//                     <AlertCircle size={14} /> {errors.employment_type}
//                   </p>
//                 )}
//               </div>

//               {/* Experience Level */}
//               <div>
//                 <Label htmlFor="experience_level" className={labelClasses}>
//                   Experience Level *
//                 </Label>
//                 <Select
//                   value={formData.experience_level}
//                   onValueChange={(value) => handleSelectChange('experience_level', value)}
//                 >
//                   <SelectTrigger className={cn(selectTriggerClasses, errors.experience_level && 'border-red-500 focus:border-red-500')}>
//                     <SelectValue placeholder="Select experience level" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white border-2 border-gray-200">
//                     {experienceLevels.map((level) => (
//                       <SelectItem key={level} value={level} className="text-gray-900 focus:bg-primary/10 focus:text-primary">
//                         {level}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {errors.experience_level && (
//                   <p className={errorClasses}>
//                     <AlertCircle size={14} /> {errors.experience_level}
//                   </p>
//                 )}
//               </div>

//               {/* Framework */}
//               <div>
//                 <Label htmlFor="framework" className={labelClasses}>
//                   Primary Framework
//                 </Label>
//                 <Select
//                   value={formData.framework}
//                   onValueChange={(value) => handleSelectChange('framework', value)}
//                 >
//                   <SelectTrigger className={selectTriggerClasses}>
//                     <SelectValue placeholder="Select framework" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white border-2 border-gray-200">
//                     {frameworks.map((fw) => (
//                       <SelectItem key={fw} value={fw} className="text-gray-900 focus:bg-primary/10 focus:text-primary">
//                         {fw}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Location */}
//               <div>
//                 <Label htmlFor="location" className={labelClasses}>
//                   Location *
//                 </Label>
//                 <div className="relative">
//                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//                   <Input
//                     id="location"
//                     name="location"
//                     value={formData.location}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Addis Ababa, Ethiopia"
//                     className={cn(inputClasses, 'pl-12', errors.location && 'border-red-500 focus:border-red-500 focus:ring-red-100')}
//                   />
//                 </div>
//                 {errors.location && (
//                   <p className={errorClasses}>
//                     <AlertCircle size={14} /> {errors.location}
//                   </p>
//                 )}
//               </div>

//               {/* Remote Toggle */}
//               <div className="md:col-span-2">
//                 <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border-2 border-gray-200">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                       <MapPin className="text-primary" size={20} />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-900">Remote Position</p>
//                       <p className="text-sm text-gray-600">Allow candidates to work remotely</p>
//                     </div>
//                   </div>
//                   <Switch
//                     checked={formData.remote}
//                     onCheckedChange={handleSwitchChange}
//                     className="data-[state=checked]:bg-primary"
//                   />
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Skills & Compensation */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
//           >
//             <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
//                 <DollarSign className="text-primary" size={20} />
//               </div>
//               <h2 className="text-xl font-bold text-gray-900">Skills & Compensation</h2>
//             </div>

//             <div className="space-y-6">
//               {/* Required Skills */}
//               <div>
//                 <Label className={labelClasses}>
//                   Required Skills
//                 </Label>
//                 <div className="flex gap-2 mb-3">
//                   <Input
//                     value={skillInput}
//                     onChange={(e) => setSkillInput(e.target.value)}
//                     onKeyDown={handleSkillKeyDown}
//                     placeholder="Add a skill and press Enter"
//                     className={inputClasses}
//                   />
//                   <Button
//                     type="button"
//                     onClick={addSkill}
//                     variant="outline"
//                     className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-4"
//                   >
//                     <Plus size={18} />
//                   </Button>
//                 </div>
//                 {formData.required_skills.length > 0 && (
//                   <div className="flex flex-wrap gap-2">
//                     {formData.required_skills.map((skill, index) => (
//                       <Badge
//                         key={index}
//                         variant="secondary"
//                         className="bg-primary/10 text-primary border-2 border-primary/20 px-3 py-1 text-sm flex items-center gap-2"
//                       >
//                         {skill}
//                         <button
//                           type="button"
//                           onClick={() => removeSkill(skill)}
//                           className="hover:text-red-500 transition-colors"
//                         >
//                           <X size={14} />
//                         </button>
//                       </Badge>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Salary Range */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Currency */}
//                 <div>
//                   <Label htmlFor="salary_currency" className={labelClasses}>
//                     Currency
//                   </Label>
//                   <Select
//                     value={formData.salary_currency}
//                     onValueChange={(value) => handleSelectChange('salary_currency', value)}
//                   >
//                     <SelectTrigger className={selectTriggerClasses}>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-white border-2 border-gray-200">
//                       {currencies.map((currency) => (
//                         <SelectItem key={currency} value={currency} className="text-gray-900 focus:bg-primary/10 focus:text-primary">
//                           {currency}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Min Salary */}
//                 <div>
//                   <Label htmlFor="salary_min" className={labelClasses}>
//                     Min Salary
//                   </Label>
//                   <div className="relative">
//                     <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//                     <Input
//                       id="salary_min"
//                       name="salary_min"
//                       type="number"
//                       value={formData.salary_min}
//                       onChange={handleInputChange}
//                       placeholder="0"
//                       className={cn(inputClasses, 'pl-12', errors.salary_min && 'border-red-500 focus:border-red-500 focus:ring-red-100')}
//                     />
//                   </div>
//                   {errors.salary_min && (
//                     <p className={errorClasses}>
//                       <AlertCircle size={14} /> {errors.salary_min}
//                     </p>
//                   )}
//                 </div>

//                 {/* Max Salary */}
//                 <div>
//                   <Label htmlFor="salary_max" className={labelClasses}>
//                     Max Salary
//                   </Label>
//                   <div className="relative">
//                     <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//                     <Input
//                       id="salary_max"
//                       name="salary_max"
//                       type="number"
//                       value={formData.salary_max}
//                       onChange={handleInputChange}
//                       placeholder="0"
//                       className={cn(inputClasses, 'pl-12', errors.salary_max && 'border-red-500 focus:border-red-500 focus:ring-red-100')}
//                     />
//                   </div>
//                   {errors.salary_max && (
//                     <p className={errorClasses}>
//                       <AlertCircle size={14} /> {errors.salary_max}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Job Status */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
//           >
//             <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
//                 <Clock className="text-primary" size={20} />
//               </div>
//               <h2 className="text-xl font-bold text-gray-900">Publication Status</h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {statuses.map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   onClick={() => handleSelectChange('status', status)}
//                   className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
//                     formData.status === status
//                       ? 'border-primary bg-primary/5 text-primary'
//                       : 'border-gray-300 hover:border-primary/50 text-gray-700 bg-gray-50'
//                   }`}
//                 >
//                   {formData.status === status && <CheckCircle2 size={18} />}
//                   <span className="font-medium capitalize">{status}</span>
//                 </button>
//               ))}
//             </div>
//             <p className="text-sm text-gray-600 mt-3">
//               <strong>Draft:</strong> Save for later | <strong>Active:</strong> Publish immediately | <strong>Closed:</strong> Stop accepting applications
//             </p>
//           </motion.div>

//           {/* Form Actions */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             viewport={{ once: true }}
//             className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
//           >
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => router.push('/admin/jobs')}
//               className="px-8 py-6 text-lg border-2 border-gray-300 hover:bg-gray-100 text-gray-700"
//             >
//               <X size={18} className="mr-2" />
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                   Creating...
//                 </>
//               ) : (
//                 <>
//                   <Save size={18} className="mr-2" />
//                   Create Job Posting
//                 </>
//               )}
//             </Button>
//           </motion.div>
//         </form>
//       </div>
//     </div>
//   );
// }

// // Helper function for classnames
// function cn(...classes: (string | boolean | undefined)[]) {
//   return classes.filter(Boolean).join(' ');
// }

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, MapPin, DollarSign, Layers, Clock, Save, X, Plus,
  CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';
import { useCreateJob } from '@/hooks/useCreateJobs';
import { 
  JobFormData, 
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  FRAMEWORKS,
  CURRENCIES,
  JOB_STATUSES,
  getSelectValues
} from '@/types/jobs';

// Use constants in your component:
const employmentTypes = getSelectValues(EMPLOYMENT_TYPES);
const experienceLevels = getSelectValues(EXPERIENCE_LEVELS);
const frameworks = getSelectValues(FRAMEWORKS);
const currencies = getSelectValues(CURRENCIES);
const statuses = getSelectValues(JOB_STATUSES);

const initialFormData: JobFormData = {
  title: '',
  description: '',
  employment_type: '',
  experience_level: '',
  framework: '',
  location: '',
  remote: false,
  required_skills: [],
  requirements: '',
  salary_currency: 'ETB', 
  salary_min: 0,
  salary_max: 0,
  status: 'draft',
};

// --- Main Component ---
export default function CreateJobPage() {
  const router = useRouter();
  const { mutate: createJob, isPending, error, reset } = useCreateJob();
  
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [skillInput, setSkillInput] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // --- Handlers (unchanged from your original) ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, remote: checked }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.required_skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        required_skills: [...prev.required_skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      required_skills: prev.required_skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.employment_type) newErrors.employment_type = 'Employment type is required';
    if (!formData.experience_level) newErrors.experience_level = 'Experience level is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    // Salary is optional, but if provided, validate it
    if (formData.salary_min && formData.salary_min < 0) newErrors.salary_min = 'Minimum salary must be positive';
    if (formData.salary_max && formData.salary_max < 0) newErrors.salary_max = 'Maximum salary must be positive';
    if (formData.salary_min && formData.salary_max && formData.salary_max < formData.salary_min) 
      newErrors.salary_max = 'Maximum salary must be greater than minimum';
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Submit Handler (using TanStack Query) ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    createJob(formData, {
      onSuccess: (data) => {
        // Toast notification is handled in the hook
        setTimeout(() => {
          router.push('/admin/jobs');
        }, 1500);
      },
      // Error toast is handled in the hook
    });
  };

  // --- Reusable Classes ---
  const inputClasses = "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200";
  const textareaClasses = "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 resize-none";
  const labelClasses = "text-gray-800 font-semibold mb-2 block text-sm";
  const errorClasses = "text-red-500 text-sm mt-1 flex items-center gap-1";
  const selectTriggerClasses = "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200";

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-10">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Briefcase size={16} />
            Create New Position
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Post a{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              New Job
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Fill in the details below to create a new job posting. All fields marked with * are required.
          </motion.p>
        </motion.div>

        {/* API Error from TanStack Query */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border-2 border-red-300 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <span className="text-red-800 font-medium block">Error</span>
              <span className="text-red-700 text-sm">{error.message}</span>
              <button onClick={reset} className="text-red-600 text-sm font-medium mt-2 hover:underline">
                Dismiss
              </button>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-20">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Briefcase className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label className={labelClasses}>Job Title *</Label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Full-Stack Developer"
                  className={cn(inputClasses, formErrors.title && 'border-red-500')}
                  disabled={isPending}
                />
                {formErrors.title && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.title}</p>}
              </div>

              <div>
                <Label className={labelClasses}>Job Description *</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the role..."
                  rows={6}
                  className={cn(textareaClasses, formErrors.description && 'border-red-500')}
                  disabled={isPending}
                />
                {formErrors.description && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.description}</p>}
              </div>

              <div>
                <Label className={labelClasses}>Requirements *</Label>
                <Textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="List qualifications..."
                  rows={5}
                  className={textareaClasses}
                  disabled={isPending}
                />
              </div>
            </div>
          </motion.div>

          {/* Job Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Layers className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className={labelClasses}>Employment Type *</Label>
                <Select value={formData.employment_type} onValueChange={(v) => handleSelectChange('employment_type', v)} disabled={isPending}>
                  <SelectTrigger className={cn(selectTriggerClasses, formErrors.employment_type && 'border-red-500')}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200">
                    {employmentTypes.map((t) => <SelectItem key={t} value={t} className="text-gray-900">{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                {formErrors.employment_type && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.employment_type}</p>}
              </div>

              <div>
                <Label className={labelClasses}>Experience Level *</Label>
                <Select value={formData.experience_level} onValueChange={(v) => handleSelectChange('experience_level', v)} disabled={isPending}>
                  <SelectTrigger className={cn(selectTriggerClasses, formErrors.experience_level && 'border-red-500')}>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200">
                    {experienceLevels.map((l) => <SelectItem key={l} value={l} className="text-gray-900">{l}</SelectItem>)}
                  </SelectContent>
                </Select>
                {formErrors.experience_level && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.experience_level}</p>}
              </div>

              <div>
                <Label className={labelClasses}>Primary Framework</Label>
                <Select value={formData.framework} onValueChange={(v) => handleSelectChange('framework', v)} disabled={isPending}>
                  <SelectTrigger className={selectTriggerClasses}>
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200">
                    {frameworks.map((f) => <SelectItem key={f} value={f} className="text-gray-900">{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className={labelClasses}>Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Addis Ababa, Ethiopia"
                    className={cn(inputClasses, 'pl-12', formErrors.location && 'border-red-500')}
                    disabled={isPending}
                  />
                </div>
                {formErrors.location && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.location}</p>}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Remote Position</p>
                      <p className="text-sm text-gray-600">Allow candidates to work remotely</p>
                    </div>
                  </div>
                  <Switch checked={formData.remote} onCheckedChange={handleSwitchChange} disabled={isPending} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills & Compensation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <DollarSign className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Skills & Compensation</h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label className={labelClasses}>Required Skills</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Add skill + Enter"
                    className={inputClasses}
                    disabled={isPending}
                  />
                  <Button type="button" onClick={addSkill} variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-4" disabled={isPending || !skillInput.trim()}>
                    <Plus size={18} />
                  </Button>
                </div>
                {formData.required_skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.required_skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-2 border-primary/20 px-3 py-1 text-sm flex items-center gap-2">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500" disabled={isPending}><X size={14}/></button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className={labelClasses}>Min Salary (Optional)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <Input name="salary_min" type="number" value={formData.salary_min || ''} onChange={handleInputChange} placeholder="0" className={cn(inputClasses, 'pl-12', formErrors.salary_min && 'border-red-500')} disabled={isPending} />
                  </div>
                  {formErrors.salary_min && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.salary_min}</p>}
                </div>
                <div>
                  <Label className={labelClasses}>Max Salary (Optional)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <Input name="salary_max" type="number" value={formData.salary_max || ''} onChange={handleInputChange} placeholder="0" className={cn(inputClasses, 'pl-12', formErrors.salary_max && 'border-red-500')} disabled={isPending} />
                  </div>
                  {formErrors.salary_max && <p className={errorClasses}><AlertCircle size={14}/> {formErrors.salary_max}</p>}
                </div>
              </div>
              <p className="text-sm text-gray-500">Salary is displayed in ETB. Leave blank if not applicable.</p>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Clock className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Publication Status</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statuses.map((status) => (
                <button key={status} type="button" onClick={() => handleSelectChange('status', status)} disabled={isPending}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${formData.status === status ? 'border-primary bg-primary/5 text-primary' : 'border-gray-300 hover:border-primary/50 text-gray-700 bg-gray-50'} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {formData.status === status && <CheckCircle2 size={18} />}
                  <span className="font-medium capitalize">{status}</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3"><strong>Draft:</strong> Save later | <strong>Active:</strong> Publish now | <strong>Closed:</strong> Stop applications</p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button type="button" variant="outline" onClick={() => router.push('/admin/jobs')} className="px-8 py-6 text-lg border-2 border-gray-300 hover:bg-gray-100 text-gray-700" disabled={isPending}>
              <X size={18} className="mr-2" /> Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 min-w-[200px]">
              {isPending ? <><Loader2 size={18} className="mr-2 animate-spin" /> Creating...</> : <><Save size={18} className="mr-2" /> Create Job Posting</>}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

// Helper
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}