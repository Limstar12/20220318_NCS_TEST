import React, {useEffect, useState} from 'react'
import axios from 'axios';

function Functioncomponent() {
    const [ mytext, mytextUpdate ] = useState('아직 db 안와서 내가 지키고있다')
    // useEffect(  async() => {
    //  const gettext = await  axios.get('/getsend/getno')
    //     mytextUpdate(gettext.data)        
    // }, []) 
    // []에 mytext가 없으면 딱 한번만 변경한다. [mytext] 이렇게 있을 경우 mytext가 출력될때마다 변경된다.


    useEffect(async () => {
        await axios.post('/getsend/post',{})
        .then(res => {
            mytextUpdate(res.data.title)
        })
    })




  return (
      <>
        <h3>나는 함수형 컴포넌트</h3>
        <div>{mytext}</div>
    </>
  )
}

export default Functioncomponent