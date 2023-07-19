import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../contexts/CartContextProvider"
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { BsFillTrashFill } from "react-icons/bs";
import { ItemListCart } from "../../components/cartComponents/ItemListCart";
import { getUrl } from "../../mercadopago";
import Spinner from '../../assets/spinner.gif';
import "./Cart.css"

export const Cart = ()=>{

  const { itemsCartAdded, setItemsCartAdded } = useContext(CartContext)
  const { isLoading, setIsLoading } = useContext(IsLoadingContext)
 
   
  const onEmptyCartClickHandler = ()=> setItemsCartAdded([])

  useEffect(()=>{
    
    itemsCartAdded.length === 0 && setIsLoading(false)
    
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant"
    })       
        //eslint-disable-next-line
  },[])

  return(
    <>  
      {
        itemsCartAdded.length > 0 ?
          <>  
            <div className={isLoading === true ? "spinnerContainer" : "hidden"} >      
              <img src={Spinner} />           
            </div> 

            <main className={isLoading === true ? "hidden" : "mainContainerCart"}>
              <div className="contenedorItems redondeado">
                <ItemListCart />
              </div>

              <button onClick={onEmptyCartClickHandler} className="emptyCart"><BsFillTrashFill />Empty Cart</button> 

              <div className="paymentButtonsContainer">                                                               
                <h4>Credit card payments</h4>
                <Link className="botonesCarro MPButton" to="/payment" onClick={()=>getUrl(itemsCartAdded)}>
                  <img src="https://i.postimg.cc/Xv5j8NDx/icono_mercadopago.png" className="mercadopagoicono" alt="" />
                  CONTINUE TO CHECKOUT
                </Link>

                <h4>Bank transfer payment method</h4>
                <Link className="botonesCarro customOrderButton" to="/customOrder">                                    
                  CREATE CUSTOM ORDER
                </Link>
                
                <div className="line"></div>
                
                <Link className="botonesCarro" to="/home">CONTINUE SHOPPING</Link>                                 
              </div>
            </main>
          </>

                                            :

          <>            
            <main className="mainContainerCart" >
              <div className="paymentButtonsContainer">
                <h3>Your cart is currently empty</h3>
                <Link className="botonesCarro" to="/home">CONTINUE SHOPPING</Link>                    
              </div>
            </main>
          </>

      }       
    </>
  )
}

//