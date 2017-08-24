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
import { Device } from "./device"
import { Camera } from "./camera"
import { Mesh }   from "./mesh"

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



/**
 * renders a mesh with the given device and camera.
 * @param {Device} device the line drawing device.
 * @param {Camera} camera the camera.
 * @param {Mesh} mesh the mesh to render.
 * @returns {void}
 */
const render = (device: Device, camera: Camera, mesh: Mesh): void => {
  for(let i = 0; i < mesh.geometry.indices.length; i+= 3) {
    const v0 = mesh.geometry.positions[mesh.geometry.indices[i+0]]
    const v1 = mesh.geometry.positions[mesh.geometry.indices[i+1]]
    const v2 = mesh.geometry.positions[mesh.geometry.indices[i+2]]
    const vs0 = vertexshader(mesh.model, camera.view, camera.projection, v0)
    const vs1 = vertexshader(mesh.model, camera.view, camera.projection, v1)
    const vs2 = vertexshader(mesh.model, camera.view, camera.projection, v2)
    const cs0 = clipspace(device.width(), device.height(), vs0)
    const cs1 = clipspace(device.width(), device.height(), vs1)
    const cs2 = clipspace(device.width(), device.height(), vs2)
    device.line(cs0, cs1)
    device.line(cs1, cs2)
    device.line(cs2, cs0)
  }
}

//--------------------------------------------------------------
// end: graphics pipeline stuff
//--------------------------------------------------------------
export type RendererVertexShaderFunction = (model: Matrix, view: Matrix, projection: Matrix, vector: Vector4) => Vector4
export type RendererClipSpaceFunction    = (width: number, height: number, vector: Vector4) => Vector2

/**
 * Renderer
 * 
 * Simple wireframe renderer
 */
export class Renderer {

  private device: Device
  
  private vertexshaderfunc: RendererVertexShaderFunction
  private clipspacefunc   : RendererClipSpaceFunction

  /**
   * creates a new renderer at the given canvas element.
   * @param {HTMLCanvasElement} canvas the canvas element.
   * @returns {Renderer}
   */
  constructor(private canvas: HTMLCanvasElement) {
    this.device = new Device(canvas)
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
    this.device.clear(color)
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
      const vs0 = vertexshader(mesh.model, camera.view, camera.projection, v0)
      const vs1 = vertexshader(mesh.model, camera.view, camera.projection, v1)
      const vs2 = vertexshader(mesh.model, camera.view, camera.projection, v2)
      const cs0 = this.clipspacefunc(this.device.width(), this.device.height(), vs0)
      const cs1 = this.clipspacefunc(this.device.width(), this.device.height(), vs1)
      const cs2 = this.clipspacefunc(this.device.width(), this.device.height(), vs2)
      if(visible(cs0, cs1, cs2)) {
        this.device.line(cs0, cs1)
        this.device.line(cs1, cs2)
        this.device.line(cs2, cs0)
      }
    }
  }

  /**
   * submits draw commands to the canvas.
   * @returns {void}
   */
  public present(): void {
    this.device.present()
  }

  /**
   * discards the draw call.
   */
  public discard(): void {
    this.device.discard()
  }
}