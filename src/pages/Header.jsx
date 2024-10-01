import React from 'react';

export const Header = () =>{
    return (
        <>
            <div className="container-fluid header">
                <h1 className='titulo-grande'>¡Pizzería Mamma Mia!</h1>
                <p className='bajada-titulo'>¡Tenemos las mejores pizzas que podrás encontrar!</p>
                <hr className='linea'/>
            </div>
        </>
    )
}

export default Header;