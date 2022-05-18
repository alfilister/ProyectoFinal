import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import MenuAdmin from "../../components/MenuAdmin"
import CreateProduct from "../../components/Create"
import { getUserById } from "../../redux/actions"

function ControlPanel(idUser) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserById(idUser = 1))
    },[dispatch])

    const userRef = useSelector((state) => state.user)

    const [menu, setMenu] = useState({
        panel: <CreateProduct/>
    });
    
    const adminValidate = () => {
        return (userRef.role)
    }

    return (
        <div>
            <MenuAdmin setMenu={setMenu} menu={menu}/>
            {menu.panel}
        </div>
    )
}

export default ControlPanel