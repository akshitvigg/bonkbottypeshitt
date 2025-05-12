const ProfileModal = ({ open, onClose }: any) => {
  return (
    <div>
      {open && (
        <div className=" fixed flex justify-end inset-0 z-50 bg-black/30 backdrop:blur-lg">
          <div className=" bg-red-500/30 h-52 px-34 mr-10 shadow-2xl rounded-3xl mt-20">
            heloo
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
