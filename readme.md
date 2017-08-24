### neuron-render

An experiment using neural networks to approximate various stages of graphics pipeline for the purpose of creating interesting things. [demo](https://sinclairzx81.github.io/neuron-render/)

### overview

neuron-render is a small experiment to play around with replacing various stages of a graphics pipeline with a neural network. The idea for this project was simply to see where and how a neural network could be applied to a traditional graphics pipeline, and ultimately what interesting effects could be created once applied. The project is written in typescript and is designed to run browsers (using canvas).

this project currently implements a network for v4 -> v2 screen space projections (in clipspace) (post vertex shader, pre rasterization), where the network is trained by observing a typical x/z, y/z projection. the network uses tanh (-1, 1) activation end to end.

This project is offered for anyone who finds it useful or interesting.

### building the project

You can start a development environment by running the following from the project root. The following will start a http server on ```http://localhost:5000```.

```
npm start
```





