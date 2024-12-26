import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Button from '../components/Button';

const Pdf = ({data}) => {
const generatePDF = ({ NIT, EMPRESA, PREFIJO, COMPROBANTE, CLIENTE, NIT_CC, CUFE, DIAN, FECHA_EMISION, FECHA_VALIDACION, MAIL, FECHA_ENVIO, ASUNTO }) => {
  const documentDefinition = {
    content: [
      { text: 'Señores:', style: 'header' },
      { text: 'A QUIEN INTERESE', style: 'subHeader' },
      { text: 'Ciudad', style: 'subHeader' },
      { text: `Ref. Certificación de trazabilidad de envío del comprobante N.o ${COMPROBANTE}`, style: 'reference' },

      { text: `De acuerdo con la solicitud realizada, a continuación, se relaciona la trazabilidad del comprobante N.° ${COMPROBANTE} emitido por la empresa ${EMPRESA} Identificada con NIT ${NIT}, para la empresa ${CLIENTE} Identificada con CÉDULA ${NIT_CC}.`, style: 'content' },
      { text: `Certifica que el documento ha sido emitido en cumplimiento de los requisitos y condiciones establecidos en la Resolución 042 de 2020. De igual manera, se cumple con lo señalado en el artículo 2.2.2.53.5 del decreto 1349 de 2016, toda vez que el adquirente/pagador cuenta con capacidad para recibir el documento electrónicamente.`, style: 'content' },
      { text: `La información acá contenida es extraída de la base de datos de ${EMPRESA} y goza de plena fiabilidad en caso de requerir un peritaje electrónica cuenten con nuestra disposición para coordinar con su recurso asignado.`, style: 'content' },

      { text: '➢ Información del comprobante en ODOO NIT Prefijo', style: 'subHeader' },
      { text: `${NIT} ${PREFIJO}`, style: 'content' },

      { text: '➢ Información del Documento electrónico', style: 'subHeader' },
      {
        table: {
          widths: [ '*', '*', '*' ],
          body: [
            ['Tipo de Comprobante', 'Factura', ''],
            ['Número de Comprobante', COMPROBANTE, ''],
            ['Razón social del emisor', EMPRESA, NIT],
            ['Razón social del Receptor', CLIENTE, NIT_CC]
          ]
        },
        style: 'table'
      },

      { text: '➢ Información del estado del documento en la Dian', style: 'subHeader' },
      {
        table: {
          widths: [ '*', '*', '*' ],
          body: [
            ['CUFE', CUFE, ''],
            ['Registro DIAN', DIAN, ''],
            ['Fecha emisión', FECHA_EMISION, ''],
            ['Fecha validación', FECHA_VALIDACION, ''],
            ['Estado DIAN', 'AUTORIZADA', '']
          ]
        },
        style: 'table'
      },

      { text: '➢ Información del envío del Documento electrónico', style: 'subHeader' },
      {
        table: {
          widths: [ '*', '*', '*', '*' ],
          body: [
            ['Numero de Factura', COMPROBANTE, ''],
            ['Destinatario', CLIENTE, ''],
            ['Correo electrónico', MAIL, ''],
            ['Remitente', 'noreply@cascoloco.com', ''],
            ['Fecha de envío', FECHA_ENVIO, ''],
            ['Estado del envío', 'Procesado Correctamente', ''],
            ['Asunto', ASUNTO, '']
          ]
        },
        style: 'table'
      },

      { text: 'Cordialmente,', style: 'footer' },
      { text: 'Eugenio de Jesus Ramirez Ceballos', style: 'footer' },
      { text: 'Gerente General & Representante Legal', style: 'footer' },
      { text: 'C.C. No 15.429.220 de Marinilla', style: 'footer' },
      { text: 'Tel. 6017441911 ext 101 e-mail: info@distrifabrica.com', style: 'footer' },
      { text: 'www.distrifabrica.com', style: 'footer' }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 5]
      },
      subHeader: {
        fontSize: 14,
        margin: [0, 10, 0, 5]
      },
      reference: {
        fontSize: 16,
        italics: true,
        margin: [0, 10, 0, 5]
      },
      content: {
        fontSize: 12,
        margin: [0, 5, 0, 5]
      },
      table: {
        margin: [0, 10, 0, 10]
      },
      footer: {
        fontSize: 12,
        italics: true,
        margin: [0, 10, 0, 5]
      }
    }
  };

  pdfMake.createPdf(documentDefinition).download('Certificado_Envio.pdf');
};


// Llama a la función generatePDF en un evento, como un clic de botón
return (
    <div>
      <Button onClick={() => generatePDF(data)}/>
    </div>
  );

}; 

export default Pdf;
