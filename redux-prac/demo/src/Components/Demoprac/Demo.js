import React from 'react';
import './Demo.css'
import {DownOutlined} from '@ant-design/icons'
import { Select } from 'antd';
const { Option } = Select;


const Demo = () => {
    return ( 
        <div class="hello">
         
                <div class="heading-div">
                      
                    <div class="parent">
                          <div class="child1">
                             <p class="style1 ">4</p>
                          </div>
                          <div class="child2">
                             <p class="style2 ">Total Task</p>
                          </div>
                    </div>
                       
                        
                   <div class="parent2">
                       <div class="sub-parent">
                           
                            <div class="drop1">
                                <p class="ptag1">Payslab</p>

                               <Select defaultValue="All" class="select1"></Select>
                                
                            </div>
                            <div class="drop2">
                                <p class="ptag2">Verified</p>
                               <Select defaultValue="NA" class="select2"></Select>
                              
                            </div>
                            <div class="drop3">
                                <p class="ptag3">Status</p>
                               <Select defaultValue="All" class="select3"></Select>
                               
                            </div>
                            <div class="drop4">
                                <p class="ptag4">View By</p>
                               <Select defaultValue="This Week"class="select4"></Select>
                               
                            </div>
                              
                       </div>
                   </div>
                      

                </div > 
              
        </div>
      
       
      
        
           
        
        
       
     );
}
 
export default Demo;