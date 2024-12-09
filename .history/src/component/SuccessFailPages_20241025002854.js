import React from 'react'

const SuccessFailPages = () => {
  return (
    <div>
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="message-box _success">
                     <i class="fa fa-check-circle" aria-hidden="true"></i>
                    <h2> Your payment was successful </h2>
                   <p> Thank you for your payment. we will <br/>
be in contact with more details shortly </p>      
            </div> 
        </div> 
    </div> 
    <hr/>
  
  
  <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="message-box _success _failed">
                     <i class="fa fa-times-circle" aria-hidden="true"></i>
                    <h2> Your payment failed </h2>
             <p>  Try again later </p> 
         
            </div> 
        </div> 
    </div> 
  
</div> 
      
    </div>
  )
}

export default SuccessFailPages
