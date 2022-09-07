import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  let [data, setData] = React.useState([]);
  let [isLoading, setIsLoading] = React.useState(true)
  let [inviteSend, setInviteSend] = React.useState(false)
  let [invites, setInvites] = React.useState([])

  React.useEffect(()=>{
    fetch('https://reqres.in/api/users').then(res => res.json()).then(data => setData(data.data)).catch(err => console.warn(err)).finally(()=>{
      setIsLoading(false);
    })
  }, []);

  const onClickInvite = (id) => {
    if(invites.includes(id)) {
      setInvites(obj => obj.filter(_id => _id !== id));
    } else {
      setInvites(obj => [...obj, id]);
    }
  }

  return (
    <div className="App">
      {!inviteSend ? <Users setInviteSend={setInviteSend} onClickInvite={onClickInvite} invites={invites} items={data} isLoading={isLoading} setIsLoading={setIsLoading}/> : <Success count={invites.length}/>}
    
    </div>
  );
}

export default App;
