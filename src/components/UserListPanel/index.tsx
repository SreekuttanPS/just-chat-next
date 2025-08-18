import SearchUser from "@/components/UserListPanel/SearchUser";
import UserList from "@/components/UserListPanel/UserList";

function UserListPanel() {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold">All Online Users</p>
          </div>
        </div>
        <SearchUser />
        {/* <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
          <button type="button">📞</button>
          <button type="button">⋮</button>
        </div> */}
      </div>
      <UserList />
    </div>
  );
}

export default UserListPanel;
