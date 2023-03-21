import { useState, useEffect } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import { getFirestore, doc, query, where, collection, getDocs, orderBy } from "firebase/firestore"
import Spinner from 'react-bootstrap/Spinner';
import { ItemList } from "./ItemList";
import "./ItemListContainer.css"

export const ItemListContainer = ()=>{

    const {idCollection} = useParams() 
    const [collectionData, setCollectionData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const history = useNavigate()


    const getCollectionData = async (idCollection)=>{
        try {                                 
            setIsLoading(true) 
            const db = getFirestore()
            const queryDoc = doc(db, "products", "backpack collections")
            const queryCollection = collection(queryDoc, idCollection)
            const queryFilter = query(queryCollection, orderBy("id"), where("isActive", "==", true))          
            getDocs(queryFilter).then( res=> setCollectionData(res.docs.length == 0 ? history("/home") :res.docs.map(product=>product.data())) )
            setIsLoading(false)            
        } 
        catch (error) {
            console.error(error);
        }       
    };

    useEffect(()=>{
        window.scrollTo(0,0)
        getCollectionData(idCollection) 
    },[idCollection])

    useEffect(()=>{
        
    },[isLoading])

    return(        
        <main className="itemListContainer">
            {isLoading == true ? 
                <div className="spinnerContainer" >
                        <Spinner animation="border" role="status" className="spinner">
                        </Spinner> 
                </div> 
                               : 

                
                <ItemList collectionProducts={collectionData} collectionName={idCollection} />
            }
        </main>         
    )
}


