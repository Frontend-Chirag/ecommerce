import React , { useState } from 'react';
import {FiBattery} from 'react-icons/fi';

import {FaLightbulb} from 'react-icons/fa';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '@/lib/client'
import { Product } from '@/components';

import { useStateContext } from '../../Context/StateContext';

const ProductDetails = ({ product, products }) => {

    const { image, name, details, price } = product;
    const [ index,setIndex ] =  useState(0);
    const { incQty, decQty, qty, onAdd , setShowCart} = useStateContext();

    const handleBuynow = () => {
      onAdd(product,qty);

      setShowCart(true);
    }
  return (
    <div>
        <div className='product-detail-container'>
           <div>
            <div className='image-container'>
               <img src={ urlFor(image && image[index])} className="product-detail-image"/>
            </div>
            <div className='small-images-container'>
               {image?.map((item, i) => (
               <img key={i} src={urlFor(item)} className={i === index ? 'small-image selected-image': 'small-image'} 
               onMouseEnter={() => setIndex(i)} />
               ))}
            </div>
           </div>
           
           <div className='product-detail-desc'>
           <div className='reviews'>
                <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
             </div>
             <h1>{name}</h1>
             <p>{details}</p>
            
             <p className='price' >₹{price}</p>
             <div className='quantity'>
                <h3>Quantity:</h3>
                <p className='quantity-desc'>
                    <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                    <span className='num' >{qty}</span>
                    <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                </p>
             </div>
             <div className='buttons'>
               <button type='button' className='add-to-cart' onClick={() => onAdd( product, qty)}>Add to Cart</button>
               <button type='button' className='buy-now' onClick={handleBuynow}>Buy Now</button>
             </div>
           </div>
        </div>

        <div className='product-container-banner'>
          <div className='desc-product-container'>
          <h1>Experience</h1>
          <h1>The Magic</h1>
          </div>
        <div className='battery-icon-container'>
          <div className='battery-icon'>
          <FiBattery className='batteryicon'/>
          <h1>10</h1>
          </div>
          <div>
            <h2>Uninterrupted</h2>
            <h2>Music upto 05</h2>
            <h2>Hours</h2>
          </div>
        </div>
        <div className='blub-icon-container'>
        <FaLightbulb className='blub-icon'/>
          <h2>RGB Lights</h2>
        </div>
        <div className='span-continer'>
          <span className='span-div'>10w</span> <h3>Powerful<br/>Sounds</h3>
        </div>
        </div>

        <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
              <div className="maylike-products-container track">
               { 
                  products.map( (item) => ((
                    <Product key={item._id} product ={item} />
                  )))
               }
             </div>    
            </div>    
        </div>

    </div>
  )
};

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
       slug {
        current
       }
    }`;
    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params:{
            slug:product.slug.current
        }
    }));

    return {
        paths,
        fallback:'blocking'
    }

};


export const getStaticProps = async ({ params: {slug} }) =>{
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productQuery = '*[_type == "product"]';


    const product = await client.fetch(query);
    const products = await client.fetch(productQuery);
    
    console.log(product)

    return{
        props: { product, products}
    }
}

export default ProductDetails