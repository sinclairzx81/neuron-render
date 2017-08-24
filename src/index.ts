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

import { Matrix, Vector2, Vector3, Vector4 }    from "./math/index"
import { Renderer, Camera, CubeGeometry, Mesh } from "./graphics/index"
import { Network, Tensor, Trainer }             from "./network/index"
import { loadObj } from "./loader/index"

//-----------------------------------------------------------------
// User Interface:
//----------------------------------------------------------------
let training = false
let meshmode    = "cube"
const toggle = document.getElementById("toggle") as HTMLInputElement
const cube   = document.getElementById("cube")   as HTMLInputElement
const bunny  = document.getElementById("bunny")  as HTMLInputElement
cube.onclick   = () => { meshmode = "cube"  }
bunny.onclick  = () => { meshmode = "bunny" }
toggle.onclick = () => { 
  training = !training
  toggle.value = training
    ? "training projection network"
    : "projecting with network" 
}

//-----------------------------------------------------------------
// Neural Network: 
//-----------------------------------------------------------------
const network = new Trainer(new Network([
  new Tensor(4,  "tanh"),
  new Tensor(4,  "tanh"),
  new Tensor(4,  "tanh"),
  new Tensor(2,  "tanh")
]), {
  momentum: 0.01,
  step    : 0.0015
})

//-----------------------------------------------------------------
// Graphics Renderer:
//-----------------------------------------------------------------

const renderer  = new Renderer    (document.getElementById("canvas") as HTMLCanvasElement)

/**
 * training clipspace function. This function if invoked on a null pass through
 * through the renderer. Here we backprop on the input / output.
 * @param {number} width the width of the clipspace (viewport width)
 * @param {number} height the height of the clipspace (viewport height) 
 * @param {Vector4} vector the vector to project.
 * @returns {Vector2} 
 */
const training_function = (width: number, height: number, vector: Vector4): Vector2 => {
  const input  = [
    (vector.v[0]),
    (vector.v[1]),
    (vector.v[2]),
    (vector.v[3])
  ]
  // default: train the network to approximate this.
  network.backward(input, [
    (vector.v[0] / vector.v[3]),
    (vector.v[1] / vector.v[3]) 
  ])
  return new Vector2(0, 0)
}

/**
 * default clip space pass through. uses the network to compute the clipspace transformation.
 * @param {number} width the width of the clipspace (viewport width)
 * @param {number} height the height of the clipspace (viewport height) 
 * @param {Vector4} vector the vector to project.
 * @returns {Vector2} 
 */
const approximation_function = (width: number, height: number, vector: Vector4): Vector2 => {
  const input  = [
    (vector.v[0]),
    (vector.v[1]),
    (vector.v[2]),
    (vector.v[3])
  ]
  const actual = network.forward(input)
  return new Vector2(
    (actual[0] * width) + (width  / 2), 
    (actual[1] * height)+ (height / 2) 
  )
}

/**
 * starts rendering stuff.
 */
const start = async () => {
  // load up assets
  const bunny = new Mesh(await loadObj("./assets/bunny.obj"))
  const cube  = new Mesh(await loadObj("./assets/cube.obj"))
  bunny.model = bunny.model.rotateZ(180 * (Math.PI / 180))
  cube.model  = cube.model.rotateZ(180 * (Math.PI / 180))

  // setup the camera
  const camera = new Camera ()
  camera.view = Matrix.lookAt(
    new Vector3 (0, 0, -2.5),
    new Vector3 (0, 0, 0),
    new Vector3 (0, 1, 0)
  )
  setInterval(() => {
    
    // select mesh
    const mesh = meshmode === "cube"  ? cube : bunny

    // rotate mesh...
    mesh.model = mesh.model
      .rotateX(0.01)
      .rotateY(0.01)
      .rotateZ(0.01)

    // if training, swap clipspace for training function
    // and discard the line command buffer. 
    if(training) {
      renderer.clipspace(training_function)
      renderer.render(camera, mesh)
      renderer.discard()
    }

    // render scene
    renderer.clipspace(approximation_function)
    renderer.clear("#FFF")
    renderer.render(camera, mesh)
    renderer.present()

  }, 1)
}

start().catch(console.log)