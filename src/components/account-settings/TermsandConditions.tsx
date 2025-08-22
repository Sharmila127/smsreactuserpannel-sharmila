import React from 'react';
import { FONTS } from '../../constants/constant';

const TermsConditionsPage: React.FC = () => {
  const sections = [
    {
      title: "Desktop, Email, Chat, Purchase Notifications:",
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
      title: "Delete This Account:",
      content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
    },
    {
      title: "Two-factor Authentication:",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of."
    },
    {
      title: "Second Verification:",
      content: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing."
    },
    {
      title: "Backup Codes:",
      content: "Lorem ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of lorem ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }
  ];

  return (
    <div className=" mx-auto p-6 bg-[#BED0EC]" style={{fontFamily:FONTS.header.fontFamily}}>
      <div className="space-y-8">
        <div className="border-b border-[#0050A5] pb-6">
          <h1 className="text-3xl font-bold text-[#0050A5] mb-2">Terms & Conditions</h1>
          <p className="text-gray-500">Please read these terms and conditions carefully before using our service.</p>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg p-6  transition-colors duration-200">
              <h2 className="text-xl font-bold text-[#0050A5] mb-4 leading-tight">
                {section.title}
              </h2>
              <p className="text-gray-500 leading-relaxed text-base">
                {section.content}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TermsConditionsPage;

