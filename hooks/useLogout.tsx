import useBackgroundImageRemovalStore from "@/app/background-removal/state";

const useLogout = () => {
  const { resetStore } = useBackgroundImageRemovalStore();

  const handleLogout = () => {
    resetStore();
  };

  return handleLogout;
};

export default useLogout;
