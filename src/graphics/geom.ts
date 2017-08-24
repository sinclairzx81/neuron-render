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

import { Vector4 } from "../math/index"

/**
 * Geometry
 * 
 * common interface shared for all geometry types.
 */
export interface Geometry {
  positions : Vector4[]
  indices   : number[]
}

/**
 * CubeGeometry
 * The geometry for a simple cube. positions are encoded
 * linearily in vector4 with indices also linear with faces
 * offset (stride 3 for triangles)
 */
export class CubeGeometry implements Geometry {

  public positions: Vector4[]
  public indices  : number[]

  /**
   * constructs new cube geometry
   * @param scale 
   */
  constructor(scale: number) {
    this.positions = [
      /* front  */
      new Vector4(-scale, -scale, scale, 1.0),
      new Vector4(scale, -scale, scale, 1.0),
      new Vector4(scale, scale, scale, 1.0),
      new Vector4(-scale, scale, scale, 1.0),
      /* back   */
      new Vector4(-scale, -scale, -scale, 1.0),
      new Vector4(-scale, scale, -scale, 1.0),
      new Vector4(scale, scale, -scale, 1.0),
      new Vector4(scale, -scale, -scale, 1.0),
      /* top    */
      new Vector4(-scale, scale, -scale, 1.0),
      new Vector4(-scale, scale, scale, 1.0),
      new Vector4(scale, scale, scale, 1.0),
      new Vector4(scale, scale, -scale, 1.0),
      /* bottom */
      new Vector4(-scale, -scale, -scale, 1.0),
      new Vector4(scale, -scale, -scale, 1.0),
      new Vector4(scale, -scale, scale, 1.0),
      new Vector4(-scale, -scale, scale, 1.0),
      /* right  */
      new Vector4(scale, -scale, -scale, 1.0),
      new Vector4(scale, scale, -scale, 1.0),
      new Vector4(scale, scale, scale, 1.0),
      new Vector4(scale, -scale, scale, 1.0),
      /* left   */
      new Vector4(-scale, -scale, -scale, 1.0),
      new Vector4(-scale, -scale, scale, 1.0),
      new Vector4(-scale, scale, scale, 1.0),
      new Vector4(-scale, scale, -scale, 1.0)
    ]
    this.indices = [
     /* front  */ 0, 1, 2, 0, 2, 3,
     /* back   */ 4, 5, 6, 4, 6, 7,
     /* top    */ 8, 9, 10, 8, 10, 11,
     /* bottom */ 12, 13, 14, 12, 14, 15,
     /* right  */ 16, 17, 18, 16, 18, 19,
     /* left   */ 20, 21, 22, 20, 22, 23
    ]
  }
}