import CreateProduct from "../../components/Create"
import EditProduct from "../../components/EditProducts"
import CreateEditCategories from "../../components/CreateEditCategories"
import ManageUsers from "../../components/ManageUsers"
import ManageOrder from "../../components/ManageOrder"

function MenuAdmin({setMenu, menu}) {

    const onButton = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        switch (event.target.value) {
            case "CreateProduct":
                setMenu({
                    panel: <CreateProduct/>
                })
                break;
            case "EditProduct":
                setMenu({
                    panel: <EditProduct/>
                })
                break;
            case "CreateEditCategories":
                setMenu({
                    panel: <CreateEditCategories/>
                })
                break;
            case "ManageUsers":
                setMenu({
                    panel: <ManageUsers/>
                })
                break;
            case "ManageOrder":
                setMenu({
                    panel: <ManageOrder/>
                })
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <button onClick={event => onButton(event)} value="CreateProduct">CreateProduct</button>
            <button onClick={event => onButton(event)} value="EditProduct">EditProduct</button>
            <button onClick={event => onButton(event)} value="CreateEditCategories">CreateEditCategories</button>
            <button onClick={event => onButton(event)} value="ManageUsers">ManageUsers</button>
            <button onClick={event => onButton(event)} value="ManageOrder">ManageOrder</button>
        </div>
    )
}

export default MenuAdmin