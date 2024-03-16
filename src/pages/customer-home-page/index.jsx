import { useEffect, useRef, useState } from "react"
import "./index.css"
import logo from "../../assets/images/logo.png"
import slide1 from '../../assets/images/slide1.jpg'
import slide2 from '../../assets/images/slide2.jpg'
import slide3 from '../../assets/images/slide3.jpg'
import slide4 from '../../assets/images/slide4.jpg'
const images = [slide1,slide2,slide3,slide4]
export default function CustomerHomePage(){
    
    const [slide,setSlide] = useState(0)
    const slideRef = useRef(null)
    useEffect(()=>{
        
        slideRef.current.scrollTo({
            left:slideRef.current.clientWidth*slide,
            behavior:'smooth'        
        })  
        setTimeout(()=>{
            if(slide===images.length-1){
                setSlide(0)
            }else{
                setSlide(slide+1)
            }
        },5000)
    }
    ,[slide])
    return(
        <div className="min-w-full min-h-[100vh] pt-[140px] backdrop-blur-lg flex flex-wrap justify-center ">
           
 
            <div className="min-h-[70vh] relative backdrop-blur-xl flex flex-col   items-center">
            <div className=' w-[100%] h-[80vh] overflow-x-scroll flex flex-row hide-scroll' ref={slideRef}>
                {
                    images.map((image,index)=>{
                        return(
                            <div key={index} className='min-w-full  min-h-[100%] flex justify-center items-start'>
                                <img src={image} alt="bg" className='w-full h-full object-cover'/>
                            </div>
                        )
                    
                    })
                }
                
            </div>
            <div className='absolute min-h-full min-w-full bg-black opacity-30'>
            </div>
            </div>
            <div className=' w-[100%] h-[80vh] absolute  flex flex-col'>
               <div className='w-full h-full relative flex justify-center items-center'>
                    <h1 className='text-5xl font-bold text-center text-white'>Welcome to InterLink</h1>
                    <div className='absolute bottom-5 flex flex-row'>
                        {
                            images.map((image,index)=>{
                                return(
                                    <div key={index} className={`cursor-pointer h-[15px]    mx-2 rounded-full  ${slide===index?'selected-div':'w-[15px] bg-[#7A7777]'} `}></div>
                                )
                            })
                        }
                    </div>
               </div>
            </div> 
        </div>
    )
}