import { useEffect, useState } from "react";
import { getEnquiryData } from "../../features/Enquiry/service";
import { getUserProfile } from "../../features/Profile/service";
import { FONTS } from "../../constants/constant";
import { useAuth } from "../../pages/auth/AuthContext";
// import { FaBullseye } from "react-icons/fa";

interface EnquiryReply {
  fullName: string;
  yourEnquiry: string;
  replyMessage?: string;
  uuid: string;
  createdAt: string;
  // Add `email` here only if it's part of response data
  email?: string;
}

const ReplyMessageList = () => {
  const [replies, setReplies] = useState<EnquiryReply[]>([]);
  const [filteredReplies, setFilteredReplies] = useState<EnquiryReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const {isAuthenticated} = useAuth(); 

  // Fetch replies
  useEffect(() => {
     if (isAuthenticated){
    const fetchReplies = async () => {
      try {
        
        const response: any = await getEnquiryData('');
        const data = response?.data?.data;
        console.log('Fetched replies:', data);
        if (Array.isArray(data)) {
          setReplies(data);
        } else {
          console.error("Expected array but got:", data);
          setReplies([]);
        }
      } catch (error) {
        console.error("Failed to fetch replies", error);
        setReplies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReplies();
  }
  setLoading(false);
}, [isAuthenticated]);

  // Fetch profile & filter replies
  useEffect(() => {
    if(isAuthenticated){
    const fetchProfile = async () => {
      try {
        const response: any = await getUserProfile({});
        const profile = response?.data?.data;
        setProfileData(profile);
        console.log('Profile data:', profile);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  } 
  setLoading(false);
}, []);

  

  // Filter replies based on profile
  useEffect(() => {
    if (profileData && replies.length > 0) {
      const fullName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim().toLowerCase();
      const email = profileData.email?.toLowerCase();

      const filtered = replies.filter(
        (reply) =>
          reply.fullName?.toLowerCase() === fullName ||
          reply.email?.toLowerCase() === email
      );

      setFilteredReplies(filtered);
    }
  }, [profileData, replies]);

  console.log("Authenticated?", isAuthenticated);
  console.log("Replies:", replies);
console.log("Filtered Replies:", filteredReplies);





  return (
    <div className="space-y-6">
      <h2 style={{ ...FONTS.header }} className="text-xl font-bold text-[#0050A5]">
        Your Enquiries
      </h2>

      {loading && <div className="text-gray-500 text-sm">Loading...</div>}

      {!loading && filteredReplies.length === 0 && (
        <div className="text-gray-500 text-sm">No replies available.</div>
      )}

      <div className="flex flex-col space-y-4">
        {filteredReplies.map((item, index) => (
          <div
            key={index}
            className="relative w-full p-5 pb-12 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <p className="text-sm text-[#0050A5]" style={{ ...FONTS.paragraph }}>
                Enquiry ID:
              </p>
              <p
                className="text-sm !text-white w-2/7 font-medium bg-purple-600 rounded-full px-2 w-32 text-center"
                style={{ ...FONTS.sub_paragraph1 }}
              >
                <span className="!text-white" style={{ ...FONTS.sub_paragraph1 }}>
                  Name:{" "}
                </span>
                {item?.fullName?.substring(0, 15)}
              </p>
            </div>

            <div className="mb-3">
              <p className="text-gray-700 break-words" style={{ ...FONTS.sub_paragraph1 }}>
                {item.uuid}
              </p>
            </div>

            <div className="mb-3">
              <p style={{ ...FONTS.paragraph }} className="text-[#0050A5]">Enquiry:</p>
              <p className="text-gray-700 mt-2" style={{ ...FONTS.sub_paragraph1 }}>
                {item.yourEnquiry}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#0050A5] mb-2" style={{ ...FONTS.paragraph }}>
                Reply from Admin:
              </p>
              <p
                style={{
                  ...FONTS.sub_paragraph1,
                  color: item?.replyMessage ? 'gray' : 'red',
                }}
              >
                {item?.replyMessage || "No reply yet"}
              </p>
            </div>

            <div
              className="absolute bottom-4 right-5 text-xs text-gray-500"
              style={{ ...FONTS.sub_paragraph1 }}
            >
              {new Date(item.createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReplyMessageList;
