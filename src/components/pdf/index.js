import React, { useRef, useEffect, useState }  from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactPDF, {
  Page,
  Text,
  Link,
  View,
  Document,
  PDFViewer,
  Image as ImagePDF,
  StyleSheet
} from '@react-pdf/renderer'

import tuxImageBase64 from './tuxImageBase64'

const PDF = () => {

  const canvasRef = useRef(null)
  const [canvasBase64, setCanvasBase64] = useState() // '800px-Tux.svg.png' es el valor inicial para que ImagePDF no tire error 

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    const image = new Image()
    image.src = '800px-Tux.svg.png'
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
      setCanvasBase64(canvasRef.current.toDataURL('image/png', 1.0))
    }
    // Actualiza la variable 'canvasBase64' y re-renderiza el actual componente
  }, []) 

  const styles = StyleSheet.create({ 
    page: {  
      paddingHorizontal: 20, 
      paddingVertical: 10,     
      margin: 0, 
      // fontSize: 7, 
    },
    image: {
      width: 100
    }
  })


  const Report = () => (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View>
          <Text>
            Imagen por URL
          </Text>
          <ImagePDF
            style={styles.image}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/800px-Tux.svg.png"
          />
          <Text>
            Imagen local
          </Text>
          <ImagePDF
            style={styles.image}
            src="800px-Tux.svg.png"
          />
          <Text>
            Imagen base64 
          </Text>
          <ImagePDF
            style={styles.image}
            src={tuxImageBase64}
          />
          <Text>
            Imagen desde canvas
          </Text>
          <ImagePDF
            style={styles.image}
            src={canvasBase64}
          />
        </View>
      </Page>
    </Document>
  )

  return (
    <>
    <canvas ref={canvasRef} width={300} height={300} />
    {canvasBase64 ? 
        <PDFViewer style={{ width: '100%', height: '100%' }}>
          <Report />
      </PDFViewer> : <p>cargando ...</p>}
    </>
  )
}

  export default PDF

