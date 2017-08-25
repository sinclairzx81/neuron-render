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

import { Matrix, Vector4, Vector2 } from "../math/index"
import { Context } from "./context"
import { Camera  } from "./camera"
import { Mesh    } from "./mesh"

//--------------------------------------------------------------
// begin: graphics pipeline stuff
//--------------------------------------------------------------
/**
 * computes triangle visibility of the given clipspace positions.
 * @param {Vector2} v0 the first vector.
 * @param {Vector2} v1 the first vector.
 * @param {Vector2} v2 the first vector.
 * @returns {boolean}
 */
const visible = (v0: Vector2, v1: Vector2, v2: Vector2): boolean => 
  (((v1.v[0] - v0.v[0]) * 
    (v2.v[1] - v0.v[1])) - 
    ((v1.v[1] - v0.v[1]) * 
    (v2.v[0] - v0.v[0])) >= 0) ? true : false

/**
 * standard vertex shader pipeline, accepts camera uniforms and vertex to transform.
 * @param {Matrix} model the model matrix.
 * @param {Matrix} view the view matrix
 * @param {Matrix} projection the projection matrix.
 * @param {Vector4} vector the vector to project.
 * @returns {Vector4}
 */
const vertexshader = (model: Matrix, view: Matrix, projection: Matrix, vector: Vector4): Vector4 => {
  const vp        = Matrix.mul(view, projection)
  const vm        = Vector4.transform(vector, model)
  const position  = Vector4.transform(vm, vp)
  return position
}

/**
 * projects the vertex shader output vector into clipspace.
 * @param {number} width the width of the clipspace (viewport width)
 * @param {number} height the height of the clipspace (viewport height) 
 * @param {Vector4} vector the vector to project.
 * @returns {Vector2} 
 */
const clipspace = (width: number, height: number, vector: Vector4): Vector2 => {
  return new Vector2(
    ((vector.v[0] / vector.v[3]) * width)  + (width  / 2),
    ((vector.v[1] / vector.v[3]) * height) + (height / 2), 
  )
}

//--------------------------------------------------------------
// end: graphics pipeline stuff
//--------------------------------------------------------------

/**
 * Renderer Override Functions
 * 
 * The following functions can be overridden on the renderer, allowing the caller
 * to implement their own stages. By default the renderer binds the functions 
 * above as reasonable defaults.
 */
export type RendererVertexShaderFunction = (model: Matrix, view: Matrix, projection: Matrix, vector: Vector4) => Vector4
export type RendererClipSpaceFunction    = (width: number, height: number, vector: Vector4) => Vector2

/**
 * Renderer
 * 
 * Simple wireframe renderer, emulates a very basic vertex transform 
 * pipeline.
 */
export class Renderer {

  private context         : Context
  private vertexshaderfunc: RendererVertexShaderFunction
  private clipspacefunc   : RendererClipSpaceFunction

  /**
   * creates a new renderer at the given canvas element.
   * @param {HTMLCanvasElement} canvas the canvas element.
   * @returns {Renderer}
   */
  constructor(private canvas: HTMLCanvasElement) {
    this.context          = new Context(canvas)
    this.vertexshaderfunc = vertexshader
    this.clipspacefunc    = clipspace
  }

  /**
   * overrides the renderer vertex shader function.
   * @param {RendererVertexShaderFunction} func the vertex shader function.
   * @returns {void} 
   */
  public vertexshader(func: RendererVertexShaderFunction) {
    this.vertexshaderfunc = func
  }

  /**
   * overrides the renderer clipspace function.
   * @param {RendererClipSpaceFunction} 
   * @returns {void} 
   */
  public clipspace(func: RendererClipSpaceFunction) {
    this.clipspacefunc = func
  }

  /**
   * clears this renderer.
   * @param {string} color the color to clear with.
   * @returns {void}
   */
  public clear(color: string): void {
    this.context.clear(color)
  }

  /**
   * renders a object with the given camera and mesh.
   * @param {Camera} camera the camera to render with.
   * @param {Mesh} mesh the mesh to render.
   * @returns {void}
   */
  public render(camera: Camera, mesh: Mesh): void {
    for(let i = 0; i < mesh.geometry.indices.length; i+= 3) {
      const v0 = mesh.geometry.positions[mesh.geometry.indices[i+0]]
      const v1 = mesh.geometry.positions[mesh.geometry.indices[i+1]]
      const v2 = mesh.geometry.positions[mesh.geometry.indices[i+2]]

      // process this triangles vertices with the mesh, view and projection.
      const vs0 = this.vertexshaderfunc(mesh.matrix, camera.view, camera.projection, v0)
      const vs1 = this.vertexshaderfunc(mesh.matrix, camera.view, camera.projection, v1)
      const vs2 = this.vertexshaderfunc(mesh.matrix, camera.view, camera.projection, v2)
      
      // project this triangle into clipspace.
      const cs0 = this.clipspacefunc(this.context.width(), this.context.height(), vs0)
      const cs1 = this.clipspacefunc(this.context.width(), this.context.height(), vs1)
      const cs2 = this.clipspacefunc(this.context.width(), this.context.height(), vs2)
      if(visible(cs0, cs1, cs2)) {
        this.context.triangle(
          cs0.v, 
          cs1.v, 
          cs2.v
        )
      }
    }
  }

  /**
   * submits draw commands to the canvas.
   * @returns {void}
   */
  public present(): void {
    this.context.present()
  }

  /**
   * discards the draw call.
   */
  public discard(): void {
    this.context.discard()
  }
}