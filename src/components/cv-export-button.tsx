'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'

interface CVExportButtonProps {
  label: string
  cvRef: React.RefObject<HTMLDivElement | null>
  filename?: string
}

export function CVExportButton({ label, cvRef, filename = 'CV-Olivier-Jeannette.pdf' }: CVExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    if (!cvRef.current || isExporting) return

    setIsExporting(true)

    try {
      // Dynamic imports to avoid SSR issues
      const html2canvas = (await import('html2canvas-pro')).default
      const { jsPDF } = await import('jspdf')

      // Capture the CV content
      const canvas = await html2canvas(cvRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        // Remove animations and transitions for cleaner capture
        onclone: (document) => {
          const element = document.querySelector('[data-cv-content]') as HTMLElement
          if (element) {
            element.style.animation = 'none'
            element.style.transition = 'none'
          }
          // Hide elements not needed in PDF
          document.querySelectorAll('[data-print-hide]').forEach((el) => {
            (el as HTMLElement).style.display = 'none'
          })
        },
      })

      // Calculate dimensions for Letter size (8.5 x 11 inches)
      const imgWidth = 215.9 // Letter width in mm
      const pageHeight = 279.4 // Letter height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter', // North American standard
      })

      // Add image to PDF, handling multi-page if needed
      let heightLeft = imgHeight
      let position = 0
      const imgData = canvas.toDataURL('image/jpeg', 0.95)

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Save the PDF
      pdf.save(filename)
    } catch (error) {
      console.error('Error exporting CV:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="btn-primary print:hidden disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      {label}
    </button>
  )
}
