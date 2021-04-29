import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { EditProfile, ValidateProfile } from './components/pages/Profile';
import { Recentviewed, Favorites } from './components/pages/Homesearch';
import { Sellhome, Listanalysis } from './components/pages/selling';
import { Mortgagecal1, Mortgagecal2 } from './components/pages/Mortgagee';
import { Message1, Message2 } from './components/pages/Messages';
import { Feedback, Helpcenter, Settings, Support } from './components/pages/Account';
import { ServerCallings } from './utils/ServerCallings';
import { useEffect, useState } from 'react';


function App() {
  
  const [path, setPath] = useState('')
  useEffect(() => {
    var userId = localStorage.getItem("id")
    const interval = setInterval(() => {
      ServerCallings.chatRooms(userId, (data) => {
        localStorage.setItem("chatData", JSON.stringify(data));
      })
      setPath(localStorage.getItem("pathname"))
    }, 1000);
    return () => clearInterval(interval);
  }, [localStorage.getItem("pathname")])


  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path='/profile/editprofile' exact component={EditProfile} />
        <Route path='/profile/validateprofile' exact component={ValidateProfile} />

        <Route path='/homesearch/recentviewed' exact component={Recentviewed} />
        <Route path='/homesearch/favorites' exact component={Favorites} />

        <Route path='/selling/sellhome' exact component={Sellhome} />
        <Route path='/selling/listanalysis' exact component={Listanalysis} />

        <Route path='/mortgage/mortgagecal1' exact component={Mortgagecal1} />
        <Route path='/mortgage/mortgagecal2' exact component={Mortgagecal2} />
        <Route path={path} exact component={Message1} />
        {/* {
          console.log(
            chatpath.map((item, index) => {
              return <Route key={index} path={`/messages/${item}`} exact component={Message1} />
            })
          )
        } */}
        {/* <Route path='/messages/message2' exact component={Message2} /> */}


        <Route path='/account/settings' exact component={Settings} />
        <Route path='/account/feedback' exact component={Feedback} />
        <Route path='/account/helpcenter' exact component={Helpcenter} />
        <Route path='/account/support' exact component={Support} />

      </Switch>
    </Router>
  );
}

export default App;
