import product from '@/backendecommerce/schemas/product';
import React ,{ useContext, useState, createContext, useEffect } from 'react';

import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children}) => {
  
    const [ showCart , setShowCart ] = useState(false);
    const [ cartItems , setCartItems ] = useState([]);
    const [ totalQuantities, setTotalQuantities ] = useState(0);
    const [ qty, setQty ] = useState(1);
    const [ totalPrice, setTotalPrice ] = useState(0);

    let foundProduct;
    let index;

    const onAdd = ( product, quantity)  => {
     const checkProductIncart = cartItems.find((item) => item._id === product._id);
     setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
     setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
 
     if(checkProductIncart) {
        const updatedCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
               ...cartProduct,
               quantity: cartProduct.quantity + quantity
            }
        })

        setCartItems(updatedCartItems);
    }else{
        product.quantity = quantity;
        
        setCartItems([...cartItems, {...product}]);
    }
    
    toast.success(`${qty} ${product.name} added to the cart.` );
    }    

    const onRemove = (product) => {

        foundProduct = cartItems.find((item) => item._id === product._id);
        let newcartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newcartItems);

    }



    const toggleCartItemsQuantity = (id,value) => {
       
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product)=> product._id === id);

        let newcartItems = cartItems.filter((item) => item._id !== id);

        if(value === 'inc'){

         setCartItems([...newcartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
         setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
         setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);

        } else if (value === 'dec'){
            if (foundProduct.quantity > 1){
                setCartItems([...newcartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);   
            }}
    }



    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    } 

    const decQty = () => {
        setQty ((prevQty) => {
            
            if (prevQty - 1 < 1 ) return 1;
             return prevQty - 1 ;
        } );
    }

    return (
    <Context.Provider value={
        { showCart,
          cartItems,
          totalQuantities,
          totalPrice,
          qty,
          incQty,
          decQty,
          onAdd,
          showCart,
          setShowCart,
          toggleCartItemsQuantity,
          onRemove,
          setCartItems,
          setTotalPrice,
          setTotalQuantities,
          }} >
    {children}
   </Context.Provider>
)
}

export const useStateContext = () => useContext(Context)