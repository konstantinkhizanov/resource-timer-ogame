// Renders the extension icon (dark OGame-blue tile with an orange hourglass) at several sizes.
// Usage: swift tools/make-icons.swift <outdir> <size>...
import AppKit

func render(_ size: Int, to path: String) {
  let s = CGFloat(size)
  let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: size, pixelsHigh: size, bitsPerSample: 8,
                             samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB,
                             bytesPerRow: 0, bitsPerPixel: 0)!
  NSGraphicsContext.saveGraphicsState()
  NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)

  // Tile
  let inset = max(0.5, s * 0.015)
  let tile = NSBezierPath(roundedRect: NSRect(x: 0, y: 0, width: s, height: s).insetBy(dx: inset, dy: inset), xRadius: s * 0.2, yRadius: s * 0.2)
  NSGradient(starting: NSColor(red: 0.20, green: 0.29, blue: 0.42, alpha: 1),
             ending: NSColor(red: 0.06, green: 0.09, blue: 0.14, alpha: 1))!.draw(in: tile, angle: -90)
  NSColor(red: 0.35, green: 0.46, blue: 0.62, alpha: 1).setStroke()
  tile.lineWidth = max(1, s * 0.03)
  tile.stroke()

  // Hourglass
  let l = s * 0.3, r = s * 0.7, top = s * 0.8, bot = s * 0.2, mid = s * 0.5, neck = s * 0.04
  let glass = NSBezierPath()
  glass.move(to: NSPoint(x: l, y: top)); glass.line(to: NSPoint(x: r, y: top))
  glass.line(to: NSPoint(x: mid + neck, y: mid)); glass.line(to: NSPoint(x: r, y: bot))
  glass.line(to: NSPoint(x: l, y: bot)); glass.line(to: NSPoint(x: mid - neck, y: mid)); glass.close()
  NSColor(red: 1, green: 0.59, blue: 0, alpha: 1).setStroke()
  glass.lineWidth = max(1.2, s * 0.06)
  glass.lineJoinStyle = .round
  glass.stroke()

  // Sand (bottom pile + top remainder)
  NSColor(red: 1, green: 0.75, blue: 0.3, alpha: 1).setFill()
  let pile = NSBezierPath()
  pile.move(to: NSPoint(x: l + s * 0.06, y: bot + s * 0.03)); pile.line(to: NSPoint(x: r - s * 0.06, y: bot + s * 0.03))
  pile.line(to: NSPoint(x: mid, y: bot + s * 0.17)); pile.close(); pile.fill()
  let rest = NSBezierPath()
  rest.move(to: NSPoint(x: l + s * 0.13, y: top - s * 0.14)); rest.line(to: NSPoint(x: r - s * 0.13, y: top - s * 0.14))
  rest.line(to: NSPoint(x: mid, y: mid + s * 0.05)); rest.close(); rest.fill()

  NSGraphicsContext.restoreGraphicsState()
  try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: path))
}

let args = CommandLine.arguments
for size in args.dropFirst(2) { render(Int(size)!, to: "\(args[1])/icon-\(size).png") }
