import React from "react";
import AddAnnouncement from "./AddAnnouncement.jsx";
import AnnouncementItem from "./AnnouncementItem.jsx";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export default function Sidebar({
  lists,
  setActiveItem,
  setLists,
  activeItem,
  onAddList,
  onEditTitle,
  onEditDescription,
}) {
  let history = useHistory();

  useEffect(() => {
    const listId = history.location.pathname.split("lists/")[1];
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, history.location.pathname]);

  return (
    <div className="sidebar">
      <div className="container">
        <div className="sidebar__menu">
          <div className="sidebar__menu_list">
            {lists ? (
              <AnnouncementItem
                lists={lists}
                onEditTitle={onEditTitle}
                onEditDescription={onEditDescription}
                isRemovable={true}
                onRemove={(id) => {
                  const newLists = lists.filter((item) => item.id !== id);
                  setLists(newLists);
                }}
                items={lists}
                onClickItem={(list) => {
                  history.push(`/lists/${list.id}`);
                  setActiveItem(list);
                }}
                activeItem={activeItem}
              />
            ) : (
              "Loading..."
            )}

            <AddAnnouncement onAddList={onAddList} />
          </div>
        </div>
      </div>
    </div>
  );
}
