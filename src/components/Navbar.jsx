import React from 'react'
import {bag, logo, search}  from '../utils'
import { navList } from '../constants'


const Navbar = () => {
  return (
    <header >
        <nav className='text-white w-full p-5 sm:px-10 px:5 flex justify-between items-center'>
            <img src={logo} alt={"logo"} className='w-6 h-6 ' />
            <div className='flex flex-1 w=full max-sm:hidden max-w-screen justify-center'>
                {navList.map((nav)=>(
                    <div key={nav} className='px-5 text-sm cursor-pointer text-secondry-100 transition-all hover:text-white'>
                        {nav}
                    </div>
                ))}
            </div>
           <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
             <img src={search} alt="search" className='w-6 h-6 '/>
            <img src={bag} alt="bag" className='w-6 h-6 '/>
           </div>
        </nav>
    </header>
  )
}

export default Navbar