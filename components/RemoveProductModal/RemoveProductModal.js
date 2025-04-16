import React from 'react';
import { useGlobalRemoveFromCart } from "@/app/api/globals";

const RemoveProductModal = ({isOpen, onClose, item}) => {
    const removeFromCart = useGlobalRemoveFromCart();
    const modalClass = isOpen ? 'active' : '';
    
  return (
    <>
      {isOpen && (
        <div
        className={ `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center popup`
        }
      >
          <div className={`
          
          bg-white rounded-lg max-md:overflow-y-scroll  p-[40px] flex flex-col relative`}>
            <p className='mb-[2rem]'>Da li sigurno želite da izbacite proizvod iz korpe?</p>
            
            <div className='flex flex-row'>
                <button onClick={() => removeFromCart(item?.product?.id)} className="bg-croonus-3 border border-croonus-3 h-fit py-[0.8rem] mr-[0.6rem] text-white w-[10rem]"> 
                    POTVRDI
                </button>
                <button onClick={onClose} className="bg-white border border-croonus-3 h-fit w-[10rem] py-[0.8rem] mr-0.6rem">
                    NE
                </button>
                <button onClick={onClose} className="absolute top-2 right-3">X</button>
            </div>
            </div>
          </div>
      )}
    </>
  );
}

export default RemoveProductModal;