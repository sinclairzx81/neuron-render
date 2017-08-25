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
  positions: Vector4[]
  indices: number[]
}

/**
 * CubeGeometry
 * 
 * The geometry for a simple cube. positions are encoded
 * linearily in vector4 with indices also linear with faces
 * offset (stride 3 for triangles)
 */
export class CubeGeometry implements Geometry {

  public positions: Vector4[]
  public indices: number[]

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

/**
 * WaveFrontGeometry
 * 
 * Provides wavefront (.obj) geometry. Asynchronously loads
 * the wave front document and replaces a placeholder cube
 * with the geometry once loaded.
 */
export class WaveFrontGeometry extends CubeGeometry {

  /**
   * creates a new wave from geometry.
   * @param {string} filename path to wavefront geometry.
   */
  constructor(private filename: string) {
    super(1.0)
    this.load(this.filename).catch(console.log)
  }
  /**
   * loads the given obj file format.
   * @param {string} filename the file to load.
   * @returns {Geometry}
   */
  private load(filename: string): Promise<any> {
    return fetch(filename).then(res => res.text()).then(text => {

      // processes the file into an array of lines, where each
      // line is in itself an array of components expressed on
      // that line (string[][])
      const rows = text.split("\n").map(line => line.split(" ").filter(n => n.length > 0))

      // preprocess the document, we are loadding to calculate
      // line counts, and the face indexing mode. Note that 
      // blender may export either quads or triangles indicated
      // by the number of elements on a row.
      let vertexCount = 0
      let faceCount   = 0
      let faceMode    = "tri"
      let firstFace   = true
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        switch (row[0]) {
          case "v": { 
            vertexCount += 1; 
            break; 
          }
          case "f": {
            if (firstFace) {
              firstFace = false
              if (row.length === 4) {
                faceMode = "tri"
              } else if (row.length === 5) {
                faceMode = "quad"
              }
            }
            faceCount += 1
            break
          }
        }
      }

      // based on the indexing mode, we can calculate
      // the number of indices required. In the quad
      // case (which is expressed as 4 rows) we allocate
      // 6 indices for the face (0, 1, 2, 2, 3, 0).
      const indexCount = (faceMode === "quad")
        ? (faceCount * 6)
        : (faceCount * 3)

      // generate fixed sized buffers and populate 
      // buffers from the extracted rows (second pass)
      const positions   = new Array(vertexCount)
      const indices     = new Array(indexCount)
      let positionIndex = 0
      let indicesIndex  = 0
      for (let i = 0; i < rows.length; i++) {
        const line = rows[i]
        switch (line[0]) {
          case "v":
            positions[positionIndex] = new Vector4 (
              parseFloat(line[1]),
              parseFloat(line[2]),
              parseFloat(line[3]),
              1.0
            ); positionIndex += 1
            break;
          case "f": {
            if (faceMode === "tri") {
              const a = parseInt(line[1].split("/")[0]) - 1
              const b = parseInt(line[2].split("/")[0]) - 1
              const c = parseInt(line[3].split("/")[0]) - 1
              indices[indicesIndex + 0] = a
              indices[indicesIndex + 1] = b
              indices[indicesIndex + 2] = c
              indicesIndex += 3
            } else if (faceMode === "quad") {
              const a = parseInt(line[1].split("/")[0]) - 1
              const b = parseInt(line[2].split("/")[0]) - 1
              const c = parseInt(line[3].split("/")[0]) - 1
              const d = parseInt(line[4].split("/")[0]) - 1
              indices[indicesIndex + 0] = a
              indices[indicesIndex + 1] = b
              indices[indicesIndex + 2] = c
              indices[indicesIndex + 3] = c
              indices[indicesIndex + 4] = d
              indices[indicesIndex + 5] = a
              indicesIndex += 6
            }
          }
          break;
        }
      }

      // over write the placeholder geometry (a cube) with
      // the loaded positions and indices.
      this.positions = positions
      this.indices   = indices
    })
  }
}