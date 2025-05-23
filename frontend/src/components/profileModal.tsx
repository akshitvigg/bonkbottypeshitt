const ProfileModal = ({ open, image, username }: any) => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div>
      {open && (
        <div className=" fixed flex mt-18 justify-end inset-0 z-50  backdrop:blur-lg">
          <div
            data-aos="fade-in"
            data-aos-delay="0"
            className="  bg-white h-52 px-34 mr-10 shadow-2xl rounded-3xl "
          >
            <div className=" flex text-en">
              <img
                className=" rounded-full -translate-x-25 mt-8 "
                src={image}
                width={70}
                alt=""
              />
              <p className=" -translate-x-16 mt-12 text-2xl font-bold">
                {username}
              </p>
            </div>
            <div>
              <button
                onClick={logout}
                className=" transition-all duration-250  bg-red-100 p-3 hover:bg-red-500 hover:text-red-100 translate-y-8 -translate-x-24 rounded-2xl text-red-500 cursor-pointer"
              >
                {" "}
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
