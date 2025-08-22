// import React, { useState, useEffect } from 'react';
// import { 
//   User, 
//   Car, 
//   Settings, 
//   Calendar, 
//   Phone, 
//   Mail, 
//   MapPin, 
//   CreditCard,
//   History,
//   Bell,
//   Edit3,
//   Save,
//   X,
//   Star,
//   Shield,
//   Clock,
//   Sparkles,
//   Heart,
//   Building,
//   Briefcase,
//   Gift,
//   Users,
//   Globe,
//   Camera,
//   BadgeCheck,
//   Upload
// } from 'lucide-react';

// interface UserProfile {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   dateOfBirth: string;
//   gender: string;
//   emergencyContact: string;
//   emergencyPhone: string;
//   licenseNumber: string;
//   insuranceProvider: string;
//   insurancePolicyNumber: string;
//   memberSince: string;
//   totalServices: number;
//   preferredService: string;
//   preferredTime: string;
//   communicationPreference: string;
//   referralSource: string;
// }

// interface Vehicle {
//   id: string;
//   make: string;
//   model: string;
//   year: number;
//   color: string;
//   mileage: number;
//   lastService: string;
//   nextService: string;
//   vin: string;
//   licensePlate: string;
//   registrationDate: string;
//   photo?: string;
// }

// interface ServiceHistory {
//   id: string;
//   date: string;
//   service: string;
//   vehicle: string;
//   cost: number;
//   status: 'completed' | 'pending' | 'cancelled';
//   technician: string;
//   notes: string;
// }

// const ProfilePage: React.FC = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [statsAnimated, setStatsAnimated] = useState(false);
//   const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  
//   const [userProfile, setUserProfile] = useState<UserProfile>({
//     name: 'Alexander Mitchell',
//     email: 'alex.mitchell@email.com',
//     phone: '+1 (555) 123-4567',
//     address: '123 Oak Street',
//     city: 'Downtown',
//     state: 'New York',
//     zipCode: '10001',
//     country: 'United States',
//     dateOfBirth: '1985-06-15',
//     gender: 'Male',
//     emergencyContact: 'Sarah Mitchell',
//     emergencyPhone: '+1 (555) 987-6543',
//     licenseNumber: 'DL123456789',
//     insuranceProvider: 'StateFarm Insurance',
//     insurancePolicyNumber: 'SF789456123',
//     memberSince: '2020-03-15',
//     totalServices: 47,
//     preferredService: 'Premium Detail & Oil Change',
//     preferredTime: 'Saturday Morning',
//     communicationPreference: 'Email & SMS',
//     referralSource: 'Friend Referral'
//   });

//   const [vehicles, setVehicles] = useState<Vehicle[]>([
//     {
//       id: '1',
//       make: 'BMW',
//       model: '3 Series',
//       year: 2021,
//       color: 'Midnight Black',
//       mileage: 28500,
//       lastService: '2024-04-15',
//       nextService: '2024-07-15',
//       vin: '1HGCM82633A123456',
//       licensePlate: 'ABC-1234',
//       registrationDate: '2021-02-10'
//     },
//     {
//       id: '2',
//       make: 'Mercedes',
//       model: 'C-Class',
//       year: 2019,
//       color: 'Pearl White',
//       mileage: 45200,
//       lastService: '2024-03-20',
//       nextService: '2024-06-20',
//       vin: '2HGCM82633B789012',
//       licensePlate: 'XYZ-5678',
//       registrationDate: '2019-05-22'
//     }
//   ]);

//   const serviceHistory: ServiceHistory[] = [
//     {
//       id: '1',
//       date: '2024-04-15',
//       service: 'Premium Oil Change',
//       vehicle: 'BMW 3 Series',
//       cost: 89.99,
//       status: 'completed',
//       technician: 'Mike Johnson',
//       notes: 'Oil filter replaced, engine inspected'
//     },
//     {
//       id: '2',
//       date: '2024-03-20',
//       service: 'Full Detail Wash',
//       vehicle: 'Mercedes C-Class',
//       cost: 149.99,
//       status: 'completed',
//       technician: 'Sarah Chen',
//       notes: 'Interior and exterior detailed, wax applied'
//     },
//     {
//       id: '3',
//       date: '2024-07-15',
//       service: 'Brake Inspection',
//       vehicle: 'BMW 3 Series',
//       cost: 75.00,
//       status: 'pending',
//       technician: 'David Rodriguez',
//       notes: 'Scheduled for brake pad inspection'
//     },
//     {
//       id: '4',
//       date: '2024-02-10',
//       service: 'Tire Rotation',
//       vehicle: 'Mercedes C-Class',
//       cost: 45.00,
//       status: 'completed',
//       technician: 'Mike Johnson',
//       notes: 'All tires rotated, pressure checked'
//     }
//   ];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//       setTimeout(() => setStatsAnimated(true), 500);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSave = () => {
//     setIsEditing(false);
//   };

//   const handleProfileUpdate = (field: keyof UserProfile, value: string) => {
//     setUserProfile(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleProfilePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setProfilePhoto(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleVehiclePhotoUpload = (vehicleId: string, event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setVehicles(prev => prev.map(vehicle => 
//           vehicle.id === vehicleId 
//             ? { ...vehicle, photo: e.target?.result as string }
//             : vehicle
//         ));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const StatCard = ({ icon: Icon, title, value, subtitle, delay = 0 }: { 
//     icon: React.ComponentType<any>, 
//     title: string, 
//     value: string | number, 
//     subtitle?: string,
//     delay?: number
//   }) => (
//     <div 
//       className={`relative bg-gradient-to-br from-red-50 via-rose-50 to-red-100 p-6 rounded-3xl border border-red-200/30 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-102 ${
//         statsAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//       }`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-3xl"></div>
//       <div className="relative">
//         <div className="flex items-center justify-between mb-4">
//           <div className="p-3 bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl shadow-lg">
//             <Icon className="w-6 h-6 text-white" />
//           </div>
//           <Sparkles className="w-5 h-5 text-red-500 animate-pulse" />
//         </div>
//         <div className="text-right mb-3">
//           <div className="text-3xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-red-800 bg-clip-text text-transparent">
//             {value}
//           </div>
//           {subtitle && <div className="text-sm text-gray-600 font-medium">{subtitle}</div>}
//         </div>
//         <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide">{title}</h3>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/40 to-red-100/60 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-300/20 to-red-400/20 rounded-full animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>

//       {/* Header */}
//       <div className={`relative bg-gradient-to-r from-red-700 via-red-600 to-red-800 shadow-2xl transition-all duration-1000 ${
//         isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'
//       }`}>
//         <div className="absolute inset-0 bg-black/10"></div>
//         <div className="relative max-w-7xl mx-auto px-6 py-10">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-8">
//               <div className="relative group">
//                 <div className="w-28 h-28 bg-gradient-to-br from-white/90 to-red-100/90 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300 overflow-hidden">
//                   {profilePhoto ? (
//                     <img src={profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
//                   ) : (
//                     <User className="w-14 h-14 text-red-700" />
//                   )}
//                 </div>
//                 <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl animate-bounce">
//                   <BadgeCheck className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -left-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
//               </div>
//               <div className="text-white">
//                 <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
//                   {userProfile.name}
//                 </h1>
//                 <div className="flex items-center space-x-6">
//                   <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
//                     <Car className="w-5 h-5 text-yellow-300 mr-2 animate-bounce" style={{ animationDuration: '2s' }} />
//                     <span className="text-red-100 font-medium">Valid User</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setIsEditing(!isEditing)}
//                 className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 flex items-center space-x-3 border border-white/30 hover:scale-102 shadow-lg"
//               >
//                 {isEditing ? <X className="w-6 h-6" /> : <Edit3 className="w-6 h-6" />}
//                 <span className="font-medium">{isEditing ? 'Cancel' : 'Edit Profile'}</span>
//               </button>
//               {isEditing && (
//                 <button
//                   onClick={handleSave}
//                   className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center space-x-3 shadow-xl hover:scale-102"
//                 >
//                   <Save className="w-6 h-6" />
//                   <span className="font-medium">Save Changes</span>
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-6 py-10">
//         {/* Navigation Tabs */}
//         <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-100/50 mb-10 overflow-hidden transition-all duration-1000 ${
//           isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
//         }`}>
//           <div className="flex">
//             {[
//               { id: 'profile', label: 'Profile Information', icon: User },
//               { id: 'overview', label: 'Overview', icon: Star },
//               { id: 'vehicles', label: 'My Vehicles', icon: Car },
//               { id: 'history', label: 'Service History', icon: History },
//               { id: 'settings', label: 'Settings', icon: Settings }
//             ].map(({ id, label, icon: Icon }, index) => (
//               <button
//                 key={id}
//                 onClick={() => setActiveTab(id)}
//                 className={`flex-1 py-6 px-8 flex items-center justify-center space-x-3 font-semibold transition-all duration-500 relative overflow-hidden group ${
//                   activeTab === id
//                     ? 'bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-xl'
//                     : 'text-gray-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700'
//                 }`}
//               >
//                 <Icon className={`w-6 h-6 transition-transform duration-300 ${activeTab === id ? 'scale-110' : 'group-hover:scale-105'}`} />
//                 <span>{label}</span>
//                 {activeTab === id && (
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Profile Information Tab */}
//         {activeTab === 'profile' && (
//           <div className="space-y-10">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//               {/* Personal Information */}
//               <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-100/50 overflow-hidden transition-all duration-1000 ${
//                 isLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-8'
//               }`}>
//                 <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8">
//                   <h2 className="text-2xl font-bold text-white flex items-center">
//                     <User className="w-7 h-7 mr-4" />
//                     Personal Information
//                     <Sparkles className="w-5 h-5 ml-3 animate-pulse" />
//                   </h2>
//                 </div>
//                 <div className="p-8 space-y-6">
//                   {/* Profile Photo Upload */}
//                   <div className="flex items-start space-x-6 group hover:bg-gradient-to-r hover:from-red-50/50 hover:to-red-100/50 p-4 rounded-2xl transition-all duration-300">
//                     <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl group-hover:scale-105 transition-transform duration-300">
//                       <Camera className="w-6 h-6 text-red-600" />
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Profile Photo</label>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleProfilePhotoUpload}
//                         className="w-full px-5 py-3 border-2 border-red-200 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
//                       />
//                     </div>
//                   </div>

//                   {[
//                     { icon: User, label: 'Full Name', field: 'name' as keyof UserProfile, value: userProfile.name, type: 'text' },
//                     { icon: Mail, label: 'Email Address', field: 'email' as keyof UserProfile, value: userProfile.email, type: 'email' },
//                     { icon: Phone, label: 'Phone Number', field: 'phone' as keyof UserProfile, value: userProfile.phone, type: 'tel' },
//                     { icon: Calendar, label: 'Date of Birth', field: 'dateOfBirth' as keyof UserProfile, value: userProfile.dateOfBirth, type: 'date' },
//                     { icon: Users, label: 'Gender', field: 'gender' as keyof UserProfile, value: userProfile.gender, type: 'text' }
//                   ].map(({ icon: Icon, label, field, value, type }) => (
//                     <div key={label} className="flex items-start space-x-6 group hover:bg-gradient-to-r hover:from-red-50/50 hover:to-red-100/50 p-4 rounded-2xl transition-all duration-300">
//                       <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl group-hover:scale-105 transition-transform duration-300">
//                         <Icon className="w-6 h-6 text-red-600" />
//                       </div>
//                       <div className="flex-1">
//                         <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{label}</label>
//                         {isEditing ? (
//                           <input
//                             type={type}
//                             value={value}
//                             onChange={(e) => handleProfileUpdate(field, e.target.value)}
//                             className="w-full px-5 py-3 border-2 border-red-200 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
//                           />
//                         ) : (
//                           <p className="text-gray-800 font-medium text-lg">{value}</p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Contact & Address Information */}
//               <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-100/50 overflow-hidden transition-all duration-1000 ${
//                 isLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8'
//               }`}>
//                 <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8">
//                   <h2 className="text-2xl font-bold text-white flex items-center">
//                     <MapPin className="w-7 h-7 mr-4" />
//                     Address & Contact
//                     <Sparkles className="w-5 h-5 ml-3 animate-pulse" />
//                   </h2>
//                 </div>
//                 <div className="p-8 space-y-6">
//                   {[
//                     { icon: MapPin, label: 'Street Address', field: 'address' as keyof UserProfile, value: userProfile.address, type: 'text' },
//                     { icon: Building, label: 'City', field: 'city' as keyof UserProfile, value: userProfile.city, type: 'text' },
//                     { icon: Globe, label: 'State', field: 'state' as keyof UserProfile, value: userProfile.state, type: 'text' },
//                     { icon: MapPin, label: 'ZIP Code', field: 'zipCode' as keyof UserProfile, value: userProfile.zipCode, type: 'text' },
//                     { icon: Globe, label: 'Country', field: 'country' as keyof UserProfile, value: userProfile.country, type: 'text' },
//                     { icon: Heart, label: 'Emergency Contact', field: 'emergencyContact' as keyof UserProfile, value: userProfile.emergencyContact, type: 'text' },
//                     { icon: Phone, label: 'Emergency Phone', field: 'emergencyPhone' as keyof UserProfile, value: userProfile.emergencyPhone, type: 'tel' }
//                   ].map(({ icon: Icon, label, field, value, type }) => (
//                     <div key={label} className="flex items-start space-x-6 group hover:bg-gradient-to-r hover:from-red-50/50 hover:to-red-100/50 p-4 rounded-2xl transition-all duration-300">
//                       <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl group-hover:scale-105 transition-transform duration-300">
//                         <Icon className="w-6 h-6 text-red-600" />
//                       </div>
//                       <div className="flex-1">
//                         <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{label}</label>
//                         {isEditing ? (
//                           <input
//                             type={type}
//                             value={value}
//                             onChange={(e) => handleProfileUpdate(field, e.target.value)}
//                             className="w-full px-5 py-3 border-2 border-red-200 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
//                           />
//                         ) : (
//                           <p className="text-gray-800 font-medium text-lg">{value}</p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Legal & Service Information */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//               <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-100/50 overflow-hidden transition-all duration-1000 ${
//                 isLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-8'
//               }`}>
//                 <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8">
//                   <h2 className="text-2xl font-bold text-white flex items-center">
//                     <Shield className="w-7 h-7 mr-4" />
//                     Legal & Insurance
//                   </h2>
//                 </div>
//                 <div className="p-8 space-y-6">
//                   {[
//                     { icon: CreditCard, label: 'License Number', field: 'licenseNumber' as keyof UserProfile, value: userProfile.licenseNumber, type: 'text' },
//                     { icon: Shield, label: 'Insurance Provider', field: 'insuranceProvider' as keyof UserProfile, value: userProfile.insuranceProvider, type: 'text' },
//                     { icon: CreditCard, label: 'Policy Number', field: 'insurancePolicyNumber' as keyof UserProfile, value: userProfile.insurancePolicyNumber, type: 'text' }
//                   ].map(({ icon: Icon, label, field, value, type }) => (
//                     <div key={label} className="flex items-start space-x-6 group hover:bg-gradient-to-r hover:from-red-50/50 hover:to-red-100/50 p-4 rounded-2xl transition-all duration-300">
//                       <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl group-hover:scale-105 transition-transform duration-300">
//                         <Icon className="w-6 h-6 text-red-600" />
//                       </div>
//                       <div className="flex-1">
//                         <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{label}</label>
//                         {isEditing ? (
//                           <input
//                             type={type}
//                             value={value}
//                             onChange={(e) => handleProfileUpdate(field, e.target.value)}
//                             className="w-full px-5 py-3 border-2 border-red-200 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
//                           />
//                         ) : (
//                           <p className="text-gray-800 font-medium text-lg">{value}</p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-100/50 overflow-hidden transition-all duration-1000 ${
//                 isLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8'
//               }`}>
//                 <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8">
//                   <h2 className="text-2xl font-bold text-white flex items-center">
//                     <Settings className="w-7 h-7 mr-4" />
//                     Service Preferences
//                   </h2>
//                 </div>
//                 <div className="p-8 space-y-6">
//                   {[
//                     { icon: Star, label: 'Preferred Service', field: 'preferredService' as keyof UserProfile, value: userProfile.preferredService, type: 'text' },
//                     { icon: Clock, label: 'Preferred Time', field: 'preferredTime' as keyof UserProfile, value: userProfile.preferredTime, type: 'text' },
//                     { icon: Bell, label: 'Communication Preference', field: 'communicationPreference' as keyof UserProfile, value: userProfile.communicationPreference, type: 'text' },
//                     { icon: Users, label: 'How did you hear about us?', field: 'referralSource' as keyof UserProfile, value: userProfile.referralSource, type: 'text' }
//                   ].map(({ icon: Icon, label, field, value, type }) => (
//                     <div key={label} className="flex items-start space-x-6 group hover:bg-gradient-to-r hover:from-red-50/50 hover:to-red-100/50 p-4 rounded-2xl transition-all duration-300">
//                       <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl group-hover:scale-105 transition-transform duration-300">
//                         <Icon className="w-6 h-6 text-red-600" />
//                       </div>
//                       <div className="flex-1">
//                         <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{label}</label>
//                         {isEditing ? (
//                           <input
//                             type={type}
//                             value={value}
//                             onChange={(e) => handleProfileUpdate(field, e.target.value)}
//                             className="w-full px-5 py-3 border-2 border-red-200 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
//                           />
//                         ) : (
//                           <p className="text-gray-800 font-medium text-lg">{value}</p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Overview Tab */}
//         {activeTab === 'overview' && (
//           <div className="space-y-10">
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <StatCard
//                 icon={Car}
//                 title="Total Services"
//                 value={userProfile.totalServices}
//                 subtitle="This Year: 12"
//                 delay={0}
//                 />
              
              
//               <StatCard
//                 icon={Star}
//                 title="Rating"
//                 value="4.9"
//                 subtitle="Excellent Service"
//                 delay={300}
//               />
//             </div>

//             {/* Welcome Message */}
//             <div className={`bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl shadow-2xl border border-red-100/50 overflow-hidden transition-all duration-1000 ${
//               isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
//             }`}>
//               <div className="relative p-10">
//                 <div className="absolute inset-0 bg-black/10"></div>
//                 <div className="relative text-white">
//                   <div className="flex items-center mb-6">
//                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-6">
//                       <Heart className="w-8 h-8 text-red-200 animate-pulse" />
//                     </div>
//                     <div>
//                       <h2 className="text-3xl font-bold mb-2">Welcome back, {userProfile.name.split(' ')[0]}!</h2>
//                       <p className="text-red-100 text-lg">Your trusted car care partner since {new Date(userProfile.memberSince).getFullYear()}</p>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                       <div className="flex items-center mb-3">
//                         <Gift className="w-6 h-6 text-yellow-300 mr-3" />
//                         <span className="text-sm font-semibold uppercase tracking-wide">Next Reward</span>
//                       </div>
//                       <p className="text-2xl font-bold">3 Services</p>
//                       <p className="text-red-200 text-sm">Until free premium wash</p>
//                     </div>
//                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                       <div className="flex items-center mb-3">
//                         <Calendar className="w-6 h-6 text-green-300 mr-3" />
//                         <span className="text-sm font-semibold uppercase tracking-wide">Next Service</span>
//                       </div>
//                       <p className="text-2xl font-bold">July 15</p>
//                       <p className="text-red-200 text-sm">BMW 3 Series checkup</p>
//                     </div>
//                     <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                       <div className="flex items-center mb-3">
//                         <Briefcase className="w-6 h-6 text-blue-300 mr-3" />
//                         <span className="text-sm font-semibold uppercase tracking-wide">Total Saved</span>
//                       </div>
//                       <p className="text-2xl font-bold">$847</p>
//                       <p className="text-red-200 text-sm">With member discounts</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

            
//           </div>
//         )}

//         {/* Vehicles Tab */}
//         {activeTab === 'vehicles' && (
//           <div className="space-y-8">
//             {vehicles.map((vehicle, index) => (
//               <div
//                 key={vehicle.id}
//                 className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-100/50 overflow-hidden transition-all duration-1000 transform hover:-translate-y-2 hover:shadow-3xl ${
//                   isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                 }`}
//                 style={{ transitionDelay: `${index * 200}ms` }}
//               >
//                 <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8">
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-2xl font-bold text-white flex items-center">
//                       <Car className="w-7 h-7 mr-4" />
//                       {vehicle.year} {vehicle.make} {vehicle.model}
//                       <Sparkles className="w-5 h-5 ml-3 animate-pulse" />
//                     </h2>
//                     <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
//                       <span className="text-white font-semibold">{vehicle.licensePlate}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-8">
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     {/* Vehicle Photo Section */}
//                     <div className="space-y-6">
//                       <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
//                         {vehicle.photo ? (
//                           <img src={vehicle.photo} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover" />
//                         ) : (
//                           <div className="text-center">
//                             <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                             <p className="text-gray-500">No photo uploaded</p>
//                           </div>
//                         )}
//                       </div>
//                       {isEditing && (
//                         <div className="flex items-center space-x-4">
//                           <Upload className="w-5 h-5 text-red-600" />
//                           <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => handleVehiclePhotoUpload(vehicle.id, e)}
//                             className="flex-1 px-4 py-3 border-2 border-red-200 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/70"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     {/* Vehicle Details */}
//                     <div className="space-y-6">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {[
//                           { label: 'Color', value: vehicle.color, icon: Sparkles },
//                           { label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} miles`, icon: Clock },
//                           { label: 'Last Service', value: new Date(vehicle.lastService).toLocaleDateString(), icon: Calendar },
//                           { label: 'Next Service', value: new Date(vehicle.nextService).toLocaleDateString(), icon: Bell },
//                           { label: 'VIN', value: vehicle.vin, icon: CreditCard },
//                           { label: 'Registration', value: new Date(vehicle.registrationDate).toLocaleDateString(), icon: Shield }
//                         ].map(({ label, value, icon: Icon }) => (
//                           <div key={label} className="group hover:bg-gradient-to-r hover:from-red-50/50 hover:to-red-100/50 p-4 rounded-2xl transition-all duration-300">
//                             <div className="flex items-center mb-2">
//                               <div className="p-2 bg-gradient-to-br from-red-100 to-red-200 rounded-xl mr-3 group-hover:scale-105 transition-transform duration-300">
//                                 <Icon className="w-4 h-4 text-red-600" />
//                               </div>
//                               <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{label}</span>
//                             </div>
//                             <p className="text-lg font-medium text-gray-800 ml-11">{value}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Service History Tab */}
//         {activeTab === 'history' && (
//           <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-100/50 overflow-hidden transition-all duration-1000 ${
//             isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
//           }`}>
//             <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8">
//               <h2 className="text-2xl font-bold text-white flex items-center">
//                 <History className="w-7 h-7 mr-4" />
//                 Service History
//                 <Sparkles className="w-5 h-5 ml-3 animate-pulse" />
//               </h2>
//             </div>
//             <div className="p-8">
//               <div className="space-y-6">
//                 {serviceHistory.map((service, index) => (
//                   <div
//                     key={service.id}
//                     className={`group bg-gradient-to-r from-white to-red-50/30 border-2 border-red-100 rounded-2xl p-6 hover:border-red-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
//                       service.status === 'pending' ? 'ring-2 ring-yellow-400/50 bg-gradient-to-r from-yellow-50 to-orange-50' :
//                       service.status === 'completed' ? 'ring-2 ring-green-400/50' : 'ring-2 ring-red-400/50'
//                     }`}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center mb-4">
//                           <div className={`p-3 rounded-2xl mr-4 group-hover:scale-105 transition-transform duration-300 ${
//                             service.status === 'pending' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
//                             service.status === 'completed' ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-red-600'
//                           }`}>
//                             <Car className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <h3 className="text-xl font-bold text-gray-800 mb-1">{service.service}</h3>
//                             <p className="text-gray-600 font-medium">{service.vehicle}</p>
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
//                           <div className="flex items-center">
//                             <Calendar className="w-4 h-4 text-red-500 mr-2" />
//                             <span className="font-medium">{new Date(service.date).toLocaleDateString()}</span>
//                           </div>
//                           <div className="flex items-center">
//                             <User className="w-4 h-4 text-red-500 mr-2" />
//                             <span className="font-medium">{service.technician}</span>
//                           </div>
//                           <div className="flex items-center">
//                             <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
//                               service.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                               service.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                             }`}>
//                               {service.status}
//                             </span>
//                           </div>
//                           <div className="flex items-center justify-end">
//                             <span className="text-2xl font-bold text-gray-800">${service.cost.toFixed(2)}</span>
//                           </div>
//                         </div>
//                         {service.notes && (
//                           <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//                             <p className="text-gray-700 italic">{service.notes}</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Settings Tab */}
//         {activeTab === 'settings' && (
//           <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-100/50 overflow-hidden transition-all duration-1000 ${
//             isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
//           }`}>
//             <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8">
//               <h2 className="text-2xl font-bold text-white flex items-center">
//                 <Settings className="w-7 h-7 mr-4" />
//                 Account Settings
//                 <Sparkles className="w-5 h-5 ml-3 animate-pulse" />
//               </h2>
//             </div>
//             <div className="p-8 space-y-8">
//               {[
//                 {
//                   title: 'Notification Preferences',
//                   icon: Bell,
//                   options: [
//                     { label: 'Email Notifications', desc: 'Receive service reminders via email' },
//                     { label: 'SMS Alerts', desc: 'Get text messages for urgent updates' },
//                     { label: 'Push Notifications', desc: 'Mobile app notifications' }
//                   ]
//                 },
//                 {
//                   title: 'Privacy Settings',
//                   icon: Shield,
//                   options: [
//                     { label: 'Profile Visibility', desc: 'Control who can see your profile' },
//                     { label: 'Data Sharing', desc: 'Manage third-party data sharing' },
//                     { label: 'Marketing Communications', desc: 'Receive promotional offers' }
//                   ]
//                 },
//                 {
//                   title: 'Account Security',
//                   icon: CreditCard,
//                   options: [
//                     { label: 'Two-Factor Authentication', desc: 'Add extra security to your account' },
//                     { label: 'Password Security', desc: 'Update your account password' },
//                     { label: 'Login History', desc: 'View recent account access' }
//                   ]
//                 }
//               ].map((section, sectionIndex) => (
//                 <div key={section.title} className="border border-red-100 rounded-2xl overflow-hidden">
//                   <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 border-b border-red-200">
//                     <h3 className="text-lg font-bold text-gray-800 flex items-center">
//                       <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl mr-3">
//                         <section.icon className="w-5 h-5 text-white" />
//                       </div>
//                       {section.title}
//                     </h3>
//                   </div>
//                   <div className="p-6 space-y-4">
//                     {section.options.map((option, optionIndex) => (
//                       <div key={option.label} className="flex items-center justify-between p-4 hover:bg-red-50 rounded-xl transition-colors duration-200">
//                         <div>
//                           <h4 className="font-semibold text-gray-800">{option.label}</h4>
//                           <p className="text-sm text-gray-600">{option.desc}</p>
//                         </div>
//                         <div className="relative">
//                           <input
//                             type="checkbox"
//                             className="sr-only"
//                             defaultChecked={optionIndex === 0}
//                           />
//                           <div className="w-12 h-6 bg-red-200 rounded-full cursor-pointer transition-colors duration-200 hover:bg-red-300">
//                             <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 translate-x-0.5 translate-y-0.5 ${
//                               optionIndex === 0 ? 'translate-x-6 bg-red-500' : ''
//                             }`}></div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;