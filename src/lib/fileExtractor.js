import mammoth from 'mammoth'

export async function extractTextFromFile(file, onProgress) {
  const ext = file.name.split('.').pop().toLowerCase()
  onProgress?.('Reading file…', 10)

  if (ext === 'txt') {
    const text = await file.text()
    onProgress?.('Text extracted.', 100)
    return text
  }

  if (ext === 'docx') {
    onProgress?.('Parsing .docx…', 30)
    const arrayBuffer = await file.arrayBuffer()
    const options = {
        styleMap: [
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh"
        ]
    };
    const result = await mammoth.convertToHtml({ arrayBuffer }, options)
    
    // Map the explicitly styled HTMl tags into hardcoded marker strings for the dev analyzer
    let text = result.value
      .replace(/<h1>(.*?)<\/h1>/gi, '\n\nCHAPTER_BREAK_MARKER: $1\n\n')
      .replace(/<h2>(.*?)<\/h2>/gi, '\n\nPOV_MARKER: $1\n\n')
      .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<[^>]+>/g, ''); // Strip remaining inline HTML tags
      
    onProgress?.('Done.', 100)
    return text
  }

  if (ext === 'pdf') {
    onProgress?.('Loading PDF parser…', 15)
    const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist')
    GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs'
    onProgress?.('Reading PDF pages…', 25)
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await getDocument({ data: new Uint8Array(arrayBuffer) }).promise
    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      onProgress?.(`Page ${i}/${pdf.numPages}…`, 25 + Math.round((i / pdf.numPages) * 70))
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      text += content.items.map((item) => item.str).join(' ') + '\n'
    }
    onProgress?.('PDF extracted.', 100)
    return text
  }

  throw new Error(`Unsupported file type: .${ext}`)
}
