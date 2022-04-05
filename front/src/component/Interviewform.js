import React, {useEffect, useState} from 'react'; 
import $ from 'jquery';
import axios from 'axios';


export default function interviewform(props) {   
    const submitClick = async (type, e) => {    
        // 이 안에 비동기식이 있겠구나.. 첫번째인자 type은 xml까지 -> sql 선택의 key, sql로 보낼 애
        // 두번째인자는 마우스피드백
        // 이벤트리스너 -> 함수저장 -> 객체의 이벤트

        //button.onClick = function(ccc){}
        
        //=>
        //function ccc(){}
        //button.onClick = ccc
        // <button.onClick = { ccc }> // 
        
        // ccc를 실행할 경우 이벤트가 실행되라
        //<button onClick = {e => {ccc()}}> 정적객체. 객체가 있을 때 태그에 쓰는거
        // 아래 내용과 같다 button.onClick = function(e){ccc('값')}

        const  fnValidate = (e) =>{     // 유효성검사하는 애
                if(!$('#agreeTerm').is(':checked')){   
                    alert("동의하시게나");
                    $('label[for="agreeTerm"]').addClass('notice');                 
                    return false;
                }
                return true; // 제일 아래에 있어야한다. 트루일 경우 아래 식이 실행됨

                        
            }
        var time = new Date(); // true일때만 실행한다.
        
        if(fnValidate()){ // 동의했기때문에 데이터 모아서 이제 비동기로 노드한테 보내야겟다
        
            //폼필드에 내가 원하는 대로 사용자가 데이터를 삽입했음
            var  jsonstr = decodeURIComponent($("[name='"+props.botable+"']").serialize());           
            var  json_form = JSON.stringify(jsonstr).replace(/\&/g, '\",\"') 
            json_form = "{\""+ json_form.replace(/=/gi, '\":\"') + "\"}"   //jgon
            // json화 시킴 -> 노드
            // e.preventDefault(); 
            // console.log(" "+time + " : "+ json_form)


            //노드 -> xml -> sql // props.botable 이게 key다
            try{
                axios({     //응답 못 받은 애
                    url : `/preinterview?type=${props.botable}`, // 요청, req.body
                    header : {
                        "Content-Type" : 'application/json'
                    },
                    method : 'POST',
                    body :  json_form,
                })
                .then(   //응답받은 애      
                    (result) => {       // 서버는 요청이 오면 반드시 응답한다 res.send // 응답이 이상할 경우 노드 코딩 에러
                        try{  
                            console.log(result)    
                            // if(){
                            //     alert('인터뷰가 등록되었습니다.');
                            // }else(){}                                       
                        }
                        catch(err){ console.log("result 타입을 확인할 것 : " + err.message + " / ") }
                    }
                )
                .catch ( e => { console.log(e +'이유로 통신이 불안전함') }
                )
            }
            catch(err){
                console.log(" 서버통신에 문제가 있다 조금 뒤에 다시 시도해보던지 :" + err)
                
            }
        }
    //     else{
    //         console.log(" "+time + " : "+ fnValidate())
    //         e.preventDefault();            
    //   } 
    }



    return (  
        <div>
            <h2>{ props.titlenm }</h2>
            <form  action=''  method='post' name={props.botable}>
                <div className='formStyle'>
                    <dl>
                        <dt><label htmlFor='wr_subject'>인터뷰제목</label></dt>
                        <dd>
                            <input type='text' name='wr_subject' id="wr_subject" required />
                        </dd>
                    </dl>
                    <dl>
                        <dt><label htmlFor="wr_content">인터뷰내용</label></dt>
                        <dd>
                            <textarea rows={5} name="wr_content" id="wr_content"  required >

                            </textarea>
                        </dd>
                    </dl>
                    <div className="agree">
                        <input type="checkbox" id="agreeTerm" />
                        <label htmlFor="agreeTerm"><span>개인정보정책동의</span></label>
                    </div>
                    <a href='#none' onClick={e => { submitClick(props.botable, e) }}  className='btn' > 인터뷰올리기 </a>
                    {/* { submitClick(props.botable, e) } >> 첫번째 인자는 타입, e는 이벤트 */}
                </div>
            </form> 
        </div>
    );   
}