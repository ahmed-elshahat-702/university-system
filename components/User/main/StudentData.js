import "@/styles/StudentData.css";

const StudentData = ({ loading, userData }) => {
  const renderUserDataSection = (sectionTitle, sectionData) => {
    return (
      <div className="mb-4 last:mb-0">
        <h5 className="folder-title relative text-blue-600 font-semibold bg-white w-fit px-3 rounded-t">
          {sectionTitle}
        </h5>
        <div className="bg-white p-3 rounded rounded-ss-none">
          <ul className="list-group">
            {loading
              ? Array.from({ length: 6 }, (_, index) => (
                  <li
                    key={index}
                    className="list-group-item animate-pulse bg-slate-100 p-2 mb-2 last:mb-0 rounded"
                  >
                    <div className="skeleton-line w-3/4 h-4 rounded"></div>
                  </li>
                ))
              : sectionData &&
                Object.entries(sectionData).map(([key, value]) => (
                  <li
                    key={key}
                    className="list-group-item bg-slate-100 p-2 mb-2 last:mb-0 rounded"
                  >
                    <span className="me-2 font-semibold">{key}:</span>
                    <span>{value}</span>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="student-main-info bg-white border border-gray-200 shadow-lg rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <h6 className="text-xs text-gray-500 mb-1">Faculty of</h6>
          <h4 className="text-lg font-semibold text-blue-600">Nursing</h4>
        </div>
        <div className="flex flex-col items-center">
          <h6 className="text-xs text-gray-500 mb-1">Grade</h6>
          <h4 className="text-lg font-semibold text-blue-600">2</h4>
        </div>
        <div className="flex flex-col items-center">
          <h6 className="text-xs text-gray-500 mb-1">Total GPA</h6>
          <h4 className="text-lg font-semibold text-blue-600">3.18</h4>
        </div>
      </div>

      <div className="student-secondary-info w-full mt-3">
        {userData && (
          <>
            <div className="mb-3 flex items-center gap-2">
              <h2>Welcome,</h2>
              {loading ? (
                <div className="animate-pulse skeleton-line w-40 h-4 bg-slate-200 rounded"></div>
              ) : (
                <span className="text-blue-600 font-bold">
                  {userData.userData?.fullName}
                </span>
              )}
            </div>
            {renderUserDataSection("User Data", userData.userData)}
            {renderUserDataSection("User Family Data", userData.userFamilyData)}
            {renderUserDataSection(
              "User Contact Data",
              userData.userContactData
            )}
            {renderUserDataSection(
              "User Previous Qualification Data",
              userData.userPreviousQualificationData
            )}
            {renderUserDataSection(
              "In The Event Of Transferring To Another College Or Institute",
              userData.InTheEventOfTransferringToAnotherCollegeOrInstitute
            )}
            {renderUserDataSection(
              "The Specialty He Wishes To Join",
              userData.TheSpecialtyHeWishesToJoin
            )}
          </>
        )}
      </div>
    </>
  );
};

export default StudentData;
