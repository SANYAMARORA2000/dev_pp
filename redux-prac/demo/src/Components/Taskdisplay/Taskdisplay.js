import React from 'react';
import './Taskdisplay.css'
import { Button } from 'antd';

import {RightOutlined,LeftOutlined} from '@ant-design/icons'

const Taskdisplay = (props) => {
   
    return (<div>
              <div className='taskdisplay-div'>
                  
                  <div className='bottom'>
                  <div className='line-1'></div>
                      <div className='sessiondetails'>
                    
                          <div className='sessiondata'>
                              <Button className='sessiondatabutton' type="primary">Confirm Booking</Button>
                              <div className='sessiondatainner-div'>
                                  <p className='sessiondatainner-divp'>Javascript · Functions</p>
                                  <div className='timedate'>
                                      <div className='timedate-div'>
                                          <p className='timedate-divp'>10:00 AM - IST - Monday, 7 April 2021 </p>
                                      </div>
                                  </div>
                                  <div className='confirmation'>
                                      <p className='confirmation-p'>Confirmation pending</p>
                                  </div>
                              </div>
                              <img className='imgsize' src='https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612'></img>
                          </div>
                          <div className='sessiondetails-text'>
                              <p className='sessiondetails-text-p'>Session Details</p>
                          </div>
                      </div>
                      <div className='line-2'></div>
                      <div className='studentsdetails'>
                     
                          <div className='studentsdata'>
                              <div className='studentsdata-div'>
                                    <Button className='studentsdatabutton' type="primary">Contact MSM</Button> 
                                    <Button className='studentsdatabutton1' type="primary">Confirm Booking</Button>
                                    <div >
                                    <img className='imgsize' src='https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612'></img>
                                    </div>
                                    
                                      <div className='studentsdata-info'>
                                          <div className='studentsdata-infodiv'>
                                              <p className='studentsdata-infodiv-p1'>Grade: 6th</p>
                                              <p  className='studentsdata-infodiv-p2'>Darlene Robertson</p>
                                          </div>
                                          <div className='studentsdata-infodiv2'>
                                              <p className='studentsdata-infodiv2-p1'>Verified by - Mentor</p>
                                             
                                          </div>
                                      </div>
                              </div>
                             <p className='studentsdata-p'>Student Details</p>
                          </div>
                         
                      </div>
                      
                  </div>
                  <div className='top'>
                      <div className='nextslot'>
                           <div className='nextslotinnerdiv'>
                               <p className='nextslotp'>Next Slot</p>
                               <RightOutlined className='nextsloticon'></RightOutlined>
                           </div>
                      </div>
                      <div className='previousslot'>
                           <div className='previousslotinnerdiv'>
                            <LeftOutlined className='previoussloticon'></LeftOutlined>
                            <p className='previousslotp'>Previous Slot</p>
                                
                            </div>
                      </div>
                  </div>
              </div>
    </div>   );
}
 
export default Taskdisplay;