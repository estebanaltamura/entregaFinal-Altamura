import {useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { getFirestore, doc, collection, getDocs, where, query } from "firebase/firestore"; 

import { ItemDetails } from "./ItemDetails.jsx";
import "./ItemDetailsContainer.css"


export const ItemDetailsContainer = ()=>{

const {idProduct, idCollection} = useParams() 
const [productData, setProductData] = useState({})
const [isLoading, setIsLoading] = useState(true)


const collectionData = async (idProduct, idCollection)=>{

    try {
        setIsLoading(true) 
        const db = getFirestore()
        const queryDoc = doc(db, "products", "backpack collections")        
        const queryCollection = collection(queryDoc, idCollection)
        const queryFilter = query(queryCollection, where("id", "==", Number(idProduct)))
            getDocs(queryFilter).then( res=>{
                setProductData( res.docs[0].data())
                Array.isArray(res.docs[0].data().images) && setIsLoading(false)
            })
    }
        

    catch (error) {
        console.error(error);
    }   
};

useEffect(()=>{
    collectionData(idProduct, idCollection)    
    
},[idProduct])

useEffect(()=>{
    window.scrollTo(0,0)     
},[])

    return(
        
        <div className="ItemDetailsContainer">
            {isLoading == true ? 
                <div className="spinnerContainer" >
                    <Spinner animation="border" role="status" className="spinner">
                    </Spinner> 
                </div> 
            : 
                <ItemDetails name={productData.name} price={productData.price} images={productData.images} description={productData.longDescription} productData={productData}/>
            }
        </div> 
    
)   
}

                                

