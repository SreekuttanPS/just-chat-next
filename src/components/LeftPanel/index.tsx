import UserPanel from "@/components/UserPanel";
import LeftPanelItem from "@/components/LeftPanel/LeftPanelItem";
import DirectMessageList from "./DirectMessageList";

const LeftNavbar = () => {
  return (
    <div className="w-[90%] md:w-1/3 lg:w-1/4 z-20 fixed md:static h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 dark:text-gray-100 flex flex-col">
      <UserPanel />
      <div className="overflow-y-auto flex-1">
        <LeftPanelItem
          chatName="users"
          title="See All Online Users"
          isOnline={false}
          imageClass="invert hue-rotate-90"
          isCommonItem
        />

        <LeftPanelItem chatName="chat" title="Common Group" isOnline />
        <DirectMessageList />
      </div>
    </div>
  );
};

export default LeftNavbar;
