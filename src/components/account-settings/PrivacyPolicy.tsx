import { FONTS } from "../../constants/constant";
const PrivacyPolicySettings = () => {
  return (
    <div className="p-5 bg-white rounded-lg">
         <h1 className="text-2xl font-bold text-[#0050A5]">Security:</h1>
        <div className="pt-5">   
        <p className="pb-4 text-lg font-semibold text-[#0050A5] " style={{...FONTS.sub_heading2}}>Two-factor Authentication:</p>
        <p className="!text-[16px]" style={{...FONTS.sub_heading2}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of.</p>
        </div>
         <div className="pt-5">   
        <p className="pb-4 text-lg font-semibold text-[#0050A5]" style={{...FONTS.sub_heading2}}>Secondary Verification:</p>
        <p className="!text-[16px]" style={{...FONTS.sub_heading2}}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.</p>
        </div>
         <div className="pt-5">   
        <p className="pb-4 text-lg font-semibold text-[#0050A5]" style={{...FONTS.sub_heading2}}>Breakup Codes:</p>
        <p className="!text-[16px]" style={{...FONTS.sub_heading2}}>Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of lorem ipsum.</p>
        </div>
         <div className="pt-5">   
        <p className="pb-4 text-lg font-semibold text-[#0050A5]" style={{...FONTS.sub_heading2}}>Desktop, Email, Chat, Purchase Notifications:</p>
        <p className="!text-[16px]" style={{...FONTS.sub_heading2}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>
        </div>
         <div className="pt-5">   
        <p className="pb-4 text-lg font-semibold text-[#0050A5]" style={{...FONTS.sub_heading2}}>Delete This Account :</p>
        <p className="!text-[16px]" style={{...FONTS.sub_heading2}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
        </div>
        
    </div>
  )
}

export default PrivacyPolicySettings