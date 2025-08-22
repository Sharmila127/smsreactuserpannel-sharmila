import React from 'react';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { BiMaleFemale } from "react-icons/bi";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { PiPhonePlusFill } from "react-icons/pi";
import { RiContactsBook3Fill } from "react-icons/ri";
import { MdAttachEmail } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaRegAddressCard, FaFacebook, FaYoutube } from "react-icons/fa";
import { TbBuildingWarehouse } from "react-icons/tb";
import { IoIosLink } from "react-icons/io";
import { IoShareSocial } from "react-icons/io5";

const AccountSettingsPage: React.FC = () => {
  return (
    <div className="p-6 mx-auto bg-white shadow-lg rounded-lg">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#9b111e] ">Profile Settings</h1>
        <p className="text-gray-600 mt-2">
          Update your personal information, contact details, and preferences
        </p>
      </header>

      <form className="space-y-8">
        {/* Personal Information Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-semibold text-[#9b111e] border-b pb-2">
            <BsFillPersonPlusFill />
            <h2>Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
                <MdOutlineDriveFileRenameOutline /> First Name
              </label>
              <input type="text" id="firstName" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition" />
            </div>

            <div>
              <label htmlFor="lastName" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
                <MdOutlineDriveFileRenameOutline /> Last Name
              </label>
              <input type="text" id="lastName" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition" />
            </div>

            <div>
              <label htmlFor="dob" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
                <LiaBirthdayCakeSolid /> Date of Birth
              </label>
              <input type="date" id="dob" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition" />
            </div>

            <div>
              <label htmlFor="gender" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
                <BiMaleFemale /> Gender
              </label>
              <select id="gender" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition">
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="bio" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
              <HiMiniInformationCircle /> About You
            </label>
            <textarea id="bio" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition" rows={4} placeholder="Tell us about yourself..." />
          </div>

          <div>
            <label htmlFor="photo" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
              <CgProfile /> Profile Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#9b111e]/30">
                <img src="https://via.placeholder.com/150" alt="Profile placeholder" className="w-full h-full object-cover" onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"%3E%3Ccircle cx="75" cy="75" r="75" fill="%23e5e7eb"/%3E%3Ctext fill="%239b111e" font-family="sans-serif" font-size="16" dy=".3em" text-anchor="middle" x="75" y="75"%3EAdd Photo%3C/text%3E%3C/svg%3E';
                  target.className = 'w-full h-full object-contain';
                }} />
              </div>
              <input type="file" id="photo" accept="image/*" className=" w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#9b111e]/10 file:text-[#9b111e] hover:file:bg-[#9b111e]/20" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-semibold text-[#9b111e] border-b pb-2">
            <RiContactsBook3Fill /> 
            <h2>Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
                <MdAttachEmail /> Email Address
              </label>
              <input type="email" id="email" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition" />
            </div>

            <div>
              <label htmlFor="phone" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
               <PiPhonePlusFill />Phone Number
              </label>
              <input type="tel" id="phone" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition" />
            </div>

            <div>
              <label htmlFor="address" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
                <FaRegAddressCard /> Address
              </label>
              <input type="text" id="address" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition" />
            </div>

            <div>
              <label htmlFor="State" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
                <FaMapLocationDot /> State
              </label>
              <select id="State" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition">
                <option value="">Select State</option>
                <option>Tamil Nadu</option>
                <option>Kerala</option>
                <option>Andhra Pradesh</option>
                <option>Punjab</option>
                <option>Gujarat</option>
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-semibold text-[#9b111e] border-b pb-2">
            <FaRegAddressCard />
            <h2>Professional Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
                <TbBuildingWarehouse /> Company Name
              </label>
              <input type="text" id="companyName" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition" />
            </div>

            <div>
              <label htmlFor="companyWebsite" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
                <IoIosLink /> Company Website
              </label>
              <input type="url" id="companyWebsite" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition" placeholder="https://" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-semibold text-[#9b111e] border-b pb-2">
            <IoShareSocial />
            <h2>Social Media</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="facebook" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
                <FaFacebook /> Facebook Profile
              </label>
              <input type="url" id="facebook" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition" placeholder="https://facebook.com/username" />
            </div>

            <div>
              <label htmlFor="youtube" className=" mb-2 font-medium text-gray-700 flex items-center gap-2">
                <FaYoutube /> YouTube Channel
              </label>
              <input type="url" id="youtube" className="w-full px-4 py-2 border border-[#9b111e]/30 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:border-transparent transition" placeholder="https://youtube.com/username" />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4 pt-4">
          <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-[#9b111e] text-white rounded-lg font-medium hover:bg-[#9b111e]/90 transition focus:outline-none focus:ring-2 focus:ring-[#9b111e]/50 focus:ring-offset-2">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettingsPage;
