import { useEffect, useState } from 'react'
import './App.css'
import Form from './Form'
import Table from './Table'

function App() {
  const product = {
    id: 0,
    name: '',
    brand: ''
  }

  const [btnInsert, setBtnInsert] = useState(true)
  const [products, setProducts] = useState([])
  const [productObj, setProductObj] = useState(product)

  useEffect(() => {
    fetch('http://localhost:8080/list')
      .then(response => response.json())
      .then(productsList => setProducts(productsList))
  }, [])

  const toType = e => {
    setProductObj({ ...productObj, [e.target.name]: e.target.value })
  }

  const insert = () => {
    fetch('http://localhost:8080/insert', {
      method: 'post',
      body: JSON.stringify(productObj),
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(returned => {
        if (returned.message !== undefined) {
          alert(returned.message)
        } else {
          setProducts([...products, returned])
          alert('Product successfully created!')
          cleanForm()
        }
      })
  }

  const alterate = () => {
    fetch('http://localhost:8080/alterate', {
      method: 'put',
      body: JSON.stringify(productObj),
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(returned => {
        if (returned.message !== undefined) {
          alert(returned.message)
        } else {
          alert('Product successfully alterated!')

          let temporaryArray = [...products]
          let index = temporaryArray.findIndex(p => {
            return p.id === productObj.id
          })

          temporaryArray[index] = productObj

          setProducts(temporaryArray)

          cleanForm()
        }
      })
  }

  const remove = () => {
    fetch('http://localhost:8080/remove/' + productObj.id, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(returned => {
        alert(returned.message)

        let temporaryArray = [...products]
        let index = temporaryArray.findIndex(p => {
          return p.id === productObj.id
        })

        temporaryArray.splice(index, 1)

        setProducts(temporaryArray)
        cleanForm()
      })
  }

  const cleanForm = () => {
    setProductObj(product)
    setBtnInsert(true)
  }

  const selectProduct = index => {
    setProductObj(products[index])
    setBtnInsert(false)
  }

  return (
    <div>
      <Form
        button={btnInsert}
        keyboardEvent={toType}
        insert={insert}
        obj={productObj}
        cancel={cleanForm}
        remove={remove}
        alterate={alterate}
      />
      <Table array={products} select={selectProduct} />
    </div>
  )
}

export default App
