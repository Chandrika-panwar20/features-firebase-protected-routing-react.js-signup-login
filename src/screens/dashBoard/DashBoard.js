import React from 'react'

import { facebook, insta, twitter } from '../../assets'

export const DashBoard = () => {
    return (
        <div className='dashboard-container'>
            <div className='center-wrapper'>
                <div className='dashboard-content' >
                   <h2>Facebook</h2>
                   <img src={facebook} alt={"facebook"} height={200} width={200}/> 
                </div>

                <div className='dashboard-content' >
                    <h2>Insta</h2>
                    <img src={insta} alt={"insta"} height={200} width={200}/>
                </div>

                <div className='dashboard-content' >
                    <h2>Twitter</h2>
                    <img src={twitter} alt={"twitter"} height={200} width={200}/>
                </div>
           </div>         
        </div>
    )
}
