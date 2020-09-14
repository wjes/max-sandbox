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
import graph from './dat'

const colors= [
  "255, 99, 132",
  "255, 159, 64",
  "0,128,0",
  "75, 192, 192",
  "153, 102, 255",
]

// MAPEA LA DATA
var renderdata = graph.map(function(obj,i){ 
  var rObj = {};
  let nwarr = []
  var arr = Object.values(obj.data).map(function(d){
    return {x:Number(d.x),y:Number(d.y)}
  });
  nwarr.push(arr)
  rObj['label'] = obj.name
  rObj['data'] = nwarr[0];
  rObj['backgroundColor'] = `rgba(${colors[i]}, 0.2)`;
  rObj['borderColor'] = `rgba(${colors[i]}, 1)`;
  rObj['borderWidth'] = 1;
  rObj['lineTension'] = 0.1;
  rObj['fill'] = true;
  return rObj;
});
//////////////////




const PDF = () => {
  
  const canvasRef = useRef(null)
  const [canvasBase64, setCanvasBase64] = useState() // '800px-Tux.svg.png' es el valor inicial para que ImagePDF no tire error 
  
  /// RETORNA EL GRAFIXO MIX (TODOS LOS GRAFICOS)
  const chartConfig = {
    type: "line",
    data: {
      labels: ["187", "188", "189", "190", "191", "192", "193", "194", "195", "196"],
      datasets: renderdata //// SE PASA EL OBJETO MAPEADO
    },
    options: {
      'onClick' : function (evt, item) {
        setCanvasBase64()
        setTimeout(() => {
        setCanvasBase64(canvasRef.current.toDataURL('image/png', 1.0))
        }, 500)
      },
      animation: {
        duration: 400
      },
      title: {
        display: true,
        text:'Grafico Mix',
        fontColor: "green"
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
            },
            beginAtZero: false
          }
        ]
      },
      legend: { 
        position: 'bottom',
      }
    }
  };

  /// RETORNA EL VALOR DEL OBJETO DEACUERDO AL INDEX
var renderloop = () => {
  graph.map(function(obj,i){
    const ctx = document.getElementById(`_Chart${i}`); // PINTA EL OBJETO EN EL DIV CORRESPONDIEBTE
    var rObj = {};
    let nwarr = []
    var arr = Object.values(obj.data).map(function(d){
      return {x:Number(d.x),y:Number(d.y)}
    });
    nwarr.push(arr)
    rObj['label'] = obj.name
    rObj['data'] = nwarr[0];
    rObj['backgroundColor'] = `rgba(${colors[3]}, 0.2)`;
    rObj['borderColor'] = `rgba(${colors[3]}, 1)`;
    rObj['borderWidth'] = 1;
    rObj['lineTension'] = 0.1;
    rObj['fill'] = true;
    new Chartjs(ctx, {
    type: "line",
    data: {
      labels: ["187", "188", "189", "190", "191", "192", "193", "194", "195", "196"],
      datasets: [
        rObj,
        {
          label: "lsc",
          data: [{y:obj.lsc,x:"187"},{y:obj.lsc,x:"196"}],
          borderColor : "rgb(255,0,0.1)",
          borderWidth: 1,
          fill:false,
          type: 'line'
        },
        {
          label: "lsm",
          data: [{y:obj.lsm,x:"187"},{y:obj.lsm,x:"196"}],
          borderColor : "rgb(255, 173, 51)",
          borderWidth: 1,
          fill:false,
          type: 'line'
        },
        {
          label: obj.lic,
          data: [{y:obj.lic,x:"187"},{y:obj.lic,x:"196"}],
          borderColor : "rgb(255,0,0.1)",
          borderWidth: 1,
          fill:false,
          type: 'line'
        },
        {
          label: obj.lim,
          data: [{y:obj.lim,x:"187"},{y:obj.lim,x:"196"}],
          borderColor : "rgb(255, 173, 51)",
          borderWidth: 1,
          fill:false,
          type: 'line'
        }
        
    ] //// SE PASA EL OBJETO MAPEADO
    },
    options: {
      'onClick' : function (evt, item) {
        console.log(evt)
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: obj.name,
        fontColor: "green"
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
            },
            beginAtZero: false
          }
        ]
      },
    }
    });
  })
  console.log('divs')
  
  
  return
}


  useEffect(() => {
    
    if (canvasRef && canvasRef.current) {
      new Chartjs(canvasRef.current, chartConfig)
      console.log('ref')
    }
    renderloop()
    const image = new Image()
    image.src = '800px-Tux.svg.png'
    image.onload = () => {
      setTimeout(() => {
      setCanvasBase64(canvasRef.current.toDataURL('image/png', 1.0))
    }, 500)
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
    },
    
  })


  const Report = () => (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View>
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
    <div style={{width: '40%', display: 'inline-block'}}>
    {
        React.Children.toArray(
          graph.map((item, i) => 
          <canvas id={`_Chart${i}`} />)
        )
      }
    </div>
    <div style={{width: '60%', height: '99vh', display: 'inline-block', float: 'left'}}>
      <canvas style={{ display: '' }} ref={canvasRef} />
      {canvasBase64 ?
          <PDFViewer style={{ width: '100%', height: '64vh' }}>
            <Report />
        </PDFViewer> : <p>cargando ...</p>}
    </div>
    </>
  )
}

  export default PDF

