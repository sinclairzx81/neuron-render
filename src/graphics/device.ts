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

import { Vector2 } from "../math/index"

/**
 * Line:
 * 
 * internal representation of a line.
 */
export type Line = {
  from  : [number, number],
  to    : [number, number],
  color : string,
  width : number
}

/**
 * Device
 * 
 * low level line drawing device. Used by the renderer to 
 * render rasterlized lines to the frame.
 */
export class Device {
  private context   : CanvasRenderingContext2D
  private linebuf   : Array<Line>
  private linecount : number

  /**
   * creates a new canvas rendering device.
   * @param {HTMLCanvasElement} canvas the html canvas element
   * @returns {Device}
   */
  constructor(private canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext("2d")
    this.linecount = 0
    this.linebuf = new Array(300000)
    for(let i = 0; i < this.linebuf.length; i++) {
      this.linebuf[i] = {
        from  : [0, 0],
        to    : [0, 0],
        color : "black",
        width : 1
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
   * @param {Vector2} from the from position of this line.
   * @param {Vector2} to the to position of this line.
   * @param {string} color the color of this line (defaults to blach)
   * @param {number} width the width of the line (defaults to 1.0)
   * @returns {void}
   */
  public line(from: Vector2, to: Vector2, color: string = "#000000", width: number = 1.0) {
    if(this.linecount === this.linebuf.length) return // ignored
    this.linebuf[this.linecount] = {
      from : [from.v[0], from.v[1]],
      to   : [to.v  [0], to.v  [1]],
      color: color,
      width: width
    }; this.linecount += 1
  }

  /**
   * presents this device to the framebuffer.
   * @returns {void}
   */
  public present() {
    this.context.beginPath()
    for(let i = 0; i < this.linecount; i++) {
      const from = this.linebuf[i].from
      const to   = this.linebuf[i].to
      this.context.moveTo(from[0], from[1])
      this.context.lineTo(to[0],   to[1])
      
    }
    this.context.strokeStyle = "#000"
    this.context.stroke()
    this.linecount = 0
  }

  public discard():void{
    this.linecount = 0
  }
}