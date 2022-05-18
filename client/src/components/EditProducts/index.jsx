import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {getProductsById} from "../../redux/actions"

function EditProduct() {

    const dispatch = useDispatch()
    const allProducts = useSelector((state)=>state.products)
    const productDetail = useSelector((state)=>state.productsDetail)

    useEffect(() => {
        dispatch(getProductsById(target.value))
        dispatch(clearDetail())
      }, [dispatch])

    const list = <div>
    {allProducts?.map((product)=>{
        return <div key={product.id}>
            {product.name}
            <button onClick={(event)=>{onController(event)}} value={product.id}>🖊</button>
            <button value={product.id}>❌</button>
        </div>
        })}
    </div>

    const [stateLocal, setStateLocal] = useState({
        display: list,
        editableProduct: {}
    })

    const onController = (event)=> {
        event.preventDefault()
        switch (event.target.value) {
            case "back":
                return setStateLocal({
                    ...stateLocal,
                    display: list
                })
            case "4":
                console.log(event.target.value)
                return setStateLocal({
                    ...stateLocal,
                    editableProduct: {name: "prueba"},
                    display: editForm,
                })
            default:
                
                break;
        }
    }

    const editForm = <div>
        <button onClick={(event)=>{onController(event)}} value="back">Regresar</button>
        <span>{productDetail.name}</span>
    </div>

    return (stateLocal.display)
}

export default EditProduct
