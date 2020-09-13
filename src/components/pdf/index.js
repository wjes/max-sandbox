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
import Chartjs from 'chart.js';


const PDF = () => {

  const chartConfig = {
    type: "line",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };

 
  
  const canvasRef = useRef(null)
  const [canvasBase64, setCanvasBase64] = useState() // '800px-Tux.svg.png' es el valor inicial para que ImagePDF no tire error 
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const newChartInstance = new Chartjs(canvasRef.current, chartConfig);
      setChartInstance(newChartInstance);
    }
    const ctx = canvasRef.current.getContext('2d')
    const image = new Image()
    image.src = '800px-Tux.svg.png'
    image.onload = () => {
      setCanvasBase64(canvasRef.current.toDataURL('image/png', 1.0))
    }
    // Actualiza la variable 'canvasBase64' y re-renderiza el actual componente
  }, [canvasRef]) 

  const styles = StyleSheet.create({ 
    page: {  
      paddingHorizontal: 20, 
      paddingVertical: 10,     
      margin: 0, 
      // fontSize: 7, 
    },
    image: {
      width: '100%',
    }
  })


  const Report = () => (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View>
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
    <canvas style={{ display: 'none' }} ref={canvasRef} />
    {canvasBase64 ?
        <PDFViewer style={{ width: '100%', height: '100%' }}>
          <Report />
      </PDFViewer> : <p>cargando ...</p>}
    </>
  )
}

  export default PDF

