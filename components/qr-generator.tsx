'use client'

import * as React from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QRGenerator() {
  const [text, setText] = React.useState("")
  const [type, setType] = React.useState("qr")
  const [size, setSize] = React.useState(256)

  const downloadQR = () => {
    const svg = document.getElementById('qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `${type}-code.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <Label htmlFor="type">Code Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="qr">QR Code</SelectItem>
            <SelectItem value="barcode">Barcode</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="text">Enter Text</Label>
        <Input
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to generate code"
        />
      </div>

      <div>
        <Label htmlFor="size">Size</Label>
        <Select value={size.toString()} onValueChange={(value) => setSize(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="128">Small (128x128)</SelectItem>
            <SelectItem value="256">Medium (256x256)</SelectItem>
            <SelectItem value="512">Large (512x512)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {text && (
        <div className="flex flex-col items-center space-y-4">
          <div className="border p-4 rounded-lg bg-white">
            <QRCodeSVG
              id="qr-code"
              value={text}
              size={size}
              level="H"
              includeMargin
            />
          </div>
          <Button onClick={downloadQR}>Download Code</Button>
        </div>
      )}
    </div>
  )
}

