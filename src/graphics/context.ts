/*--------------------------------------------------------------------------

neuron-render - experiments mixing neural networks and graphics pipelines.

The MIT License (MIT)

Copyright (c) 2016 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

/**
 * Triangle:
 * 
 * internal representation of a triangle.
 */
export type Triangle = {
  a: ArrayLike<number>,
  b: ArrayLike<number>,
  c: ArrayLike<number>,
  color: string
}
/**
 * Device
 * 
 * low level line drawing device. Used by the renderer to 
 * render rasterlized lines to the frame.
 */
export class Context {
  private context : CanvasRenderingContext2D
  private tribuf  : Array<Triangle>
  private tricount: number

  /**
   * creates a new canvas rendering device.
   * @param {HTMLCanvasElement} canvas the html canvas element
   * @returns {Context}
   */
  constructor(private canvas: HTMLCanvasElement) {
    this.context  = this.canvas.getContext("2d")
    this.tricount = 0
    this.tribuf   = new Array(100000)
    for (let i = 0; i < this.tribuf.length; i++) {
      this.tribuf[i] = {
        a    : [0, 0],
        b    : [0, 0],
        c    : [0, 0],
        color: "white"
      }
    }
  }

  /**
   * returns the width of this device.
   * @returns {number}
   */
  public width(): number {
    return this.canvas.width
  }

  /**
   * returns the height of this device.
   * @returns {number}
   */
  public height(): number {
    return this.canvas.height
  }

  /**
   * clears this device with the given color.
   * @param {string} color the color to clear with (default is white)
   * @returns {void}
   */
  public clear(color: string = "#FFFFFF"): void {
    this.context.fillStyle = color
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * queues a line to be drawn.
   * @param {[number, number]} a the a 2-component position of triangle.
   * @param {[number, number]} b the b 2-component position of triangle.
   * @param {[number, number]} c the c 2-component position of triangle.
   * @param {string} color the color of this line (defaults to black)
   * @param {number} width the width of the line (defaults to 1.0)
   * @returns {void}
   */
  public triangle(a: ArrayLike<number>, b:  ArrayLike<number>, c:  ArrayLike<number>, color: string = "#000000", width: number = 1.0) {
    if (this.tricount === this.tribuf.length) return // ignored
    this.tribuf[this.tricount] = { a: a,  b: b, c: c, color: color }; 
    this.tricount += 1
  }

  /**
   * presents this device to the framebuffer.
   * @returns {void}
   */
  public present() {
    // triangle drawing path
    this.context.beginPath()
    for(let i = 0; i < this.tricount; i++) {
      const a = this.tribuf[i].a
      const b = this.tribuf[i].b
      const c = this.tribuf[i].c
      this.context.moveTo(a[0], a[1])
      this.context.lineTo(b[0], b[1])
      this.context.lineTo(c[0], c[1])
    }
    this.context.fillStyle = "#BBB"
    this.context.fill()

    // line drawing path
    this.context.beginPath()
    for (let i = 0; i < this.tricount; i++) {
      const a = this.tribuf[i].a
      const b = this.tribuf[i].b
      const c = this.tribuf[i].c
      this.context.strokeStyle = "#F00"
      this.context.moveTo(a[0], a[1])
      this.context.lineTo(b[0], b[1])
      this.context.strokeStyle = "#0F0"
      this.context.moveTo(b[0], b[1])
      this.context.lineTo(c[0], c[1])
      this.context.strokeStyle = "#00F"
      this.context.moveTo(c[0], c[1])
      this.context.lineTo(a[0], a[1])
    }
    this.context.strokeStyle = "#000"
    this.context.stroke()
    this.tricount = 0
  }

  /**
   * discards drawing buffers. used primary
   * for training the pipeline via rendering,
   * ignored in the general case.
   * @returns {void}
   */
  public discard(): void {
    this.tricount  = 0
  }
}