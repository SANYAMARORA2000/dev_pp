export const Increment=(num)=>{
   return{
       type:"INC",
       payload:num
   }
}

export const Decrement=()=>{
    return{
        type:"DEC"
    }
}