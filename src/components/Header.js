import React from 'react'
import Figure from 'react-bootstrap/Figure'

function Header(props) {
    return (
      <header>
        <h1>Chitown Community Watch</h1>
        <Figure>
        <Figure.Image className="top-img-box"
          src="https://i.etsystatic.com/21635101/r/il/b4d5de/2181819430/il_794xN.2181819430_7ij9.jpg"
          width={1000}
          height={200}
        />
        </Figure>
      </header>
    )
}

export default Header
