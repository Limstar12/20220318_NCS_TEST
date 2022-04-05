import React, {useEffect, useState} from 'react'; 
import axios from 'axios';
import $ from 'jquery';

const Interview = (props) => {   
    let [ interviewId, interviewIdUpdate ] = useState([]);  
    //초기값 interviewId=[]
    const [typeData,insertDB] = useState(0);   
   
    
    const interviewDataSetting = async () => {          //const가 있어서 실행문(변수화)이다. const가 없을 경우 함수             
                                axios({
                                    url : `/preinterview?type=${props.botable}`,
                                    method : 'POST'
                                })
                                        .then(
                                            (result) => {  

                                                // select전용
                                                try{  
                                                    interviewIdUpdate([...result.data]); 
                                                    // interviewId = [{...},{...},{...},{...},{...},{...}]
                                                    insertDB(result.data[ result.data.length-1 ].no);                                                 
                                                }
                                                catch(err){ console.log(err.message) }

                                            }
                                        )
                                        .catch ( e => { console.log(e +'이유로 통신이 불안전함') }
                                        ) 
    } 
    useEffect( () => {  interviewDataSetting(); } , [typeData]  )    
    // typeData의 값이 변할 때 재 렌더링해라.    
    
    const submitClick = (type, e) => {

        const fnValidate = (e) => {
            //여기서 유효성검사
            //필드에 값이 맞지 않거나
            return true;
        }
        if(fnValidate()){
        
            var jsonstr = $("[name='interviewwrite']").serialize();    // 네임=값&네임=값

            alert("1."+jsonstr);
            var json_form = JSON.stringify(jsonstr).replace(/\&/g, '\",\"')     // 네임=값","네임=값
            alert("2."+json_form);
            json_form = "{\""+ json_form.replace(/=/gi, '\":\"') + "\"}"    // { "네임":"값","네임":"값" }
            alert("3.데이터를 한번에  json문법화됨 serialize() 안쓰면 일일이 담아야 함 "+json_form);

            

        }
        e.preventDefault(); //react에서는 폼태그 전송 막기 위해서는 return false 가 아니다.
    }


    return (  
        <div>
            <h2>{ interviewId.length > 0 ? props.titlenm : "데이터전송중..." }</h2>
            {
                interviewId.map(( contant, i ) => {
                    return(
                        <li key={contant.id}>
                            <h3>{i+1} {contant.wr_a}</h3><div>{contant.wr_b}</div>
                        </li>
                    )
                })
            }

            <h2>인터뷰글 올리기</h2>
            <form action='' onSubmit={ e => { submitClick("interviewwrite", e); }}  method='post' name="interviewwrite">
                <div className='formStyle'>
                    <dl>
                        <dt>인터뷰제목</dt>
                        <dd>
                            <input type='text' name='wr_subject' />
                        </dd>
                    </dl>
                    <dl>
                        <dt>인터뷰내용</dt>
                        <dd>
                            <textarea rows={5} name="wr_content">

                            </textarea>
                        </dd>
                    </dl>
                    <button className='btn'> 인터뷰올리기 </button>

                </div>
                </form>


            
        </div>
    );   
}
export default Interview;