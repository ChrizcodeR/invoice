import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { imageToBase64 } from "../tools/imagenconverter";
import axios from "axios";

// Inicializar fuentes para pdfmake
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Pdf = ({ data }) => {
  const [base64Image, setBase64Image] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const base64 = await imageToBase64("/assets/avatar.jpg");
        setBase64Image(base64);
      } catch (err) {
        console.error("Error al convertir la imagen a Base64:", err);
      }
    };
    loadImage();
  }, []);

  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(1900, 0, 1);
    const daysOffset = serial - 2; // Ajuste para fecha de Excel
    return new Date(excelEpoch.setDate(excelEpoch.getDate() + daysOffset));
  };

  const generatePDF = async (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Datos no válidos:", data);
      return;
    }

    setIsGenerating(true);

    try {
      // Generar todos los PDFs como Blobs
      const pdfPromises = data.map(async (item, index) => {
        const {
          NIT = "",
          EMPRESA = "",
          PREFIJO = "",
          COMPROBANTE = "",
          CLIENTE = "",
          NIT_CC = "",
          CUFE = "",
          DIAN = "",
          "FECHA EMISION": FECHA_EMISION_RAW = "",
          "FECHA VALIDACIÓN": FECHA_VALIDACION_RAW = "",
          MAIL = "",
          "FECHA DE ENVIO": FECHA_ENVIO_RAW = "",
          ASUNTO = "",
        } = item;

        // Convertir fechas de Excel
        const FECHA_EMISION = FECHA_EMISION_RAW
          ? excelDateToJSDate(FECHA_EMISION_RAW).toLocaleDateString()
          : "";

        const FECHA_VALIDACION = FECHA_VALIDACION_RAW
          ? excelDateToJSDate(FECHA_VALIDACION_RAW).toLocaleDateString()
          : "";

        const FECHA_ENVIO = FECHA_ENVIO_RAW
          ? excelDateToJSDate(FECHA_ENVIO_RAW).toLocaleDateString()
          : "";
          const documentDefinition = {
            content: [
              {
                image: base64Image, // Llama la imagen convertida a base64.
                width: 100, // Ancho de la imagen
                absolutePosition: { x: 450, y: 10 }, // Posición superior derecha
              },
              { text: "Señores:", style: "header" },
              { text: "A QUIEN INTERESE", style: "subHeader" },
              { text: "Ciudad", style: "subHeader" },
              {
                text: `Ref. Certificación de trazabilidad de envío del comprobante N.o ${PREFIJO}${COMPROBANTE}`,
                style: "reference",
              },
              {
                text: `De acuerdo con la solicitud realizada, a continuación, se relaciona la trazabilidad del comprobante N.° ${COMPROBANTE} emitido por la empresa ${EMPRESA} Identificada con NIT ${NIT}, para la empresa ${CLIENTE} Identificada con CÉDULA ${NIT_CC}.`,
                style: "content",
              },
              {
                text: `Certifica que el documento ha sido emitido en cumplimiento de los requisitos y condiciones establecidos en la Resolución 042 de 2020. De igual manera, se cumple con lo señalado en el artículo 2.2.2.53.5 del decreto 1349 de 2016, toda vez que el adquirente/pagador cuenta con capacidad para recibir el documento electrónicamente.`,
                style: "content",
              },
              {
                text: `La información acá contenida es extraída de la base de datos de ${EMPRESA} y goza de plena fiabilidad en caso de requerir un peritaje electrónica cuenten con nuestra disposición para coordinar con su recurso asignado.`,
                style: "content",
              },
              {
                text: "* Información del comprobante en ODOO",
                style: "subHeader",
              },
              {
                table: {
                  widths: ["*", "*"],
                  body: [
                    [
                      { text: "NIT", style: "fonts" },
                      { text: NIT, style: "fonts" },
                    ],
                    [
                      { text: "Prefijo", style: "fonts" },
                      { text: PREFIJO, style: "fonts" },
                    ],
                    [
                      { text: "Tipo de Comprobante", style: "fonts" },
                      { text: "Factura", style: "fonts" },
                    ],
                    [
                      { text: "Número de Comprobante", style: "fonts" },
                      { text: COMPROBANTE, style: "fonts" },
                    ],
                  ],
                },
                style: "table",
              },

              {
                text: "* Información del Documento electrónico",
                style: "subHeader",
              },
              {
                table: {
                  widths: ["*", "*"],
                  body: [
                    [
                      { text: "Tipo de Comprobante", style: "fonts" },
                      { text: "Factura", style: "fonts" },
                    ],
                    [
                      { text: "Número de Comprobante", style: "fonts" },
                      { text: `${PREFIJO}${COMPROBANTE}`, style: "fonts" },
                    ],
                    [
                      { text: "Razón social del emisor", style: "fonts" },
                      { text: EMPRESA, style: "fonts" },
                    ],
                    [
                      { text: "Nit de Emisor", style: "fonts" },
                      { text: NIT, style: "fonts" },
                    ],
                    [
                      { text: "Razón social del Receptor", style: "fonts" },
                      { text: CLIENTE, style: "fonts" },
                    ],
                  ],
                },
                style: "table",
              },
              {
                text: "* Información del envío del Documento electrónico",
                style: "subHeader",
              },
              {
                table: {
                  widths: ["*", "*"],
                  body: [
                    [
                      { text: "Numero de Factura", style: "fonts" },
                      { text: `${PREFIJO}${COMPROBANTE}`, style: "fonts" },
                    ],
                    [
                      { text: "Destinatario", style: "fonts" },
                      { text: CLIENTE, style: "fonts" },
                    ],
                    [
                      { text: "Correo electrónico", style: "fonts" },
                      { text: MAIL, style: "fonts" },
                    ],
                    [
                      { text: "Remitente", style: "fonts" },
                      { text: "noreply@cascoloco.com", style: "fonts" },
                    ],
                    [
                      { text: "Fecha de envío", style: "fonts" },
                      { text: FECHA_ENVIO, style: "fonts" },
                    ],
                    [
                      { text: "Estado del envío", style: "fonts" },
                      { text: "Procesado Correctamente", style: "fonts" },
                    ],
                    [
                      { text: "Asunto", style: "fonts" },
                      { text: ASUNTO, style: "fonts" },
                    ],
                  ],
                },
                style: "table",
              },
              {
                text: "* Información del estado del documento en la Dian",
                style: "subHeader",
              },
              {
                table: {
                  widths: ["*", "auto"],
                  body: [
                    [
                      { text: "CUFE", style: "fonts" },
                      { text: CUFE, style: "cufe" },
                    ],
                    [
                      { text: "Registro DIAN", style: "fonts" },
                      { text: `${DIAN}`, style: "cufe" },
                    ],
                    [
                      { text: "Fecha emisión", style: "fonts" },
                      { text: `${FECHA_EMISION}`, style: "cufe" },
                    ],
                    [
                      { text: "Fecha validación", style: "fonts" },
                      { text: `${FECHA_VALIDACION}`, style: "cufe" },
                    ],
                    [
                      { text: "Estado DIAN", style: "fonts" },
                      { text: "AUTORIZADO", style: "cufe" },
                    ],
                  ],
                },
                style: "table",
              },
              { text: "Cordialmente,", style: "footer2" },
              { text: "Eugenio de Jesus Ramirez Ceballos", style: "footer" },
              { text: "Gerente General & Representante Legal", style: "footer" },
              { text: "C.C. No 15.429.220 de Marinilla", style: "footer" },
              {
                text: "Tel. 6017441911 ext 101 e-mail: info@distrifabrica.com",
                style: "footer",
              },
              { text: "www.distrifabrica.com", style: "footer" },
            ],
            styles: {
              header: {
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 5],
              },
              subHeader: {
                fontSize: 10,
                margin: [0, 10, 0, 5],
                bold: true,
              },
              reference: {
                fontSize: 10,
                italics: true,
                margin: [0, 10, 0, 5],
                bold: true,
              },
              content: {
                fontSize: 9,
                margin: [0, 5, 0, 5],
              },
              table: {
                margin: [0, 10, 0, 10],
              },
              footer: {
                fontSize: 9,
                italics: true,
                margin: [0, 10, -10, 5],
              },
              footer2: {
                fontSize: 9,
                italics: true,
                marginBottom: 50,
              },
              cufe: {
                fontSize: 6,
                italics: true,
              },

              fonts: {
                fontSize: 9,
              },
            },
          };
          // Generar Blob del PDF
        const pdf = pdfMake.createPdf(documentDefinition);
        const blob = await pdf.getBlob();
        return {
          blob,
          filename: `Certificado_Envio_${PREFIJO}${COMPROBANTE}_${index + 1}.pdf`
        };
      });

      const pdfFiles = await Promise.all(pdfPromises);

      // Preparar FormData para enviar al microservicio
      const formData = new FormData();
      pdfFiles.forEach(({ blob, filename }) => {
        formData.append("pdfs", blob, filename);
      });

      // Enviar al microservicio con Axios
      const response = await axios.post("https://microserviceinvoice-production.up.railway.app/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob" // Importante para recibir el ZIP
      });

      // Descargar el ZIP
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificados.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error en el proceso:", error);
      // Puedes agregar manejo de errores visual aquí
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <Button 
        onClick={() => generatePDF(data)}
        disabled={isGenerating || !base64Image}
        text={isGenerating ? "Generando..." : "Generar PDFs"}
      />
    </div>
  );
};

export default Pdf;