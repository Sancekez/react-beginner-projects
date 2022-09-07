import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({ items, isLoading ,onClickInvite, invites, setInviteSend}) => {
  let [searchValue, setSearchValue] = React.useState('');

  const onChangeSearch = (e)=>{
    setSearchValue(e.target.value)
  }
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input value={searchValue} onChange={(e)=>onChangeSearch(e)} type="text" placeholder="Найти пользователя..." />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items.filter((item)=>{
            let fullName = item.first_name + item.last_name;
            return fullName.toLowerCase().includes(searchValue.toLowerCase()) || item.email.toLowerCase().includes(searchValue.toLowerCase())
          }).map((item, index) => {
            return <User isInvited={invites.includes(item.id)} onClickInvite={onClickInvite} key={index} {...item}/>
          })}
        </ul>
      )}
      {invites.length > 0 && <button onClick={() => setInviteSend(true)} className="send-invite-btn">Отправить приглашение</button>}
    </>
  );
};
