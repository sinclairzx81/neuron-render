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

import {Geometry} from "../graphics/geom"
import {Vector4}  from "../math/vector4"
/**
 * loads the given obj file format.
 * @param {string} filename the file to load.
 * @returns {Geometry}
 */
export const loadObj = (filename: string) => fetch(filename).then(response => response.text()).then(text => {
  // process the file.
  const lines = text.split("\n").map(line => {
    return line.split(" ").filter(n => n.length > 0)
  })

  // prescan for array counts.
  let vertexCount = 0
  let faceCount   = 0
  let faceMode    = "tri"
  let firstFace   = true
  for(let i = 0; i < lines.length; i++) {
    const line = lines[i]
    switch(line[0]) {
      case "v": vertexCount += 1; break;
      case "f": {
        if(firstFace) {
          firstFace = false
          if(line.length === 4) {
            faceMode = "tri"
          } else if(line.length === 5) {
            faceMode = "quad"
          }
        }
        faceCount += 1; 
        break;
      }
    }
  }

  // calculate the index count.
  const indexCount = (faceMode === "quad") 
    ? faceCount * 6
    : faceCount * 3
  
  // parse out positions and vertices.
  const positions = new Array(vertexCount)
  const indices   = new Array(indexCount)
  let   positionIndex = 0
  let   indicesIndex  = 0
  for(let i = 0; i < lines.length; i++) {
    const line = lines[i]
    switch(line[0]) {
      case "v": 
        positions[positionIndex] = new Vector4(
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
  return {
    positions,
    indices
  }
})