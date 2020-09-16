import React, { useState, useEffect, useRef } from 'react'
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from '@react-pdf/renderer'
// import Barcode from 'react-barcode'


import JsBarcode from 'jsbarcode'

// Forms

// import Barcode from './barcode'

// Data que vendría desde el back-end
const data = {
  sample: {
    id: 345678,
    date: '06/06/2006',
    priority: 'Normal'
  },
  component: {
    tag: 'TEST-1234A'
  },
  lubricant: {
    name: 'MOBIL-1234'
  },
  client: 'MCM-R07'  
}


const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    margin: 0,
    fontSize: 7,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
})

const Label = () => {
  const [isReady, setIsReady] = useState()
  
  const ref = useRef()

  const { sample, component, lubricant, client } = data

  
  useEffect(() => {

    // Valor que iría en el vódigo de barra
    const value = `${'0'.repeat(12 - sample.id.toString().length)}${sample.id.toString()}`

    // Esta función dibuja el código de barra en el canvas entregado por ref.current
    new JsBarcode(
      ref.current,
      value,
      Object.assign({}, { format: 'EAN13' }),
    )

    const timer = setTimeout(() => {
      setIsReady(true)
    }, 100);
    return () => clearTimeout(timer);
  }, [])

  return (
    <>
    <canvas style={{ display: 'none' }} ref={ref} />
      <PDFViewer style={{ width: '500px', height: '400px' }}>
        <Document>
          <Page
            size={{ height: 128, width: 284 }}
            style={styles.page}
          >
            <View style={styles.flexRow}>
              {/* Info ------------------- */}
              <View
                style={{
                  width: '70%',
                }}
              >
                {/* UP */}
                <View
                  style={{
                    width: '100%',
                    height: '15mm',
                    textAlign: 'right',
                    marginLeft: 'auto',
                  }}
                >
                  <Text style={{ paddingVertical: 2, fontSize: 6 }}>
                    {sample.date}
                  </Text>
                  <Text>{sample.priority}</Text>
                </View>
                {/* MIDDLE */}
                <View style={styles.flexRow}>
                  <View
                    style={{
                      width: '30%',
                      fontSize: 6,
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 1,
                      }}
                    >
                      Número Muestra:
                    </Text>
                    <Text
                      style={{
                        paddingVertical: 1,
                      }}
                    >
                      TAG:
                    </Text>
                    <Text
                      style={{
                        paddingVertical: 1,
                      }}
                    >
                      Lubricante:
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '70%',
                      fontWeight: 'bold',
                      fontSize: 8,
                    }}
                  >
                    <Text>{sample.id}</Text>
                    <Text>{component.tag}</Text>
                    <Text>{lubricant.name}</Text>
                  </View>
                </View>
                {/* BOTTOM */}
                <View style={styles.flexRow}>
                  <View
                    style={{
                      width: '30%',
                      fontSize: 6,
                    }}
                  >
                    <Text>Cliente:</Text>
                  </View>
                  <View
                    style={{
                      width: '70%',
                      fontSize: 6,
                    }}
                  >
                    <Text>{client}</Text>
                  </View>
                </View>
              </View>
              {/* Barcode ---------------- */}
              <View
                style={{
                  width: '30%',
                }}
              >
                {isReady ? <Image style={{transform: { rotate: '90deg'}}} src={ref.current.toDataURL()} /> : <Text style={{color: 'red', textAlign: 'right'}}>barcode goes here</Text>}
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  )
}

export default Label

