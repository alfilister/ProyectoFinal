import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { sortByName, sortByRating, filtres } from "../../redux/actions"

const Filters = ({setSorted}) => {

    const dispatch = useDispatch()
    const category = useSelector((state) => state.categories);

    const [filtros, setFiltros] = useState({
        category: 'all',
        price: 1000
    });

    // Ordenamiento por nombre
    const handleSortByName = (event) => {
        dispatch(sortByName(event.target.value));
        // para cambiar el paginado a la primer pagina luego de ordenar
        //setCurrentPage(1);
        setSorted(event.target.value)
    }

    const handleSortByRating = (event) => {
        dispatch(sortByRating(event.target.value));
        // para cambiar el paginado a la primer pagina luego de ordenar
        //setCurrentPage(1);
        setSorted(event.target.value)
    }

    const handleFilters = (event) => {
        event.preventDefault();
        dispatch(filtres(filtros));
    }

    const handleInputRange = (event) => {
        setFiltros({
            ...filtros,
            price: event.target.value
        })
    }

    const handleInputCategory = (event) => {
        setFiltros({
            ...filtros,
            category: event.target.value
        })
    }

    return (
        <div>
            {/* Por nombre A-Z */}
            <select onChange={(event) => {handleSortByName(event)}}>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
            </select>
            {/* Por puntuacion */}
            <select onChange={(event) => {handleSortByRating(event)}}>
                <option value="asc">Ascendente</option>
                <option value="des">Descendente</option>
            </select>
            <form>
            <select onChange={(event) => handleInputCategory(event)}>
                <option value='all'>All</option>
                {category.data?.map(c => {
                    return (
                        <option key={c} value={c}>
                            {c}
                        </option>
                        )
                    })}
                </select>
                <input onChangeCapture={(event) => handleInputRange(event)} type='range' min="0" max="1000"></input>
                <label>{filtros.price}</label>
                <button type="submit" onClick={(event) => handleFilters(event)}>Filtrar</button>
            </form>
        </div>
    )
}

export default Filters;