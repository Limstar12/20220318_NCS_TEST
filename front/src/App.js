// import logo from './logo.svg';
import './App.css';

// import Funcom from './component/Functioncomponent'
// import Classcom from './component/Classcomponent'
import Interview from './component/Interview'
import Interview_form from './component/Interviewform'


function App() {
  return (
    <div className="App">
      {/* 네이게이션 */}
      {/* 스와이퍼 */}
     <Interview botable="interviewlist" titlenm='사전인터뷰'></Interview>
     {/* 포트폴리오 */}
     <Interview_form titlenm='인터뷰글쓰기' botable='interviewwrite'></Interview_form>
     {/* <Interview botable="write" titlenm='면접제안'></Interview> */}
     {/* 하단 */}
    </div>
  );
}

export default App;
