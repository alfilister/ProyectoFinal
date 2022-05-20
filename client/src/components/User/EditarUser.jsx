import React from "react";
import { useState } from "react";

export default function EditarUser() {

    const [input, setInput] = useState({

        id_document : "" ,  
      });

    return(
        <div>
            <form>
                <input
                text ='text'
                placeholder = 'ingresa documento'
                value = {input.id_document}
                name = "id_documento"
                
                
                /
                >





            </form>
        </div>
    )

}