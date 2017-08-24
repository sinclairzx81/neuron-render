(function () {
  var main = null;
  var modules = {
      "require": {
          factory: undefined,
          dependencies: [],
          exports: function (args, callback) { return require(args, callback); },
          resolved: true
      }
  };
  function define(id, dependencies, factory) {
      return main = modules[id] = {
          dependencies: dependencies,
          factory: factory,
          exports: {},
          resolved: false
      };
  }
  function resolve(definition) {
      if (definition.resolved === true)
          return;
      definition.resolved = true;
      var dependencies = definition.dependencies.map(function (id) {
          return (id === "exports")
              ? definition.exports
              : (function () {
                  if(modules[id] !== undefined) {
                    resolve(modules[id]);
                    return modules[id].exports;
                  } else {
                    try {
                      return require(id);
                    } catch(e) {
                      throw Error("module '" + id + "' not found.");
                    }
                  }
              })();
      });
      definition.factory.apply(null, dependencies);
  }
  function collect() {
      Object.keys(modules).map(function (key) { return modules[key]; }).forEach(resolve);
      return (main !== null) 
        ? main.exports
        : undefined
  }

  var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  var __generator = (this && this.__generator) || function (thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [0, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  };
  define("math/radian", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var Radian = (function () {
          function Radian() {
          }
          Radian.toAngle = function (radian) {
              return (radian * 57.29578);
          };
          Radian.toRadian = function (angle) {
              return (angle * 0.01745329);
          };
          return Radian;
      }());
      exports.Radian = Radian;
  });
  define("math/vector3", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var f32 = { max: 2147483647, min: -2147483647 };
      var v3i = { x: 0, y: 1, z: 2 };
      var qi = { x: 0, y: 1, z: 2, w: 3 };
      var mi = {
          m11: 0, m12: 1, m13: 2, m14: 3,
          m21: 4, m22: 5, m23: 6, m24: 7,
          m31: 8, m32: 9, m33: 10, m34: 11,
          m41: 12, m42: 13, m43: 14, m44: 15
      };
      var Vector3 = (function () {
          function Vector3(x, y, z) {
              this.v = new Float32Array(3);
              this.v[v3i.x] = x === undefined ? 0.0 : x;
              this.v[v3i.y] = y === undefined ? 0.0 : y;
              this.v[v3i.z] = z === undefined ? 0.0 : z;
          }
          Vector3.prototype.toString = function () {
              return "[" + this.v[v3i.x] + ", " + this.v[v3i.y] + ", " + this.v[v3i.z] + "]";
          };
          Vector3.prototype.typeName = function () {
              return "Vector3";
          };
          Vector3.prototype.clone = function () {
              return Vector3.clone(this);
          };
          Vector3.prototype.x = function (value) {
              if (value !== undefined) {
                  this.v[v3i.x] = value;
              }
              return this.v[v3i.x];
          };
          Vector3.prototype.y = function (value) {
              if (value !== undefined) {
                  this.v[v3i.y] = value;
              }
              return this.v[v3i.y];
          };
          Vector3.prototype.z = function (value) {
              if (value !== undefined) {
                  this.v[v3i.z] = value;
              }
              return this.v[v3i.z];
          };
          Vector3.prototype.length = function () {
              return Vector3.getLength(this);
          };
          Vector3.prototype.lengthSq = function () {
              return Vector3.getLengthSq(this);
          };
          Vector3.prototype.normalize = function () {
              return Vector3.normalize(this);
          };
          Vector3.prototype.dot = function (v0) {
              return Vector3.dot(this, v0);
          };
          Vector3.prototype.cross = function (v0) {
              return Vector3.cross(this, v0);
          };
          Vector3.prototype.add = function (v0) {
              return Vector3.add(this, v0);
          };
          Vector3.prototype.sub = function (v0) {
              return Vector3.sub(this, v0);
          };
          Vector3.prototype.mul = function (v0) {
              return Vector3.mul(this, v0);
          };
          Vector3.prototype.div = function (v0) {
              return Vector3.div(this, v0);
          };
          Vector3.prototype.scale = function (s0) {
              return Vector3.scale(this, s0);
          };
          Vector3.prototype.negate = function () {
              return Vector3.negate(this);
          };
          Vector3.zero = function () {
              return new Vector3(0.0, 0.0, 0.0);
          };
          Vector3.one = function () {
              return new Vector3(1.0, 1.0, 1.0);
          };
          Vector3.unitX = function () {
              return new Vector3(1.0, 0.0, 0.0);
          };
          Vector3.unitY = function () {
              return new Vector3(0.0, 1.0, 0.0);
          };
          Vector3.unitZ = function () {
              return new Vector3(0.0, 0.0, 1.0);
          };
          Vector3.left = function () {
              return new Vector3(-1.0, 0.0, 0.0);
          };
          Vector3.right = function () {
              return new Vector3(1.0, 0.0, 0.0);
          };
          Vector3.up = function () {
              return new Vector3(0.0, 1.0, 0.0);
          };
          Vector3.down = function () {
              return new Vector3(0.0, -1.0, 0.0);
          };
          Vector3.forward = function () {
              return new Vector3(0.0, 0.0, 1.0);
          };
          Vector3.backward = function () {
              return new Vector3(0.0, 0.0, -1.0);
          };
          Vector3.equals = function (v0, v1) {
              return (v0.v[v3i.x] === v1.v[v3i.x] &&
                  v0.v[v3i.y] === v1.v[v3i.y] &&
                  v0.v[v3i.z] === v1.v[v3i.z]);
          };
          Vector3.getLength = function (v0) {
              return Math.sqrt((v0.v[v3i.x] * v0.v[v3i.x]) +
                  (v0.v[v3i.y] * v0.v[v3i.y]) +
                  (v0.v[v3i.z] * v0.v[v3i.z]));
          };
          Vector3.getLengthSq = function (v0) {
              return ((v0.v[v3i.x] * v0.v[v3i.x]) +
                  (v0.v[v3i.y] * v0.v[v3i.y]) +
                  (v0.v[v3i.z] * v0.v[v3i.z]));
          };
          Vector3.distance = function (v0, v1) {
              var x = v0.v[v3i.x] - v1.v[v3i.x];
              var y = v0.v[v3i.y] - v1.v[v3i.y];
              var z = v0.v[v3i.z] - v1.v[v3i.z];
              return Math.sqrt((x * x) + (y * y) + (z * z));
          };
          Vector3.distanceSq = function (v0, v1) {
              var x = v0.v[v3i.x] - v1.v[v3i.x];
              var y = v0.v[v3i.y] - v1.v[v3i.y];
              var z = v0.v[v3i.z] - v1.v[v3i.z];
              return ((x * x) + (y * y) + (z * z));
          };
          Vector3.dot = function (v0, v1) {
              return ((v0.v[v3i.x] * v1.v[v3i.x]) +
                  (v0.v[v3i.y] * v1.v[v3i.y]) +
                  (v0.v[v3i.z] * v1.v[v3i.z]));
          };
          Vector3.normalize = function (v0) {
              var len = 1.0 / Math.sqrt((v0.v[v3i.x] * v0.v[v3i.x]) +
                  (v0.v[v3i.y] * v0.v[v3i.y]) +
                  (v0.v[v3i.z] * v0.v[v3i.z]));
              return new Vector3(v0.v[v3i.x] * len, v0.v[v3i.y] * len, v0.v[v3i.z] * len);
          };
          Vector3.cross = function (v0, v1) {
              return new Vector3((v0.v[v3i.y] * v1.v[v3i.z]) - (v0.v[v3i.z] * v1.v[v3i.y]), (v0.v[v3i.z] * v1.v[v3i.x]) - (v0.v[v3i.x] * v1.v[v3i.z]), (v0.v[v3i.x] * v1.v[v3i.y]) - (v0.v[v3i.y] * v1.v[v3i.x]));
          };
          Vector3.reflect = function (v0, n0) {
              var dot = ((v0.v[v3i.x] * n0.v[v3i.x]) +
                  (v0.v[v3i.y] * n0.v[v3i.y]) +
                  (v0.v[v3i.z] * n0.v[v3i.z]));
              return new Vector3(v0.v[v3i.x] - ((2.0 * dot) * n0.v[v3i.x]), v0.v[v3i.y] - ((2.0 * dot) * n0.v[v3i.y]), v0.v[v3i.z] - ((2.0 * dot) * n0.v[v3i.z]));
          };
          Vector3.abs = function (v0) {
              return new Vector3(Math.abs(v0.v[v3i.x]), Math.abs(v0.v[v3i.y]), Math.abs(v0.v[v3i.z]));
          };
          Vector3.min = function (v0, v1) {
              return new Vector3((v0.v[v3i.x] < v1.v[v3i.x]) ? v0.v[v3i.x] : v1.v[v3i.x], (v0.v[v3i.y] < v1.v[v3i.y]) ? v0.v[v3i.y] : v1.v[v3i.y], (v0.v[v3i.z] < v1.v[v3i.z]) ? v0.v[v3i.z] : v1.v[v3i.z]);
          };
          Vector3.max = function (v0, v1) {
              return new Vector3((v0.v[v3i.x] > v1.v[v3i.x]) ? v0.v[v3i.x] : v1.v[v3i.x], (v0.v[v3i.y] > v1.v[v3i.y]) ? v0.v[v3i.y] : v1.v[v3i.y], (v0.v[v3i.z] > v1.v[v3i.z]) ? v0.v[v3i.z] : v1.v[v3i.z]);
          };
          Vector3.clamp = function (v0, min, max) {
              var x = v0.v[v3i.x];
              var y = v0.v[v3i.y];
              var z = v0.v[v3i.z];
              x = (x > max.v[v3i.x]) ? max.v[v3i.x] : x;
              x = (x < min.v[v3i.x]) ? min.v[v3i.x] : x;
              y = (y > max.v[v3i.y]) ? max.v[v3i.y] : y;
              y = (y < min.v[v3i.y]) ? min.v[v3i.y] : y;
              z = (z > max.v[v3i.z]) ? max.v[v3i.z] : z;
              z = (z < min.v[v3i.z]) ? min.v[v3i.z] : z;
              return new Vector3(x, y, z);
          };
          Vector3.lerp = function (v0, v1, amount) {
              return new Vector3(v0.v[v3i.x] + ((v1.v[v3i.x] - v0.v[v3i.x]) * amount), v0.v[v3i.y] + ((v1.v[v3i.y] - v0.v[v3i.y]) * amount), v0.v[v3i.z] + ((v1.v[v3i.z] - v0.v[v3i.z]) * amount));
          };
          Vector3.barycentric = function (v0, v1, v2, amount0, amount1) {
              return new Vector3((v0.v[v3i.x] + (amount0 * (v1.v[v3i.x] - v0.v[v3i.x]))) + (amount1 * (v2.v[v3i.x] - v0.v[v3i.x])), (v0.v[v3i.y] + (amount0 * (v1.v[v3i.y] - v0.v[v3i.y]))) + (amount1 * (v2.v[v3i.y] - v0.v[v3i.y])), (v0.v[v3i.z] + (amount0 * (v1.v[v3i.z] - v0.v[v3i.z]))) + (amount1 * (v2.v[v3i.z] - v0.v[v3i.z])));
          };
          Vector3.smoothstep = function (v0, v1, amount) {
              amount = (amount > 1.0) ? 1.0 : ((amount < 0.0) ? 0.0 : amount);
              amount = (amount * amount) * (3.0 - (2.0 * amount));
              return new Vector3(v0.v[v3i.x] + ((v1.v[v3i.x] - v0.v[v3i.x]) * amount), v0.v[v3i.y] + ((v1.v[v3i.y] - v0.v[v3i.y]) * amount), v0.v[v3i.z] + ((v1.v[v3i.z] - v0.v[v3i.z]) * amount));
          };
          Vector3.catmullrom = function (v0, v1, v2, v3, amount) {
              var n0 = amount * amount;
              var n1 = amount * n0;
              return new Vector3(0.5 * ((((2.0 * v1.v[v3i.x])
                  + ((-v0.v[v3i.x] + v2.v[v3i.x]) * amount))
                  + (((((2.0 * v0.v[v3i.x]) - (5.0 * v1.v[v3i.x]))
                      + (4.0 * v2.v[v3i.x])) - v3.v[v3i.x]) * n0))
                  + ((((-v0.v[v3i.x] + (3.0 * v1.v[v3i.x]))
                      - (3.0 * v2.v[v3i.x])) + v3.v[v3i.x]) * n1)), 0.5 * ((((2.0 * v1.v[v3i.y])
                  + ((-v0.v[v3i.y] + v2.v[v3i.y]) * amount))
                  + (((((2.0 * v0.v[v3i.y]) - (5.0 * v1.v[v3i.y]))
                      + (4.0 * v2.v[v3i.y])) - v3.v[v3i.y]) * n0))
                  + ((((-v0.v[v3i.y] + (3.0 * v1.v[v3i.y]))
                      - (3.0 * v2.v[v3i.y])) + v3.v[v3i.y]) * n1)), 0.5 * ((((2.0 * v1.v[v3i.z])
                  + ((-v0.v[v3i.z] + v2.v[v3i.z]) * amount))
                  + (((((2.0 * v0.v[v3i.z]) - (5.0 * v1.v[v3i.z]))
                      + (4.0 * v2.v[v3i.z])) - v3.v[v3i.z]) * n0))
                  + ((((-v0.v[v3i.z] + (3.0 * v1.v[v3i.z]))
                      - (3.0 * v2.v[v3i.z])) + v3.v[v3i.z]) * n1)));
          };
          Vector3.hermite = function (v0, t0, v1, t1, amount) {
              var n0 = amount * amount;
              var n1 = amount * n0;
              var n2 = ((2.0 * n1) - (3.0 * n0)) + 1.0;
              var n3 = (-2.0 * n1) + (3.0 * n0);
              var n4 = (n1 - (2.0 * n0)) + amount;
              var n5 = n1 - n0;
              return new Vector3((((v0.v[v3i.x] * n2) + (v1.v[v3i.x] * n3)) + (t0.v[v3i.x] * n4)) + (t1.v[v3i.x] * n5), (((v0.v[v3i.y] * n2) + (v1.v[v3i.y] * n3)) + (t0.v[v3i.y] * n4)) + (t1.v[v3i.y] * n5), (((v0.v[v3i.z] * n2) + (v1.v[v3i.z] * n3)) + (t0.v[v3i.z] * n4)) + (t1.v[v3i.z] * n5));
          };
          Vector3.transform = function (v0, m0) {
              return new Vector3((((v0.v[v3i.x] * m0.v[mi.m11]) + (v0.v[v3i.y] * m0.v[mi.m21])) + (v0.v[v3i.z] * m0.v[mi.m31])) + m0.v[mi.m41], (((v0.v[v3i.x] * m0.v[mi.m12]) + (v0.v[v3i.y] * m0.v[mi.m22])) + (v0.v[v3i.z] * m0.v[mi.m32])) + m0.v[mi.m42], (((v0.v[v3i.x] * m0.v[mi.m13]) + (v0.v[v3i.y] * m0.v[mi.m23])) + (v0.v[v3i.z] * m0.v[mi.m33])) + m0.v[mi.m43]);
          };
          Vector3.transformNormal = function (n0, m0) {
              return new Vector3(((n0.v[v3i.x] * m0.v[mi.m11]) + (n0.v[v3i.y] * m0.v[mi.m21])) + (n0.v[v3i.z] * m0.v[mi.m31]), ((n0.v[v3i.x] * m0.v[mi.m12]) + (n0.v[v3i.y] * m0.v[mi.m22])) + (n0.v[v3i.z] * m0.v[mi.m32]), ((n0.v[v3i.x] * m0.v[mi.m13]) + (n0.v[v3i.y] * m0.v[mi.m23])) + (n0.v[v3i.z] * m0.v[mi.m33]));
          };
          Vector3.transformQuaternion = function (v0, q0) {
              var n0 = q0.v[qi.x] + q0.v[qi.x];
              var n1 = q0.v[qi.y] + q0.v[qi.y];
              var n2 = q0.v[qi.z] + q0.v[qi.z];
              var n3 = q0.v[qi.w] * n0;
              var n4 = q0.v[qi.w] * n1;
              var n5 = q0.v[qi.w] * n2;
              var n6 = q0.v[qi.x] * n0;
              var n7 = q0.v[qi.x] * n1;
              var n8 = q0.v[qi.x] * n2;
              var n9 = q0.v[qi.y] * n1;
              var n10 = q0.v[qi.y] * n2;
              var n11 = q0.v[qi.z] * n2;
              return new Vector3(((v0.v[v3i.x] * ((1.0 - n9) - n11)) + (v0.v[v3i.y] * (n7 - n5))) + (v0.v[v3i.z] * (n8 + n4)), ((v0.v[v3i.x] * (n7 + n5)) + (v0.v[v3i.y] * ((1.0 - n6) - n11))) + (v0.v[v3i.z] * (n10 - n3)), ((v0.v[v3i.x] * (n8 - n4)) + (v0.v[v3i.y] * (n10 + n3))) + (v0.v[v3i.z] * ((1.0 - n6) - n9)));
          };
          Vector3.add = function (v0, v1) {
              return new Vector3(v0.v[v3i.x] + v1.v[v3i.x], v0.v[v3i.y] + v1.v[v3i.y], v0.v[v3i.z] + v1.v[v3i.z]);
          };
          Vector3.sub = function (v0, v1) {
              return new Vector3(v0.v[v3i.x] - v1.v[v3i.x], v0.v[v3i.y] - v1.v[v3i.y], v0.v[v3i.z] - v1.v[v3i.z]);
          };
          Vector3.mul = function (v0, v1) {
              return new Vector3(v0.v[v3i.x] - v1.v[v3i.x], v0.v[v3i.y] - v1.v[v3i.y], v0.v[v3i.z] - v1.v[v3i.z]);
          };
          Vector3.div = function (v0, v1) {
              return new Vector3(v0.v[v3i.x] / v1.v[v3i.x], v0.v[v3i.y] / v1.v[v3i.y], v0.v[v3i.z] / v1.v[v3i.z]);
          };
          Vector3.scale = function (v0, scalar) {
              return new Vector3(v0.v[v3i.x] * scalar, v0.v[v3i.y] * scalar, v0.v[v3i.z] * scalar);
          };
          Vector3.negate = function (v0) {
              return new Vector3(-v0.v[v3i.x], -v0.v[v3i.y], -v0.v[v3i.z]);
          };
          Vector3.clone = function (v0) {
              return new Vector3(v0.v[v3i.x], v0.v[v3i.y], v0.v[v3i.z]);
          };
          Vector3.create = function (x, y, z) {
              return new Vector3(x, y, z);
          };
          Vector3.MAX_VALUE = new Vector3(f32.max, f32.max, f32.max);
          Vector3.MIN_VALUE = new Vector3(f32.min, f32.min, f32.min);
          return Vector3;
      }());
      exports.Vector3 = Vector3;
  });
  define("math/quaternion", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var qui = { x: 0, y: 1, z: 2, w: 3 };
      var v3i = { x: 0, y: 1, z: 2 };
      var mi = {
          m11: 0, m12: 1, m13: 2, m14: 3,
          m21: 4, m22: 5, m23: 6, m24: 7,
          m31: 8, m32: 9, m33: 10, m34: 11,
          m41: 12, m42: 13, m43: 14, m44: 15
      };
      var Quaternion = (function () {
          function Quaternion(x, y, z, w) {
              this.v = new Float32Array(4);
              this.v[qui.x] = x === undefined ? 0.0 : x;
              this.v[qui.y] = y === undefined ? 0.0 : y;
              this.v[qui.z] = z === undefined ? 0.0 : z;
              this.v[qui.w] = w === undefined ? 1.0 : w;
          }
          Quaternion.prototype.toString = function () {
              return "[" + this.v[qui.x] + ", " + this.v[qui.y] + ", " + this.v[qui.z] + ", " + this.v[qui.w] + "]";
          };
          Quaternion.prototype.typeName = function () {
              return "Quaternion";
          };
          Quaternion.prototype.clone = function () {
              return Quaternion.clone(this);
          };
          Quaternion.prototype.x = function (value) {
              if (value !== undefined) {
                  this.v[qui.x] = value;
              }
              return this.v[qui.x];
          };
          Quaternion.prototype.y = function (value) {
              if (value !== undefined) {
                  this.v[qui.y] = value;
              }
              return this.v[qui.y];
          };
          Quaternion.prototype.z = function (value) {
              if (value !== undefined) {
                  this.v[qui.z] = value;
              }
              return this.v[qui.z];
          };
          Quaternion.prototype.w = function (value) {
              if (value !== undefined) {
                  this.v[qui.w] = value;
              }
              return this.v[qui.w];
          };
          Quaternion.prototype.length = function () {
              return Quaternion.getLength(this);
          };
          Quaternion.prototype.lengthSq = function () {
              return Quaternion.getLengthSq(this);
          };
          Quaternion.prototype.normalize = function () {
              return Quaternion.normalize(this);
          };
          Quaternion.prototype.dot = function (v0) {
              return Quaternion.dot(this, v0);
          };
          Quaternion.prototype.concat = function (q0) {
              return Quaternion.concat(this, q0);
          };
          Quaternion.prototype.add = function (q0) {
              return Quaternion.add(this, q0);
          };
          Quaternion.prototype.sub = function (q0) {
              return Quaternion.sub(this, q0);
          };
          Quaternion.prototype.mul = function (q0) {
              return Quaternion.mul(this, q0);
          };
          Quaternion.prototype.div = function (q0) {
              return Quaternion.div(this, q0);
          };
          Quaternion.equals = function (q0, q1) {
              return (q0.v[qui.x] === q1.v[qui.x] &&
                  q0.v[qui.y] === q1.v[qui.y] &&
                  q0.v[qui.z] === q1.v[qui.z] &&
                  q0.v[qui.w] === q1.v[qui.w]);
          };
          Quaternion.getLength = function (q0) {
              return Math.sqrt((q0.v[qui.x] * q0.v[qui.x]) +
                  (q0.v[qui.y] * q0.v[qui.y]) +
                  (q0.v[qui.z] * q0.v[qui.z]) +
                  (q0.v[qui.w] * q0.v[qui.w]));
          };
          Quaternion.getLengthSq = function (q0) {
              return ((q0.v[qui.x] * q0.v[qui.x]) +
                  (q0.v[qui.y] * q0.v[qui.y]) +
                  (q0.v[qui.z] * q0.v[qui.z]) +
                  (q0.v[qui.w] * q0.v[qui.w]));
          };
          Quaternion.normalize = function (q0) {
              var len = 1.0 / Math.sqrt((q0.v[qui.x] * q0.v[qui.x]) +
                  (q0.v[qui.y] * q0.v[qui.y]) +
                  (q0.v[qui.z] * q0.v[qui.z]) +
                  (q0.v[qui.w] * q0.v[qui.w]));
              return new Quaternion(q0.v[qui.x] * len, q0.v[qui.y] * len, q0.v[qui.z] * len, q0.v[qui.w] * len);
          };
          Quaternion.dot = function (q0, q1) {
              return ((q0.v[qui.x] * q1.v[qui.x]) +
                  (q0.v[qui.y] * q1.v[qui.y]) +
                  (q0.v[qui.z] * q1.v[qui.z]) +
                  (q0.v[qui.w] * q1.v[qui.w]));
          };
          Quaternion.conjugate = function (q0) {
              return new Quaternion(-q0.v[qui.x], -q0.v[qui.y], -q0.v[qui.z], q0.v[qui.w]);
          };
          Quaternion.inverse = function (q0) {
              var n0 = (((q0.v[qui.x] * q0.v[qui.x]) +
                  (q0.v[qui.y] * q0.v[qui.y])) +
                  (q0.v[qui.z] * q0.v[qui.z])) +
                  (q0.v[qui.w] * q0.v[qui.w]);
              var n1 = 1.0 / n0;
              return new Quaternion(-q0.v[qui.x] * n1, -q0.v[qui.y] * n1, -q0.v[qui.z] * n1, -q0.v[qui.w] * n1);
          };
          Quaternion.slerp = function (q0, q1, amount) {
              var n0 = 0.0;
              var n1 = 0.0;
              var n2 = amount;
              var n3 = (((q0.v[qui.x] * q1.v[qui.x]) +
                  (q0.v[qui.y] * q1.v[qui.y])) +
                  (q0.v[qui.z] * q1.v[qui.z])) +
                  (q0.v[qui.w] * q1.v[qui.w]);
              var flag = false;
              if (n3 < 0.0) {
                  flag = true;
                  n3 = -n3;
              }
              if (n3 > 0.999999) {
                  n1 = 1.0 - n2;
                  n0 = flag ? -n2 : n2;
              }
              else {
                  var n4 = Math.acos(n3);
                  var n5 = 1.0 / Math.sin(n4);
                  n1 = Math.sin(((1.0 - n2) * n4)) * n5;
                  n0 = flag ? (-Math.sin(n2 * n4) * n5) : (Math.sin(n2 * n4) * n5);
              }
              return new Quaternion((n1 * q0.v[qui.x]) + (n0 * q1.v[qui.x]), (n1 * q0.v[qui.y]) + (n0 * q1.v[qui.y]), (n1 * q0.v[qui.z]) + (n0 * q1.v[qui.z]), (n1 * q0.v[qui.w]) + (n0 * q1.v[qui.w]));
          };
          Quaternion.lerp = function (q0, q1, amount) {
              var q2 = new Quaternion();
              var n0 = amount;
              var n1 = 1.0 - n0;
              var n2 = (((q0.v[qui.x] * q1.v[qui.x]) +
                  (q0.v[qui.y] * q1.v[qui.y])) +
                  (q0.v[qui.z] * q1.v[qui.z])) +
                  (q0.v[qui.w] * q1.v[qui.w]);
              if (n2 >= 0.0) {
                  q2.v[qui.x] = (n1 * q0.v[qui.x]) + (n0 * q1.v[qui.x]);
                  q2.v[qui.y] = (n1 * q0.v[qui.y]) + (n0 * q1.v[qui.y]);
                  q2.v[qui.z] = (n1 * q0.v[qui.z]) + (n0 * q1.v[qui.z]);
                  q2.v[qui.w] = (n1 * q0.v[qui.w]) + (n0 * q1.v[qui.w]);
              }
              else {
                  q2.v[qui.x] = (n1 * q0.v[qui.x]) - (n0 * q1.v[qui.x]);
                  q2.v[qui.y] = (n1 * q0.v[qui.y]) - (n0 * q1.v[qui.y]);
                  q2.v[qui.z] = (n1 * q0.v[qui.z]) - (n0 * q1.v[qui.z]);
                  q2.v[qui.w] = (n1 * q0.v[qui.w]) - (n0 * q1.v[qui.w]);
              }
              var n3 = (((q2.v[qui.x] * q2.v[qui.x]) +
                  (q2.v[qui.y] * q2.v[qui.y])) +
                  (q2.v[qui.z] * q2.v[qui.z])) +
                  (q2.v[qui.w] * q2.v[qui.w]);
              var n4 = 1.0 / Math.sqrt(n3);
              q2.v[qui.x] *= n4;
              q2.v[qui.y] *= n4;
              q2.v[qui.z] *= n4;
              q2.v[qui.w] *= n4;
              return q2;
          };
          Quaternion.fromAxisAngle = function (v0, angle) {
              var n0 = angle * 0.5;
              var n1 = Math.sin(n0);
              var n2 = Math.cos(n0);
              return new Quaternion(v0.v[v3i.x] * n1, v0.v[v3i.y] * n1, v0.v[v3i.z] * n1, n2);
          };
          Quaternion.fromMatrix = function (m0) {
              var n0 = (m0.v[mi.m11] + m0.v[mi.m22]) + m0.v[mi.m33];
              if (n0 > 0.0) {
                  var n1 = Math.sqrt(n0 + 1.0);
                  var n2 = 0.5 / n1;
                  return new Quaternion((m0.v[mi.m23] - m0.v[mi.m32]) * n2, (m0.v[mi.m31] - m0.v[mi.m13]) * n2, (m0.v[mi.m12] - m0.v[mi.m21]) * n2, n1 * 0.5);
              }
              else if ((m0.v[mi.m11] >= m0.v[mi.m22]) && (m0.v[mi.m11] >= m0.v[mi.m33])) {
                  var n1 = Math.sqrt(((1.0 + m0.v[mi.m11]) - m0.v[mi.m22]) - m0.v[mi.m33]);
                  var n2 = 0.5 / n1;
                  return new Quaternion(0.5 * n1, (m0.v[mi.m12] + m0.v[mi.m21]) * n2, (m0.v[mi.m13] + m0.v[mi.m31]) * n2, (m0.v[mi.m23] - m0.v[mi.m32]) * n2);
              }
              else if (m0.v[mi.m22] > m0.v[mi.m33]) {
                  var n1 = Math.sqrt(((1.0 + m0.v[mi.m22]) - m0.v[mi.m11]) - m0.v[mi.m33]);
                  var n2 = 0.5 / n1;
                  return new Quaternion((m0.v[mi.m21] + m0.v[mi.m12]) * n2, 0.5 * n1, (m0.v[mi.m32] + m0.v[mi.m23]) * n2, (m0.v[mi.m31] - m0.v[mi.m13]) * n2);
              }
              else {
                  var n1 = Math.sqrt(((1.0 + m0.v[mi.m33]) - m0.v[mi.m11]) - m0.v[mi.m22]);
                  var n2 = 0.5 / n1;
                  return new Quaternion((m0.v[mi.m31] + m0.v[mi.m13]) * n2, (m0.v[mi.m32] + m0.v[mi.m23]) * n2, 0.5 * n1, (m0.v[mi.m12] - m0.v[mi.m21]) * n2);
              }
          };
          Quaternion.concat = function (q0, q1) {
              var n0 = q1.v[qui.x];
              var n1 = q1.v[qui.y];
              var n2 = q1.v[qui.z];
              var n3 = q1.v[qui.w];
              var n4 = q0.v[qui.x];
              var n5 = q0.v[qui.y];
              var n6 = q0.v[qui.z];
              var n7 = q0.v[qui.w];
              var n8 = (n1 * n6) - (n2 * n5);
              var n9 = (n2 * n4) - (n0 * n6);
              var n10 = (n0 * n5) - (n1 * n4);
              var n11 = ((n0 * n4) + (n1 * n5)) + (n2 * n6);
              return new Quaternion(((n0 * n7) + (n4 * n3)) + n8, ((n1 * n7) + (n5 * n3)) + n9, ((n2 * n7) + (n6 * n3)) + n10, (n3 * n7) - n11);
          };
          Quaternion.add = function (q0, q1) {
              return new Quaternion(q0.v[qui.x] + q1.v[qui.x], q0.v[qui.y] + q1.v[qui.y], q0.v[qui.z] + q1.v[qui.z], q0.v[qui.w] + q1.v[qui.w]);
          };
          Quaternion.sub = function (q0, q1) {
              return new Quaternion(q0.v[qui.x] - q1.v[qui.x], q0.v[qui.y] - q1.v[qui.y], q0.v[qui.z] - q1.v[qui.z], q0.v[qui.w] - q1.v[qui.w]);
          };
          Quaternion.mul = function (q0, q1) {
              var n0 = q0.v[qui.x];
              var n1 = q0.v[qui.y];
              var n2 = q0.v[qui.z];
              var n3 = q0.v[qui.w];
              var n4 = q1.v[qui.x];
              var n5 = q1.v[qui.y];
              var n6 = q1.v[qui.z];
              var n7 = q1.v[qui.w];
              var n8 = (n1 * n6) - (n2 * n5);
              var n9 = (n2 * n4) - (n0 * n6);
              var n10 = (n0 * n5) - (n1 * n4);
              var n11 = ((n0 * n4) + (n1 * n5)) + (n2 * n6);
              return new Quaternion(((n0 * n7) + (n4 * n3)) + n8, ((n1 * n7) + (n5 * n3)) + n9, ((n2 * n7) + (n6 * n3)) + n10, (n3 * n7) - n11);
          };
          Quaternion.div = function (q0, q1) {
              var n0 = q0.v[qui.x];
              var n1 = q0.v[qui.y];
              var n2 = q0.v[qui.z];
              var n3 = q0.v[qui.w];
              var n4 = (((q1.v[qui.x] * q1.v[qui.x]) +
                  (q1.v[qui.y] * q1.v[qui.y])) +
                  (q1.v[qui.z] * q1.v[qui.z])) +
                  (q1.v[qui.w] * q1.v[qui.w]);
              var n5 = 1.0 / n4;
              var n6 = -q1.v[qui.x] * n5;
              var n7 = -q1.v[qui.y] * n5;
              var n8 = -q1.v[qui.z] * n5;
              var n9 = q1.v[qui.w] * n5;
              var n10 = (n1 * n8) - (n2 * n7);
              var n11 = (n2 * n6) - (n0 * n8);
              var n12 = (n0 * n7) - (n1 * n6);
              var n13 = ((n0 * n6) + (n1 * n7)) + (n2 * n8);
              return new Quaternion(((n0 * n9) + (n6 * n3)) + n10, ((n1 * n9) + (n7 * n3)) + n11, ((n2 * n9) + (n8 * n3)) + n12, (n3 * n9) - n13);
          };
          Quaternion.negate = function (q0) {
              return new Quaternion(-q0.v[qui.x], -q0.v[qui.y], -q0.v[qui.z], -q0.v[qui.w]);
          };
          Quaternion.clone = function (q0) {
              return new Quaternion(q0.v[qui.x], q0.v[qui.y], q0.v[qui.z], q0.v[qui.w]);
          };
          Quaternion.create = function (x, y, z, w) {
              return new Quaternion(x, y, z, w);
          };
          return Quaternion;
      }());
      exports.Quaternion = Quaternion;
  });
  define("math/vector4", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var f32 = { max: 2147483647, min: -2147483647 };
      var v4i = { x: 0, y: 1, z: 2, w: 3 };
      var qi = { x: 0, y: 1, z: 2, w: 3 };
      var mi = {
          m11: 0, m12: 1, m13: 2, m14: 3,
          m21: 4, m22: 5, m23: 6, m24: 7,
          m31: 8, m32: 9, m33: 10, m34: 11,
          m41: 12, m42: 13, m43: 14, m44: 15
      };
      var Vector4 = (function () {
          function Vector4(x, y, z, w) {
              this.v = new Float32Array(4);
              this.v[v4i.x] = x === undefined ? 0.0 : x;
              this.v[v4i.y] = y === undefined ? 0.0 : y;
              this.v[v4i.z] = z === undefined ? 0.0 : z;
              this.v[v4i.w] = w === undefined ? 0.0 : w;
          }
          Vector4.prototype.toString = function () {
              return "[" + this.v[v4i.x] + ", " + this.v[v4i.y] + ", " + this.v[v4i.z] + ", " + this.v[v4i.w] + "]";
          };
          Vector4.prototype.typeName = function () {
              return "Vector4";
          };
          Vector4.prototype.clone = function () {
              return Vector4.clone(this);
          };
          Vector4.prototype.x = function (value) {
              if (value !== undefined) {
                  this.v[v4i.x] = value;
              }
              return this.v[v4i.x];
          };
          Vector4.prototype.y = function (value) {
              if (value !== undefined) {
                  this.v[v4i.y] = value;
              }
              return this.v[v4i.y];
          };
          Vector4.prototype.z = function (value) {
              if (value !== undefined) {
                  this.v[v4i.z] = value;
              }
              return this.v[v4i.z];
          };
          Vector4.prototype.w = function (value) {
              if (value !== undefined) {
                  this.v[v4i.w] = value;
              }
              return this.v[v4i.w];
          };
          Vector4.prototype.length = function () {
              return Vector4.getLength(this);
          };
          Vector4.prototype.lengthSq = function () {
              return Vector4.getLengthSq(this);
          };
          Vector4.prototype.normalize = function () {
              return Vector4.normalize(this);
          };
          Vector4.prototype.dot = function (v0) {
              return Vector4.dot(this, v0);
          };
          Vector4.prototype.add = function (v0) {
              return Vector4.add(this, v0);
          };
          Vector4.prototype.sub = function (v0) {
              return Vector4.sub(this, v0);
          };
          Vector4.prototype.mul = function (v0) {
              return Vector4.mul(this, v0);
          };
          Vector4.prototype.div = function (v0) {
              return Vector4.div(this, v0);
          };
          Vector4.prototype.scale = function (s0) {
              return Vector4.scale(this, s0);
          };
          Vector4.prototype.negate = function () {
              return Vector4.negate(this);
          };
          Vector4.zero = function () {
              return new Vector4(0.0, 0.0, 0.0, 0.0);
          };
          Vector4.one = function () {
              return new Vector4(1.0, 1.0, 1.0, 1.0);
          };
          Vector4.left = function () {
              return new Vector4(-1.0, 0.0, 0.0);
          };
          Vector4.unitX = function () {
              return new Vector4(1.0, 0.0, 0.0, 0.0);
          };
          Vector4.unitY = function () {
              return new Vector4(0.0, 1.0, 0.0, 0.0);
          };
          Vector4.unitZ = function () {
              return new Vector4(0.0, 0.0, 1.0, 0.0);
          };
          Vector4.unitW = function () {
              return new Vector4(0.0, 0.0, 0.0, 1.0);
          };
          Vector4.equals = function (v0, v1) {
              return (v0.v[v4i.x] === v1.v[v4i.x] &&
                  v0.v[v4i.y] === v1.v[v4i.y] &&
                  v0.v[v4i.z] === v1.v[v4i.z] &&
                  v0.v[v4i.w] === v1.v[v4i.w]);
          };
          Vector4.getLength = function (v0) {
              return Math.sqrt((v0.v[v4i.x] * v0.v[v4i.x]) +
                  (v0.v[v4i.y] * v0.v[v4i.y]) +
                  (v0.v[v4i.z] * v0.v[v4i.z]) +
                  (v0.v[v4i.w] * v0.v[v4i.w]));
          };
          Vector4.getLengthSq = function (v0) {
              return ((v0.v[v4i.x] * v0.v[v4i.x]) +
                  (v0.v[v4i.y] * v0.v[v4i.y]) +
                  (v0.v[v4i.z] * v0.v[v4i.z]) +
                  (v0.v[v4i.w] * v0.v[v4i.w]));
          };
          Vector4.distance = function (v0, v1) {
              var x = v0.v[v4i.x] - v1.v[v4i.x];
              var y = v0.v[v4i.y] - v1.v[v4i.y];
              var z = v0.v[v4i.z] - v1.v[v4i.z];
              var w = v0.v[v4i.w] - v1.v[v4i.w];
              return Math.sqrt((x * x) + (y * y) + (z * z) + (w * w));
          };
          Vector4.distanceSq = function (v0, v1) {
              var x = v0.v[v4i.x] - v1.v[v4i.x];
              var y = v0.v[v4i.y] - v1.v[v4i.y];
              var z = v0.v[v4i.z] - v1.v[v4i.z];
              var w = v0.v[v4i.w] - v1.v[v4i.w];
              return ((x * x) + (y * y) + (z * z) + (w * w));
          };
          Vector4.dot = function (v0, v1) {
              return ((v0.v[v4i.x] * v1.v[v4i.x]) +
                  (v0.v[v4i.y] * v1.v[v4i.y]) +
                  (v0.v[v4i.z] * v1.v[v4i.z]) +
                  (v0.v[v4i.w] * v1.v[v4i.w]));
          };
          Vector4.normalize = function (v0) {
              var len = 1.0 / Math.sqrt((v0.v[v4i.x] * v0.v[v4i.x]) +
                  (v0.v[v4i.y] * v0.v[v4i.y]) +
                  (v0.v[v4i.z] * v0.v[v4i.z]) +
                  (v0.v[v4i.w] * v0.v[v4i.w]));
              return new Vector4(v0.v[v4i.x] * len, v0.v[v4i.y] * len, v0.v[v4i.z] * len, v0.v[v4i.w] * len);
          };
          Vector4.abs = function (v0) {
              return new Vector4(Math.abs(v0.v[v4i.x]), Math.abs(v0.v[v4i.y]), Math.abs(v0.v[v4i.z]), Math.abs(v0.v[v4i.w]));
          };
          Vector4.min = function (v0, v1) {
              return new Vector4((v0.v[v4i.x] < v1.v[v4i.x]) ? v0.v[v4i.x] : v1.v[v4i.x], (v0.v[v4i.y] < v1.v[v4i.y]) ? v0.v[v4i.y] : v1.v[v4i.y], (v0.v[v4i.z] < v1.v[v4i.z]) ? v0.v[v4i.z] : v1.v[v4i.z], (v0.v[v4i.w] < v1.v[v4i.w]) ? v0.v[v4i.w] : v1.v[v4i.w]);
          };
          Vector4.max = function (v0, v1) {
              return new Vector4((v0.v[v4i.x] > v1.v[v4i.x]) ? v0.v[v4i.x] : v1.v[v4i.x], (v0.v[v4i.y] > v1.v[v4i.y]) ? v0.v[v4i.y] : v1.v[v4i.y], (v0.v[v4i.z] > v1.v[v4i.z]) ? v0.v[v4i.z] : v1.v[v4i.z], (v0.v[v4i.w] > v1.v[v4i.w]) ? v0.v[v4i.w] : v1.v[v4i.w]);
          };
          Vector4.clamp = function (v0, min, max) {
              var x = v0.v[v4i.x];
              var y = v0.v[v4i.y];
              var z = v0.v[v4i.z];
              var w = v0.v[v4i.w];
              x = (x > max.v[v4i.x]) ? max.v[v4i.x] : x;
              x = (x < min.v[v4i.x]) ? min.v[v4i.x] : x;
              y = (y > max.v[v4i.y]) ? max.v[v4i.y] : y;
              y = (y < min.v[v4i.y]) ? min.v[v4i.y] : y;
              z = (z > max.v[v4i.z]) ? max.v[v4i.z] : z;
              z = (z < min.v[v4i.z]) ? min.v[v4i.z] : z;
              w = (w > max.v[v4i.w]) ? max.v[v4i.w] : w;
              w = (w < min.v[v4i.w]) ? min.v[v4i.w] : w;
              return new Vector4(x, y, z, w);
          };
          Vector4.lerp = function (v0, v1, amount) {
              return new Vector4(v0.v[v4i.x] + ((v1.v[v4i.x] - v0.v[v4i.x]) * amount), v0.v[v4i.y] + ((v1.v[v4i.y] - v0.v[v4i.y]) * amount), v0.v[v4i.z] + ((v1.v[v4i.z] - v0.v[v4i.z]) * amount), v0.v[v4i.w] + ((v1.v[v4i.w] - v0.v[v4i.w]) * amount));
          };
          Vector4.barycentric = function (v0, v1, v2, amount0, amount1) {
              return new Vector4((v0.v[v4i.x] + (amount0 * (v1.v[v4i.x] - v0.v[v4i.x]))) + (amount1 * (v2.v[v4i.x] - v0.v[v4i.x])), (v0.v[v4i.y] + (amount0 * (v1.v[v4i.y] - v0.v[v4i.y]))) + (amount1 * (v2.v[v4i.y] - v0.v[v4i.y])), (v0.v[v4i.z] + (amount0 * (v1.v[v4i.z] - v0.v[v4i.z]))) + (amount1 * (v2.v[v4i.z] - v0.v[v4i.z])), (v0.v[v4i.w] + (amount0 * (v1.v[v4i.w] - v0.v[v4i.w]))) + (amount1 * (v2.v[v4i.w] - v0.v[v4i.w])));
          };
          Vector4.smoothstep = function (v0, v1, amount) {
              amount = (amount > 1.0) ? 1.0 : ((amount < 0.0) ? 0.0 : amount);
              amount = (amount * amount) * (3.0 - (2.0 * amount));
              return new Vector4(v0.v[v4i.x] + ((v1.v[v4i.x] - v0.v[v4i.x]) * amount), v0.v[v4i.y] + ((v1.v[v4i.y] - v0.v[v4i.y]) * amount), v0.v[v4i.z] + ((v1.v[v4i.z] - v0.v[v4i.z]) * amount), v0.v[v4i.w] + ((v1.v[v4i.w] - v0.v[v4i.w]) * amount));
          };
          Vector4.catmullrom = function (v0, v1, v2, v3, amount) {
              var n0 = amount * amount;
              var n1 = amount * n0;
              return new Vector4(0.5 * ((((2.0 * v1.v[v4i.x])
                  + ((-v0.v[v4i.x] + v2.v[v4i.x]) * amount))
                  + (((((2.0 * v0.v[v4i.x]) - (5.0 * v1.v[v4i.x]))
                      + (4.0 * v2.v[v4i.x])) - v3.v[v4i.x]) * n0))
                  + ((((-v0.v[v4i.x] + (3.0 * v1.v[v4i.x]))
                      - (3.0 * v2.v[v4i.x])) + v3.v[v4i.x]) * n1)), 0.5 * ((((2.0 * v1.v[v4i.y])
                  + ((-v0.v[v4i.y] + v2.v[v4i.y]) * amount))
                  + (((((2.0 * v0.v[v4i.y]) - (5.0 * v1.v[v4i.y]))
                      + (4.0 * v2.v[v4i.y])) - v3.v[v4i.y]) * n0))
                  + ((((-v0.v[v4i.y] + (3.0 * v1.v[v4i.y]))
                      - (3.0 * v2.v[v4i.y])) + v3.v[v4i.y]) * n1)), 0.5 * ((((2.0 * v1.v[v4i.z])
                  + ((-v0.v[v4i.z] + v2.v[v4i.z]) * amount))
                  + (((((2.0 * v0.v[v4i.z]) - (5.0 * v1.v[v4i.z]))
                      + (4.0 * v2.v[v4i.z])) - v3.v[v4i.z]) * n0))
                  + ((((-v0.v[v4i.z] + (3.0 * v1.v[v4i.z]))
                      - (3.0 * v2.v[v4i.z])) + v3.v[v4i.z]) * n1)), 0.5 * ((((2.0 * v1.v[v4i.w])
                  + ((-v0.v[v4i.w] + v2.v[v4i.w]) * amount))
                  + (((((2.0 * v0.v[v4i.w]) - (5.0 * v1.v[v4i.w]))
                      + (4.0 * v2.v[v4i.w])) - v3.v[v4i.w]) * n0))
                  + ((((-v0.v[v4i.w] + (3.0 * v1.v[v4i.w]))
                      - (3.0 * v2.v[v4i.w])) + v3.v[v4i.w]) * n1)));
          };
          Vector4.hermite = function (v0, t0, v1, t1, amount) {
              var n0 = amount * amount;
              var n1 = amount * n0;
              var n2 = ((2.0 * n1) - (3.0 * n0)) + 1.0;
              var n3 = (-2.0 * n1) + (3.0 * n0);
              var n4 = (n1 - (2.0 * n0)) + amount;
              var n5 = n1 - n0;
              return new Vector4((((v0.v[v4i.x] * n2) + (v1.v[v4i.x] * n3)) + (t0.v[v4i.x] * n4)) + (t1.v[v4i.x] * n5), (((v0.v[v4i.y] * n2) + (v1.v[v4i.y] * n3)) + (t0.v[v4i.y] * n4)) + (t1.v[v4i.y] * n5), (((v0.v[v4i.z] * n2) + (v1.v[v4i.z] * n3)) + (t0.v[v4i.z] * n4)) + (t1.v[v4i.z] * n5), (((v0.v[v4i.w] * n2) + (v1.v[v4i.w] * n3)) + (t0.v[v4i.w] * n4)) + (t1.v[v4i.w] * n5));
          };
          Vector4.transform = function (v0, m0) {
              return new Vector4((((v0.v[v4i.x] * m0.v[mi.m11]) + (v0.v[v4i.y] * m0.v[mi.m21])) + (v0.v[v4i.z] * m0.v[mi.m31])) + (v0.v[v4i.w] * m0.v[mi.m41]), (((v0.v[v4i.x] * m0.v[mi.m12]) + (v0.v[v4i.y] * m0.v[mi.m22])) + (v0.v[v4i.z] * m0.v[mi.m32])) + (v0.v[v4i.w] * m0.v[mi.m42]), (((v0.v[v4i.x] * m0.v[mi.m13]) + (v0.v[v4i.y] * m0.v[mi.m23])) + (v0.v[v4i.z] * m0.v[mi.m33])) + (v0.v[v4i.w] * m0.v[mi.m43]), (((v0.v[v4i.x] * m0.v[mi.m14]) + (v0.v[v4i.y] * m0.v[mi.m24])) + (v0.v[v4i.z] * m0.v[mi.m34])) + (v0.v[v4i.w] * m0.v[mi.m44]));
          };
          Vector4.transformQuaternion = function (v0, q0) {
              var n0 = q0.v[qi.x] + q0.v[qi.x];
              var n1 = q0.v[qi.y] + q0.v[qi.y];
              var n2 = q0.v[qi.z] + q0.v[qi.z];
              var n3 = q0.v[qi.w] * n0;
              var n4 = q0.v[qi.w] * n1;
              var n5 = q0.v[qi.w] * n2;
              var n6 = q0.v[qi.x] * n0;
              var n7 = q0.v[qi.x] * n1;
              var n8 = q0.v[qi.x] * n2;
              var n9 = q0.v[qi.y] * n1;
              var n10 = q0.v[qi.y] * n2;
              var n11 = q0.v[qi.z] * n2;
              return new Vector4((v0.v[v4i.x] * ((1.0 - n9) - n11)) + (v0.v[v4i.y] * (n7 - n5)), (v0.v[v4i.x] * (n7 + n5)) + (v0.v[v4i.y] * ((1.0 - n6) - n11)), (v0.v[v4i.x] * (n8 - n4)) + (v0.v[v4i.y] * (n10 + n3)));
          };
          Vector4.add = function (v0, v1) {
              return new Vector4(v0.v[v4i.x] + v1.v[v4i.x], v0.v[v4i.y] + v1.v[v4i.y], v0.v[v4i.z] + v1.v[v4i.z], v0.v[v4i.w] + v1.v[v4i.w]);
          };
          Vector4.sub = function (v0, v1) {
              return new Vector4(v0.v[v4i.x] - v1.v[v4i.x], v0.v[v4i.y] - v1.v[v4i.y], v0.v[v4i.z] - v1.v[v4i.z], v0.v[v4i.w] - v1.v[v4i.w]);
          };
          Vector4.mul = function (v0, v1) {
              return new Vector4(v0.v[v4i.x] - v1.v[v4i.x], v0.v[v4i.y] - v1.v[v4i.y], v0.v[v4i.z] - v1.v[v4i.z], v0.v[v4i.w] - v1.v[v4i.w]);
          };
          Vector4.div = function (v0, v1) {
              return new Vector4(v0.v[v4i.x] / v1.v[v4i.x], v0.v[v4i.y] / v1.v[v4i.y], v0.v[v4i.z] / v1.v[v4i.z], v0.v[v4i.w] / v1.v[v4i.w]);
          };
          Vector4.scale = function (v0, scalar) {
              return new Vector4(v0.v[v4i.x] * scalar, v0.v[v4i.y] * scalar, v0.v[v4i.z] * scalar, v0.v[v4i.w] * scalar);
          };
          Vector4.negate = function (v0) {
              return new Vector4(-v0.v[v4i.x], -v0.v[v4i.y], -v0.v[v4i.z], -v0.v[v4i.w]);
          };
          Vector4.clone = function (v0) {
              return new Vector4(v0.v[v4i.x], v0.v[v4i.y], v0.v[v4i.z], v0.v[v4i.w]);
          };
          Vector4.create = function (x, y, z, w) {
              return new Vector4(x, y, z, w);
          };
          Vector4.MAX_VALUE = new Vector4(f32.max, f32.max, f32.max, f32.max);
          Vector4.MIN_VALUE = new Vector4(f32.min, f32.min, f32.min, f32.min);
          return Vector4;
      }());
      exports.Vector4 = Vector4;
  });
  define("math/single", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var si = { x: 0 };
      var Single = (function () {
          function Single(x) {
              this.v = new Float32Array(1);
              this.v[si.x] = x === undefined ? 0.0 : x;
          }
          Single.prototype.toString = function () {
              return "" + this.v[si.x];
          };
          Single.prototype.typeName = function () {
              return "Single";
          };
          Single.prototype.clone = function () {
              return Single.clone(this);
          };
          Single.prototype.x = function (value) {
              if (value !== undefined) {
                  this.v[si.x] = value;
              }
              return this.v[si.x];
          };
          Single.prototype.negate = function () {
              return Single.negate(this);
          };
          Single.prototype.add = function (s0) {
              return Single.add(this, s0);
          };
          Single.prototype.sub = function (s0) {
              return Single.sub(this, s0);
          };
          Single.prototype.mul = function (s0) {
              return Single.mul(this, s0);
          };
          Single.prototype.div = function (s0) {
              return Single.div(this, s0);
          };
          Single.distance = function (s0, s1) {
              return Math.abs(s0.v[si.x] - s1.v[si.x]);
          };
          Single.barycentric = function (s0, s1, s2, amount0, amount1) {
              return new Single((s0.v[si.x] + (amount0 * (s1.v[si.x] - s0.v[si.x]))) + (amount0 * (s2.v[si.x] - s0.v[si.x])));
          };
          Single.catmullrom = function (s0, s1, s2, s3, amount) {
              var n0 = amount * amount;
              var n1 = amount * n0;
              return new Single((0.5 * ((((2.0 * s1.v[si.x]) + ((-s0.v[si.x] + s2.v[si.x]) * amount)) +
                  (((((2.0 * s0.v[si.x]) - (5.0 * s1.v[si.x])) +
                      (4.0 * s2.v[si.x])) - s3.v[si.x]) * n0)) +
                  ((((-s0.v[si.x] + (3.0 * s1.v[si.x])) -
                      (3.0 * s2.v[si.x])) + s3.v[si.x]) * n1))));
          };
          Single.hermite = function (s0, t0, s1, t1, amount) {
              var n0 = amount;
              var n1 = n0 * n0;
              var n2 = n0 * n1;
              var n3 = ((2.0 * n2) - (3.0 * n1)) + 1.0;
              var n4 = (-2.0 * n2) + (3.0 * n1);
              var n5 = (n2 - (2.0 * n1)) + n0;
              var n6 = n2 - n1;
              return new Single((((s0.v[si.x] * n3) + (s1.v[si.x] * n4)) + (t0.v[si.x] * n5)) + (t1.v[si.x] * n6));
          };
          Single.lerp = function (s0, s1, amount) {
              return new Single(s0.v[si.x] + ((s1.v[si.x] - s0.v[si.x]) * amount));
          };
          Single.smoothstep = function (value1, value2, amount) {
              var num = Single.clamp(new Single(amount), 0.0, 1.0).x();
              return Single.lerp(value1, value2, (num * num) * (3.0 - (2.0 * num)));
          };
          Single.clamp = function (s0, min, max) {
              var n0 = (s0.v[si.x] > max) ? max : s0.v[si.x];
              var n1 = (n0 < max) ? min : n0;
              return new Single(n1);
          };
          Single.abs = function (s0) {
              return new Single(Math.abs(s0.v[si.x]));
          };
          Single.min = function (s0, s1) {
              return (s0.v[si.x] < s1.v[si.x])
                  ? new Single(s0.v[si.x])
                  : new Single(s1.v[si.x]);
          };
          Single.max = function (s0, s1) {
              return (s0.v[si.x] > s1.v[si.x])
                  ? new Single(s0.v[si.x])
                  : new Single(s1.v[si.x]);
          };
          Single.negate = function (s0) {
              return new Single(-s0.v[si.x]);
          };
          Single.add = function (s0, s1) {
              return new Single(s0.v[si.x] + s1.v[si.x]);
          };
          Single.sub = function (s0, s1) {
              return new Single(s0.v[si.x] - s1.v[si.x]);
          };
          Single.mul = function (s0, s1) {
              return new Single(s0.v[si.x] * s1.v[si.x]);
          };
          Single.div = function (s0, s1) {
              return new Single(s0.v[si.x] / s1.v[si.x]);
          };
          Single.clone = function (s0) {
              return new Single(s0.v[si.x]);
          };
          Single.create = function (x) {
              return new Single(x);
          };
          return Single;
      }());
      exports.Single = Single;
  });
  define("math/sphere", ["require", "exports", "math/single", "math/vector3"], function (require, exports, single_1, vector3_1) {
      "use strict";
      exports.__esModule = true;
      var v3i = { x: 0, y: 1, z: 2 };
      var pli = { x: 0, y: 1, z: 2, w: 3 };
      var Sphere = (function () {
          function Sphere(position, radius) {
              this.position = position === undefined ? new vector3_1.Vector3(0, 0, 0) : position;
              this.radius = radius === undefined ? 0.5 : radius;
          }
          Sphere.prototype.toString = function () {
              return "{ position: " + this.position.toString() + ", radius: " + this.radius + "}";
          };
          Sphere.prototype.typeName = function () {
              return "Sphere";
          };
          Sphere.prototype.clone = function () {
              return Sphere.clone(this);
          };
          Sphere.equals = function (s0, s1) {
              return (vector3_1.Vector3.equals(s0.position, s1.position) &&
                  s0.radius === s1.radius);
          };
          Sphere.merge = function (s0, s1) {
              var n0 = vector3_1.Vector3.sub(s1.position, s0.position);
              var n1 = n0.length();
              var n2 = s0.radius;
              var n3 = s1.radius;
              if ((n2 + n3) >= n1) {
                  if ((n2 - n3) >= n1) {
                      return s0.clone();
                  }
                  if ((n3 - n2) >= n1) {
                      return s1.clone();
                  }
              }
              var n4 = n0.scale(1.0 / n1);
              var n5 = single_1.Single.min(new single_1.Single(-n2), new single_1.Single(n1 - n3));
              var n6 = single_1.Single.sub(single_1.Single.max(new single_1.Single(n2), new single_1.Single(n1 + n3)), n5)
                  .mul(new single_1.Single(0.5));
              return new Sphere(s0.position.add(n4.scale(n6.add(n5).x())), n6.x());
          };
          Sphere.fromBox = function (b0) {
              var center = vector3_1.Vector3.lerp(b0.min, b0.max, 0.5);
              var distance = vector3_1.Vector3.distance(b0.min, b0.max);
              return new Sphere(center, distance * 0.5);
          };
          Sphere.fromPoints = function (points) {
              var radius = 0.0;
              var center = new vector3_1.Vector3();
              var n0 = new vector3_1.Vector3();
              var n1 = new vector3_1.Vector3();
              var n2 = new vector3_1.Vector3();
              var n3 = new vector3_1.Vector3();
              var n4 = new vector3_1.Vector3();
              var n5 = new vector3_1.Vector3();
              for (var i = 0; i < points.length; i++) {
                  var p = points[i];
                  if (p.v[v3i.x] < n0.v[v3i.x]) {
                      n0 = p.clone();
                  }
                  if (p.v[v3i.x] > n1.v[v3i.x]) {
                      n1 = p.clone();
                  }
                  if (p.v[v3i.y] < n2.v[v3i.y]) {
                      n2 = p.clone();
                  }
                  if (p.v[v3i.y] > n3.v[v3i.y]) {
                      n3 = p.clone();
                  }
                  if (p.v[v3i.z] < n4.v[v3i.z]) {
                      n4 = p.clone();
                  }
                  if (p.v[v3i.z] > n5.v[v3i.z]) {
                      n5 = p.clone();
                  }
              }
              var n6 = vector3_1.Vector3.distance(n1, n0);
              var n7 = vector3_1.Vector3.distance(n3, n2);
              var n8 = vector3_1.Vector3.distance(n5, n4);
              if (n6 > n7) {
                  if (n6 > n8) {
                      center = vector3_1.Vector3.lerp(n1, n0, 0.5);
                      radius = n6 * 0.5;
                  }
                  else {
                      center = vector3_1.Vector3.lerp(n5, n4, 0.5);
                      radius = n8 * 0.5;
                  }
              }
              else if (n7 > n8) {
                  center = vector3_1.Vector3.lerp(n3, n2, 0.5);
                  radius = n7 * 0.5;
              }
              else {
                  center = vector3_1.Vector3.lerp(n5, n4, 0.5);
                  radius = n8 * 0.5;
              }
              for (var i = 0; i < points.length; i++) {
                  var v0 = points[i];
                  var v1 = new vector3_1.Vector3(v0.v[v3i.x] - center.v[v3i.x], v0.v[v3i.y] - center.v[v3i.y], v0.v[v3i.z] - center.v[v3i.z]);
                  var num3 = v1.length();
                  if (num3 > radius) {
                      radius = (radius + num3) * 0.5;
                      center = center.add(vector3_1.Vector3.scale(v1, 1.0 - (radius / num3)));
                  }
              }
              return new Sphere(center, radius);
          };
          Sphere.clone = function (s0) {
              return new Sphere(s0.position.clone(), s0.radius);
          };
          Sphere.create = function (center, radius) {
              return new Sphere(center, radius);
          };
          return Sphere;
      }());
      exports.Sphere = Sphere;
  });
  define("math/frustum", ["require", "exports", "math/matrix", "math/vector3", "math/plane", "math/ray"], function (require, exports, matrix_1, vector3_2, plane_1, ray_1) {
      "use strict";
      exports.__esModule = true;
      var pli = { x: 0, y: 1, z: 2, w: 3 };
      var v3i = { x: 0, y: 1, z: 2 };
      var fpi = { near: 0, far: 1, left: 2, right: 3, top: 4, bottom: 5 };
      var mi = {
          m11: 0, m12: 1, m13: 2, m14: 3,
          m21: 4, m22: 5, m23: 6, m24: 7,
          m31: 8, m32: 9, m33: 10, m34: 11,
          m41: 12, m42: 13, m43: 14, m44: 15
      };
      var computeIntersectionRay = function (p0, p1) {
          var v0 = vector3_2.Vector3.cross(p0.normal(), p1.normal());
          var n0 = v0.lengthSq();
          var v1 = vector3_2.Vector3.scale(p1.normal(), -p0.d());
          var v2 = vector3_2.Vector3.scale(p0.normal(), p1.d());
          var v3 = vector3_2.Vector3.add(v1, v2);
          var v4 = vector3_2.Vector3.cross(v3, v0);
          var v5 = new vector3_2.Vector3(v4.v[v3i.x] / n0, v4.v[v3i.y] / n0, v4.v[v3i.z] / n0);
          return new ray_1.Ray(v5, v0);
      };
      var computeIntersectionVector = function (plane, ray) {
          var num = (-plane.d() -
              vector3_2.Vector3.dot(plane.normal(), ray.position)) /
              vector3_2.Vector3.dot(plane.normal(), ray.direction);
          return vector3_2.Vector3.add(ray.position, vector3_2.Vector3.scale(ray.direction, num));
      };
      var Frustum = (function () {
          function Frustum(matrix) {
              this.matrix = matrix === undefined ? matrix_1.Matrix.create() : matrix.clone();
              this.planes = new Array(6);
              this.planes[fpi.near] = new plane_1.Plane(-this.matrix.v[mi.m13], -this.matrix.v[mi.m23], -this.matrix.v[mi.m33], -this.matrix.v[mi.m43]);
              this.planes[fpi.far] = new plane_1.Plane(-this.matrix.v[mi.m14] + this.matrix.v[mi.m13], -this.matrix.v[mi.m24] + this.matrix.v[mi.m23], -this.matrix.v[mi.m34] + this.matrix.v[mi.m33], -this.matrix.v[mi.m44] + this.matrix.v[mi.m43]);
              this.planes[fpi.left] = new plane_1.Plane(-this.matrix.v[mi.m14] - this.matrix.v[mi.m11], -this.matrix.v[mi.m24] - this.matrix.v[mi.m21], -this.matrix.v[mi.m34] - this.matrix.v[mi.m31], -this.matrix.v[mi.m44] - this.matrix.v[mi.m41]);
              this.planes[fpi.right] = new plane_1.Plane(-this.matrix.v[mi.m14] + this.matrix.v[mi.m11], -this.matrix.v[mi.m24] + this.matrix.v[mi.m21], -this.matrix.v[mi.m34] + this.matrix.v[mi.m31], -this.matrix.v[mi.m44] + this.matrix.v[mi.m41]);
              this.planes[fpi.top] = new plane_1.Plane(-this.matrix.v[mi.m14] + this.matrix.v[mi.m12], -this.matrix.v[mi.m24] + this.matrix.v[mi.m22], -this.matrix.v[mi.m34] + this.matrix.v[mi.m32], -this.matrix.v[mi.m44] + this.matrix.v[mi.m42]);
              this.planes[fpi.bottom] = new plane_1.Plane(-this.matrix.v[mi.m14] - this.matrix.v[mi.m12], -this.matrix.v[mi.m24] - this.matrix.v[mi.m22], -this.matrix.v[mi.m34] - this.matrix.v[mi.m32], -this.matrix.v[mi.m44] - this.matrix.v[mi.m42]);
              for (var i = 0; i < this.planes.length; i++) {
                  var len = this.planes[i].normal().length();
                  this.planes[i].v[pli.x] = this.planes[i].v[pli.x] / len;
                  this.planes[i].v[pli.y] = this.planes[i].v[pli.y] / len;
                  this.planes[i].v[pli.z] = this.planes[i].v[pli.z] / len;
                  this.planes[i].v[pli.w] = this.planes[i].v[pli.w] / len;
              }
              this.corners = new Array(8);
              var ray = computeIntersectionRay(this.planes[0], this.planes[2]);
              this.corners[0] = computeIntersectionVector(this.planes[4], ray);
              this.corners[3] = computeIntersectionVector(this.planes[5], ray);
              ray = computeIntersectionRay(this.planes[3], this.planes[0]);
              this.corners[1] = computeIntersectionVector(this.planes[4], ray);
              this.corners[2] = computeIntersectionVector(this.planes[5], ray);
              ray = computeIntersectionRay(this.planes[2], this.planes[1]);
              this.corners[4] = computeIntersectionVector(this.planes[4], ray);
              this.corners[7] = computeIntersectionVector(this.planes[5], ray);
              ray = computeIntersectionRay(this.planes[1], this.planes[3]);
              this.corners[5] = computeIntersectionVector(this.planes[4], ray);
              this.corners[6] = computeIntersectionVector(this.planes[5], ray);
          }
          Frustum.prototype.toString = function () {
              var buf = new Array();
              buf.push('{');
              buf.push("  planes: {");
              buf.push("    near  : " + this.planes[fpi.near].toString() + ",");
              buf.push("    far   : " + this.planes[fpi.far].toString() + ",");
              buf.push("    left  : " + this.planes[fpi.left].toString() + ",");
              buf.push("    right : " + this.planes[fpi.right].toString() + ",");
              buf.push("    top   : " + this.planes[fpi.top].toString() + ",");
              buf.push("    bottom: " + this.planes[fpi.bottom].toString());
              buf.push("  },");
              buf.push("  corners: [");
              buf.push("    " + this.corners[0].toString() + ",");
              buf.push("    " + this.corners[1].toString() + ",");
              buf.push("    " + this.corners[2].toString() + ",");
              buf.push("    " + this.corners[3].toString() + ",");
              buf.push("    " + this.corners[4].toString() + ",");
              buf.push("    " + this.corners[5].toString() + ",");
              buf.push("    " + this.corners[6].toString() + ",");
              buf.push("    " + this.corners[7].toString());
              buf.push("  ]");
              buf.push("}");
              return buf.join('\n');
          };
          Frustum.prototype.typeName = function () {
              return "Frustum";
          };
          Frustum.prototype.clone = function () {
              return Frustum.clone(this);
          };
          Frustum.equals = function (f0, f1) {
              return (f0.matrix === f1.matrix);
          };
          Frustum.prototype.near = function () {
              return this.planes[fpi.near];
          };
          Frustum.prototype.far = function () {
              return this.planes[fpi.far];
          };
          Frustum.prototype.left = function () {
              return this.planes[fpi.left];
          };
          Frustum.prototype.right = function () {
              return this.planes[fpi.right];
          };
          Frustum.prototype.top = function () {
              return this.planes[fpi.top];
          };
          Frustum.prototype.bottom = function () {
              return this.planes[fpi.bottom];
          };
          Frustum.clone = function (f0) {
              return new Frustum(f0.matrix.clone());
          };
          Frustum.create = function (matrix) {
              return new Frustum(matrix);
          };
          return Frustum;
      }());
      exports.Frustum = Frustum;
  });
  define("math/triangle", ["require", "exports", "math/vector3", "math/plane"], function (require, exports, vector3_3, plane_2) {
      "use strict";
      exports.__esModule = true;
      var Triangle = (function () {
          function Triangle(v0, v1, v2) {
              this.v0 = v0;
              this.v1 = v1;
              this.v2 = v2;
          }
          Triangle.prototype.toString = function () {
              return "{v0: " + this.v0.toString() + ", v1: " + this.v0.toString() + ", v2: " + this.v0.toString() + "}";
          };
          Triangle.prototype.typeName = function () {
              return "Triangle";
          };
          Triangle.prototype.clone = function () {
              return Triangle.clone(this);
          };
          Triangle.prototype.plane = function () {
              return plane_2.Plane.fromPoints(this.v0, this.v1, this.v2);
          };
          Triangle.equals = function (t0, t1) {
              return (vector3_3.Vector3.equals(t0.v0, t1.v0) &&
                  vector3_3.Vector3.equals(t0.v1, t1.v1) &&
                  vector3_3.Vector3.equals(t0.v2, t1.v2));
          };
          Triangle.clone = function (t0) {
              return new Triangle(t0.v0, t0.v1, t0.v2);
          };
          Triangle.create = function (v0, v1, v2) {
              return new Triangle(v0, v1, v2);
          };
          return Triangle;
      }());
      exports.Triangle = Triangle;
  });
  define("math/ray", ["require", "exports", "math/vector3"], function (require, exports, vector3_4) {
      "use strict";
      exports.__esModule = true;
      var f32 = { max: 2147483647, min: -2147483647 };
      var v3i = { x: 0, y: 1, z: 2 };
      var pli = { x: 0, y: 1, z: 2, w: 3 };
      var min = function (a, b) { return a < b ? a : b; };
      var max = function (a, b) { return a > b ? a : b; };
      var Ray = (function () {
          function Ray(position, direction) {
              this.position = position === undefined ? new vector3_4.Vector3(0, 0, 0) : position;
              this.direction = direction === undefined ? new vector3_4.Vector3(0, 0, 0) : direction;
          }
          Ray.prototype.toString = function () {
              return "{ position: " + this.position.toString() + ", direction: " + this.direction.toString() + " }";
          };
          Ray.prototype.typeName = function () {
              return "Ray";
          };
          Ray.equals = function (r0, r1) {
              return (vector3_4.Vector3.equals(r0.position, r1.position) &&
                  vector3_4.Vector3.equals(r0.direction, r1.direction));
          };
          Ray.intersectPlane = function (ray, plane) {
              var n0 = ((plane.v[pli.x] * ray.direction.v[v3i.x]) +
                  (plane.v[pli.y] * ray.direction.v[v3i.y])) +
                  (plane.v[pli.z] * ray.direction.v[v3i.z]);
              if (Math.abs(n0) < 1E-05) {
                  return undefined;
              }
              var n1 = ((plane.v[pli.x] * ray.position.v[v3i.x]) +
                  (plane.v[pli.y] * ray.position.v[v3i.y])) +
                  (plane.v[pli.z] * ray.position.v[v3i.z]);
              var n2 = (-plane.v[pli.w] - n1) / n0;
              if (n2 < 0.0) {
                  if (n2 < -1E-05) {
                      return undefined;
                  }
                  n2 = 0.0;
              }
              return n2;
          };
          Ray.intersectTriangle = function (ray, triangle) {
              var result = undefined;
              var v0 = vector3_4.Vector3.sub(triangle.v1, triangle.v0);
              var v1 = vector3_4.Vector3.sub(triangle.v2, triangle.v0);
              var v2 = vector3_4.Vector3.cross(ray.direction, v1);
              var n0 = vector3_4.Vector3.dot(v0, v2);
              if (n0 > -0.00001) {
                  return undefined;
              }
              var n1 = 1.0 / n0;
              var v3 = vector3_4.Vector3.sub(ray.position, triangle.v0);
              var n2 = vector3_4.Vector3.dot(v3, v2) * n1;
              if (n2 < -0.001 || n2 > 1.001) {
                  return undefined;
              }
              var v4 = vector3_4.Vector3.cross(v3, v0);
              var n3 = vector3_4.Vector3.dot(ray.direction, v4) * n1;
              if (n3 < -0.001 || n2 + n3 > 1.001) {
                  return undefined;
              }
              result = vector3_4.Vector3.dot(v1, v4) * n1;
              if (result <= 0) {
                  return undefined;
              }
              return result;
          };
          Ray.intersectBox = function (r0, b0) {
              var result = 0.0;
              var maxValue = f32.max;
              if (Math.abs(r0.direction.v[v3i.x]) < 1E-06) {
                  if ((r0.position.v[v3i.x] < b0.min.v[v3i.x]) ||
                      (r0.position.v[v3i.x] > b0.max.v[v3i.x])) {
                      return undefined;
                  }
              }
              else {
                  var n0 = 1.0 / r0.direction.v[v3i.x];
                  var n1 = (b0.min.v[v3i.x] - r0.position.v[v3i.x]) * n0;
                  var n2 = (b0.max.v[v3i.x] - r0.position.v[v3i.x]) * n0;
                  if (n1 > n2) {
                      var n3 = n1;
                      n1 = n2;
                      n2 = n3;
                  }
                  result = max(n1, result);
                  maxValue = min(n2, result);
                  if (result > maxValue) {
                      return undefined;
                  }
              }
              if (Math.abs(r0.direction.v[v3i.y]) < 1E-06) {
                  if ((r0.position.v[v3i.y] < b0.min.v[v3i.y]) ||
                      (r0.position.v[v3i.y] > b0.max.v[v3i.y])) {
                      return undefined;
                  }
              }
              else {
                  var n0 = 1.0 / r0.direction.v[v3i.y];
                  var n1 = (b0.min.v[v3i.y] - r0.position.v[v3i.y]) * n0;
                  var n2 = (b0.max.v[v3i.y] - r0.position.v[v3i.y]) * n0;
                  if (n1 > n2) {
                      var n3 = n1;
                      n1 = n2;
                      n2 = n3;
                  }
                  result = max(n1, result);
                  maxValue = min(n2, maxValue);
                  if (result > maxValue) {
                      return undefined;
                  }
              }
              if (Math.abs(r0.direction.v[v3i.z]) < 1E-06) {
                  if ((r0.position.v[v3i.z] < b0.min.v[v3i.z]) ||
                      (r0.position.v[v3i.z] > b0.max.v[v3i.z])) {
                      return undefined;
                  }
              }
              else {
                  var n0 = 1.0 / r0.direction.v[v3i.z];
                  var n1 = (b0.min.v[v3i.z] - r0.position.v[v3i.z]) * n0;
                  var n2 = (b0.max.v[v3i.z] - r0.position.v[v3i.z]) * n0;
                  if (n1 > n2) {
                      var n3 = n1;
                      n1 = n2;
                      n2 = n3;
                  }
                  result = max(n1, result);
                  maxValue = min(n2, maxValue);
                  if (result > maxValue) {
                      return undefined;
                  }
              }
              return result;
          };
          Ray.intersectSphere = function (r0, s0) {
              var n0 = s0.position.v[v3i.x] - r0.position.v[v3i.x];
              var n1 = s0.position.v[v3i.y] - r0.position.v[v3i.y];
              var n2 = s0.position.v[v3i.z] - r0.position.v[v3i.z];
              var n3 = ((n0 * n0) + (n1 * n1)) + (n2 * n2);
              var n4 = s0.radius * s0.radius;
              if (n3 <= n4) {
                  return 0.0;
              }
              var n5 = ((n0 * r0.direction.v[v3i.x]) +
                  (n1 * r0.direction.v[v3i.y])) +
                  (n2 * r0.direction.v[v3i.z]);
              if (n5 < 0.0) {
                  return undefined;
              }
              var n6 = n3 - (n5 * n5);
              if (n6 > n4) {
                  return undefined;
              }
              var n7 = Math.sqrt(n4 - n6);
              return n5 - n7;
          };
          Ray.intersectFrustum = function (ray, frustum) {
              return null;
          };
          Ray.create = function (position, direction) {
              return new Ray(position, direction);
          };
          return Ray;
      }());
      exports.Ray = Ray;
  });
  define("math/box", ["require", "exports", "math/vector3", "math/ray"], function (require, exports, vector3_5, ray_2) {
      "use strict";
      exports.__esModule = true;
      var v3i = { x: 0, y: 1, z: 2 };
      var pli = { x: 0, y: 1, z: 2, w: 3 };
      var Box = (function () {
          function Box(min, max) {
              this.min = min === undefined ? new vector3_5.Vector3(0, 0, 0) : min;
              this.max = max === undefined ? new vector3_5.Vector3(1, 1, 1) : max;
          }
          Box.prototype.toString = function () {
              return "[" + this.min.toString() + ", " + this.max.toString() + "]";
          };
          Box.prototype.typeName = function () {
              return "Box";
          };
          Box.prototype.clone = function () {
              return Box.clone(this);
          };
          Box.prototype.corners = function () {
              return [
                  new vector3_5.Vector3(this.min.v[v3i.x], this.max.v[v3i.y], this.max.v[v3i.z]),
                  new vector3_5.Vector3(this.max.v[v3i.x], this.max.v[v3i.y], this.max.v[v3i.z]),
                  new vector3_5.Vector3(this.max.v[v3i.x], this.min.v[v3i.y], this.max.v[v3i.z]),
                  new vector3_5.Vector3(this.min.v[v3i.x], this.min.v[v3i.y], this.max.v[v3i.z]),
                  new vector3_5.Vector3(this.min.v[v3i.x], this.max.v[v3i.y], this.min.v[v3i.z]),
                  new vector3_5.Vector3(this.max.v[v3i.x], this.max.v[v3i.y], this.min.v[v3i.z]),
                  new vector3_5.Vector3(this.max.v[v3i.x], this.min.v[v3i.y], this.min.v[v3i.z]),
                  new vector3_5.Vector3(this.min.v[v3i.x], this.min.v[v3i.y], this.min.v[v3i.z])
              ];
          };
          Box.equals = function (b0, b1) {
              return (vector3_5.Vector3.equals(b0.min, b1.min) &&
                  vector3_5.Vector3.equals(b0.max, b1.max));
          };
          Box.merge = function (b0, b1) {
              return new Box(vector3_5.Vector3.min(b0.min, b1.min), vector3_5.Vector3.max(b0.max, b1.max));
          };
          Box.intersectBox = function (b0, b1) {
              if ((b0.max.v[v3i.x] < b1.min.v[v3i.x]) ||
                  (b0.min.v[v3i.x] > b1.max.v[v3i.x])) {
                  return false;
              }
              if ((b0.max.v[v3i.y] < b1.min.v[v3i.y]) ||
                  (b0.min.v[v3i.y] > b1.max.v[v3i.y])) {
                  return false;
              }
              return ((b0.max.v[v3i.z] >= b1.min.v[v3i.z]) &&
                  (b0.min.v[v3i.z] <= b1.max.v[v3i.z]));
          };
          Box.intersectPlane = function (b0, p0) {
              var n1 = new vector3_5.Vector3((p0.v[pli.x] >= 0.0) ? b0.min.v[v3i.x] : b0.max.v[v3i.x], (p0.v[pli.y] >= 0.0) ? b0.min.v[v3i.y] : b0.max.v[v3i.y], (p0.v[pli.z] >= 0.0) ? b0.min.v[v3i.z] : b0.max.v[v3i.z]);
              var n0 = new vector3_5.Vector3((p0.v[pli.x] >= 0.0) ? b0.max.v[v3i.x] : b0.min.v[v3i.x], (p0.v[pli.y] >= 0.0) ? b0.max.v[v3i.y] : b0.min.v[v3i.y], (p0.v[pli.z] >= 0.0) ? b0.max.v[v3i.z] : b0.min.v[v3i.z]);
              var n2 = ((p0.v[pli.x] * n1.v[v3i.x]) +
                  (p0.v[pli.y] * n1.v[v3i.y])) +
                  (p0.v[pli.y] * n1.v[v3i.z]);
              if ((n2 + p0.v[pli.w]) > 0.0) {
                  return "front";
              }
              n2 = ((p0.v[pli.x] * n0.v[v3i.x]) +
                  (p0.v[pli.y] * n0.v[v3i.y])) +
                  (p0.v[pli.z] * n0.v[v3i.z]);
              if ((n2 + p0.v[pli.w]) < 0.0) {
                  return "back";
              }
              return "intersect";
          };
          Box.intersectRay = function (b0, r0) {
              return ray_2.Ray.intersectBox(r0, b0);
          };
          Box.intersectSphere = function (b0, s0) {
              var vector = vector3_5.Vector3.clamp(s0.position, b0.min, b0.max);
              var num = vector3_5.Vector3.distanceSq(s0.position, vector);
              return (num <= (s0.radius * s0.radius));
          };
          Box.fromSphere = function (s0) {
              return new Box(new vector3_5.Vector3(s0.position.v[v3i.x] - s0.radius, s0.position.v[v3i.y] - s0.radius, s0.position.v[v3i.z] - s0.radius), new vector3_5.Vector3(s0.position.v[v3i.x] + s0.radius, s0.position.v[v3i.y] + s0.radius, s0.position.v[v3i.z] + s0.radius));
          };
          Box.fromPoints = function (points) {
              var max = vector3_5.Vector3.MAX_VALUE;
              var min = vector3_5.Vector3.MIN_VALUE;
              for (var i = 0; i < points.length; i++) {
                  max = vector3_5.Vector3.min(max, points[i]);
                  min = vector3_5.Vector3.max(min, points[i]);
              }
              return new Box(min, max);
          };
          Box.clone = function (b0) {
              return new Box(b0.min.clone(), b0.max.clone());
          };
          Box.create = function (min, max) {
              return new Box(min, max);
          };
          return Box;
      }());
      exports.Box = Box;
  });
  define("math/plane", ["require", "exports", "math/vector3", "math/matrix"], function (require, exports, vector3_6, matrix_2) {
      "use strict";
      exports.__esModule = true;
      var qi = { x: 0, y: 1, z: 2, w: 3 };
      var pli = { x: 0, y: 1, z: 2, w: 3 };
      var v4i = { x: 0, y: 1, z: 2, w: 3 };
      var v3i = { x: 0, y: 1, z: 2 };
      var mi = {
          m11: 0, m12: 1, m13: 2, m14: 3,
          m21: 4, m22: 5, m23: 6, m24: 7,
          m31: 8, m32: 9, m33: 10, m34: 11,
          m41: 12, m42: 13, m43: 14, m44: 15
      };
      var Plane = (function () {
          function Plane(a, b, c, d) {
              this.v = new Float32Array(4);
              this.v[pli.x] = a === undefined ? 0.0 : a;
              this.v[pli.y] = b === undefined ? 0.0 : b;
              this.v[pli.z] = c === undefined ? 0.0 : c;
              this.v[pli.w] = d === undefined ? 0.0 : d;
          }
          Plane.prototype.a = function (value) {
              if (value !== undefined) {
                  this.v[pli.x] = value;
              }
              return this.v[pli.x];
          };
          Plane.prototype.b = function (value) {
              if (value !== undefined) {
                  this.v[pli.y] = value;
              }
              return this.v[pli.y];
          };
          Plane.prototype.c = function (value) {
              if (value !== undefined) {
                  this.v[pli.z] = value;
              }
              return this.v[pli.z];
          };
          Plane.prototype.d = function (value) {
              if (value !== undefined) {
                  this.v[pli.w] = value;
              }
              return this.v[pli.w];
          };
          Plane.prototype.normal = function () {
              return new vector3_6.Vector3(this.v[pli.x], this.v[pli.y], this.v[pli.z]);
          };
          Plane.prototype.toString = function () {
              return "[" + this.v[pli.x] + ", " + this.v[pli.y] + ", " + this.v[pli.z] + ", " + this.v[pli.w] + "]";
          };
          Plane.prototype.typeName = function () {
              return "Plane";
          };
          Plane.prototype.clone = function () {
              return Plane.clone(this);
          };
          Plane.equals = function (p0, p1) {
              return ((p0.v[pli.x] === p1.v[pli.x]) &&
                  (p0.v[pli.y] === p1.v[pli.y]) &&
                  (p0.v[pli.z] === p1.v[pli.z]));
          };
          Plane.normalize = function (p0) {
              var n0 = ((p0.v[pli.x] * p0.v[pli.x]) +
                  (p0.v[pli.y] * p0.v[pli.y])) +
                  (p0.v[pli.z] * p0.v[pli.z]);
              if (Math.abs((n0 - 1.0)) < 1.192093E-07) {
                  var p1 = new Plane();
                  p1.v[pli.x] = p0.v[pli.x];
                  p1.v[pli.y] = p0.v[pli.y];
                  p1.v[pli.z] = p0.v[pli.z];
                  p1.v[pli.w] = p0.v[pli.w];
                  return p1;
              }
              else {
                  var p1 = new Plane();
                  var n1 = 1.0 / Math.sqrt(n0);
                  p1.v[pli.x] = p0.v[pli.x] * n1;
                  p1.v[pli.y] = p0.v[pli.y] * n1;
                  p1.v[pli.z] = p0.v[pli.z] * n1;
                  p1.v[pli.w] = p0.v[pli.w] * n1;
                  return p1;
              }
          };
          Plane.fromPoints = function (point1, point2, point3) {
              var p0 = new Plane();
              var n0 = point2.v[v3i.x] - point1.v[v3i.x];
              var n1 = point2.v[v3i.y] - point1.v[v3i.y];
              var n2 = point2.v[v3i.z] - point1.v[v3i.z];
              var n3 = point3.v[v3i.x] - point1.v[v3i.x];
              var n4 = point3.v[v3i.y] - point1.v[v3i.y];
              var n5 = point3.v[v3i.z] - point1.v[v3i.z];
              var n6 = (n1 * n5) - (n2 * n4);
              var n7 = (n2 * n3) - (n0 * n5);
              var n8 = (n0 * n4) - (n1 * n3);
              var n9 = ((n6 * n6) + (n7 * n7)) + (n8 * n8);
              var n10 = 1.0 / Math.sqrt(n9);
              p0.v[pli.x] = n6 * n10;
              p0.v[pli.y] = n7 * n10;
              p0.v[pli.z] = n8 * n10;
              p0.v[pli.w] = -(((p0.v[pli.x] * point1.v[v3i.x]) +
                  (p0.v[pli.y] * point1.v[v3i.y])) +
                  (p0.v[pli.z] * point1.v[v3i.z]));
              return p0;
          };
          Plane.transform = function (p0, m0) {
              var p1 = new Plane();
              var m1 = matrix_2.Matrix.invert(m0);
              var x = p0.v[pli.x];
              var y = p0.v[pli.y];
              var z = p0.v[pli.z];
              var d = p0.v[pli.w];
              p1.v[pli.x] = (((x * m1.v[mi.m11]) + (y * m1.v[mi.m12])) + (z * m1.v[mi.m13])) + (d * m1.v[mi.m14]);
              p1.v[pli.y] = (((x * m1.v[mi.m21]) + (y * m1.v[mi.m22])) + (z * m1.v[mi.m23])) + (d * m1.v[mi.m24]);
              p1.v[pli.z] = (((x * m1.v[mi.m31]) + (y * m1.v[mi.m32])) + (z * m1.v[mi.m33])) + (d * m1.v[mi.m34]);
              p1.v[pli.w] = (((x * m1.v[mi.m41]) + (y * m1.v[mi.m42])) + (z * m1.v[mi.m43])) + (d * m1.v[mi.m44]);
              return p1;
          };
          Plane.dot4 = function (p0, v0) {
              return ((((p0.v[pli.x] * v0.v[v4i.x]) +
                  (p0.v[pli.y] * v0.v[v4i.y])) +
                  (p0.v[pli.z] * v0.v[v4i.z])) +
                  (p0.v[pli.w] * v0.v[v4i.w]));
          };
          Plane.dot3 = function (p0, v0) {
              return ((((p0.v[pli.x] * v0.v[v3i.x]) +
                  (p0.v[pli.y] * v0.v[v3i.y])) +
                  (p0.v[pli.z] * v0.v[v3i.z])) +
                  p0.v[pli.w]);
          };
          Plane.dotN = function (plane, normal) {
              return (((plane.v[pli.x] * normal.v[v3i.x]) +
                  (plane.v[pli.y] * normal.v[v3i.y])) +
                  (plane.v[pli.z] * normal.v[v3i.z]));
          };
          Plane.intersectBox = function (p0, b0) {
              var n0 = new vector3_6.Vector3((p0.v[pli.x] >= 0.0) ? b0.min.v[v3i.x] : b0.max.v[v3i.x], (p0.v[pli.y] >= 0.0) ? b0.min.v[v3i.y] : b0.max.v[v3i.y], (p0.v[pli.z] >= 0.0) ? b0.min.v[v3i.z] : b0.max.v[v3i.z]);
              var n1 = new vector3_6.Vector3((p0.v[pli.x] >= 0.0) ? b0.max.v[v3i.x] : b0.min.v[v3i.x], (p0.v[pli.y] >= 0.0) ? b0.max.v[v3i.y] : b0.min.v[v3i.y], (p0.v[pli.z] >= 0.0) ? b0.max.v[v3i.z] : b0.min.v[v3i.z]);
              var num = ((p0.v[pli.x] * n0.v[v3i.x]) +
                  (p0.v[pli.y] * n0.v[v3i.y])) +
                  (p0.v[pli.z] * n0.v[v3i.z]);
              if ((num + p0.v[pli.w]) > 0.0) {
                  return "front";
              }
              num = ((p0.v[pli.x] * n1.v[v3i.x]) +
                  (p0.v[pli.y] * n1.v[v3i.y])) +
                  (p0.v[pli.z] * n1.v[v3i.z]);
              if ((num + p0.v[pli.w]) < 0.0) {
                  return "back";
              }
              return "intersect";
          };
          Plane.intersectSphere = function (plane, sphere) {
              var n0 = ((sphere.position.v[v3i.x] * plane.v[pli.x]) +
                  (sphere.position.v[v3i.y] * plane.v[pli.y]) +
                  (sphere.position.v[v3i.z] * plane.v[pli.z]));
              var n1 = n0 + plane.v[pli.w];
              if (n1 > sphere.radius) {
                  return "front";
              }
              if (n1 < -sphere.radius) {
                  return "back";
              }
              return "intersect";
          };
          Plane.intersectFrustum = function (p0, f0) {
              var n0 = 0;
              for (var i = 0; i < 8; i++) {
                  var n1 = vector3_6.Vector3.dot(f0.corners[i], p0.normal());
                  if ((n1 + p0.v[pli.w]) > 0.0) {
                      n0 |= 1;
                  }
                  else {
                      n0 |= 2;
                  }
                  if (n0 == 3) {
                      return "intersect";
                  }
              }
              return (n0 == 1)
                  ? "front"
                  : "back";
          };
          Plane.clone = function (p0) {
              return new Plane(p0.v[pli.x], p0.v[pli.y], p0.v[pli.z], p0.v[pli.w]);
          };
          Plane.create = function (a, b, c, d) {
              return new Plane(a, b, c, d);
          };
          return Plane;
      }());
      exports.Plane = Plane;
  });
  define("math/matrix", ["require", "exports", "math/plane", "math/vector3"], function (require, exports, plane_3, vector3_7) {
      "use strict";
      exports.__esModule = true;
      var qui = { x: 0, y: 1, z: 2, w: 3 };
      var pli = { x: 0, y: 1, z: 2, w: 3 };
      var v3i = { x: 0, y: 1, z: 2 };
      var mi = {
          m11: 0, m12: 1, m13: 2, m14: 3,
          m21: 4, m22: 5, m23: 6, m24: 7,
          m31: 8, m32: 9, m33: 10, m34: 11,
          m41: 12, m42: 13, m43: 14, m44: 15
      };
      var Matrix = (function () {
          function Matrix(array) {
              this.v = new Float32Array(16);
              if (array !== undefined) {
                  for (var i = 0; i < array.length; i++) {
                      this.v[i] = array[i];
                  }
              }
              else {
                  this.v[mi.m11] = 1;
                  this.v[mi.m12] = 0;
                  this.v[mi.m13] = 0;
                  this.v[mi.m14] = 0;
                  this.v[mi.m21] = 0;
                  this.v[mi.m22] = 1;
                  this.v[mi.m23] = 0;
                  this.v[mi.m24] = 0;
                  this.v[mi.m31] = 0;
                  this.v[mi.m32] = 0;
                  this.v[mi.m33] = 1;
                  this.v[mi.m34] = 0;
                  this.v[mi.m41] = 0;
                  this.v[mi.m42] = 0;
                  this.v[mi.m43] = 0;
                  this.v[mi.m44] = 1;
              }
          }
          Matrix.prototype.m11 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m11] = value;
              }
              return this.v[mi.m11];
          };
          Matrix.prototype.m12 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m12] = value;
              }
              return this.v[mi.m12];
          };
          Matrix.prototype.m13 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m13] = value;
              }
              return this.v[mi.m13];
          };
          Matrix.prototype.m14 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m14] = value;
              }
              return this.v[mi.m14];
          };
          Matrix.prototype.m21 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m21] = value;
              }
              return this.v[mi.m21];
          };
          Matrix.prototype.m22 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m22] = value;
              }
              return this.v[mi.m22];
          };
          Matrix.prototype.m23 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m23] = value;
              }
              return this.v[mi.m23];
          };
          Matrix.prototype.m24 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m24] = value;
              }
              return this.v[mi.m24];
          };
          Matrix.prototype.m31 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m31] = value;
              }
              return this.v[mi.m31];
          };
          Matrix.prototype.m32 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m32] = value;
              }
              return this.v[mi.m32];
          };
          Matrix.prototype.m33 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m33] = value;
              }
              return this.v[mi.m33];
          };
          Matrix.prototype.m34 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m34] = value;
              }
              return this.v[mi.m34];
          };
          Matrix.prototype.m41 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m41] = value;
              }
              return this.v[mi.m41];
          };
          Matrix.prototype.m42 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m42] = value;
              }
              return this.v[mi.m42];
          };
          Matrix.prototype.m43 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m43] = value;
              }
              return this.v[mi.m43];
          };
          Matrix.prototype.m44 = function (value) {
              if (value !== undefined) {
                  this.v[mi.m44] = value;
              }
              return this.v[mi.m44];
          };
          Matrix.prototype.up = function (vector) {
              if (vector !== undefined) {
                  this.v[mi.m21] = vector.v[v3i.x];
                  this.v[mi.m22] = vector.v[v3i.y];
                  this.v[mi.m23] = vector.v[v3i.z];
              }
              return new vector3_7.Vector3(this.v[mi.m21], this.v[mi.m22], this.v[mi.m23]);
          };
          Matrix.prototype.down = function (vector) {
              if (vector !== undefined) {
                  this.v[mi.m21] = -vector.v[v3i.x];
                  this.v[mi.m22] = -vector.v[v3i.y];
                  this.v[mi.m23] = -vector.v[v3i.z];
              }
              return new vector3_7.Vector3(-this.v[mi.m21], -this.v[mi.m22], -this.v[mi.m23]);
          };
          Matrix.prototype.right = function (vector) {
              if (vector !== undefined) {
                  this.v[mi.m11] = vector.v[v3i.x];
                  this.v[mi.m12] = vector.v[v3i.y];
                  this.v[mi.m13] = vector.v[v3i.z];
              }
              return new vector3_7.Vector3(this.v[mi.m11], this.v[mi.m12], this.v[mi.m13]);
          };
          Matrix.prototype.left = function (vector) {
              if (vector !== undefined) {
                  this.v[mi.m11] = -vector.v[v3i.x];
                  this.v[mi.m12] = -vector.v[v3i.y];
                  this.v[mi.m13] = -vector.v[v3i.z];
              }
              return new vector3_7.Vector3(-this.v[mi.m11], -this.v[mi.m12], -this.v[mi.m13]);
          };
          Matrix.prototype.forward = function (vector) {
              if (vector !== undefined) {
                  this.v[mi.m31] = -vector.v[v3i.x];
                  this.v[mi.m32] = -vector.v[v3i.y];
                  this.v[mi.m33] = -vector.v[v3i.z];
              }
              return new vector3_7.Vector3(-this.v[mi.m31], -this.v[mi.m32], -this.v[mi.m33]);
          };
          Matrix.prototype.backward = function (vector) {
              if (vector !== undefined) {
                  this.v[mi.m31] = vector.v[v3i.x];
                  this.v[mi.m32] = vector.v[v3i.y];
                  this.v[mi.m33] = vector.v[v3i.z];
              }
              return new vector3_7.Vector3(this.v[mi.m31], this.v[mi.m32], this.v[mi.m33]);
          };
          Matrix.prototype.translation = function (vector) {
              if (vector !== undefined) {
                  this.v[mi.m41] = vector.v[v3i.x];
                  this.v[mi.m42] = vector.v[v3i.y];
                  this.v[mi.m43] = vector.v[v3i.z];
              }
              return new vector3_7.Vector3(this.v[mi.m41], this.v[mi.m42], this.v[mi.m43]);
          };
          Matrix.prototype.translate = function (v0) {
              return Matrix.mul(this, Matrix.translation(v0));
          };
          Matrix.prototype.scale = function (v0) {
              return Matrix.mul(this, Matrix.scale(v0));
          };
          Matrix.prototype.rotateX = function (radian) {
              return Matrix.mul(this, Matrix.rotationX(radian));
          };
          Matrix.prototype.rotateY = function (radian) {
              return Matrix.mul(this, Matrix.rotationY(radian));
          };
          Matrix.prototype.rotateZ = function (radian) {
              return Matrix.mul(this, Matrix.rotationZ(radian));
          };
          Matrix.prototype.toString = function () {
              var buf = new Array();
              buf.push("[" + this.v[mi.m11] + ", " + this.v[mi.m12] + ", " + this.v[mi.m13] + ", " + this.v[mi.m14]);
              buf.push(" " + this.v[mi.m21] + ", " + this.v[mi.m22] + ", " + this.v[mi.m23] + ", " + this.v[mi.m24]);
              buf.push(" " + this.v[mi.m31] + ", " + this.v[mi.m32] + ", " + this.v[mi.m33] + ", " + this.v[mi.m34]);
              buf.push(" " + this.v[mi.m41] + ", " + this.v[mi.m42] + ", " + this.v[mi.m43] + ", " + this.v[mi.m44] + "]");
              return buf.join('\n');
          };
          Matrix.prototype.typeName = function () {
              return "Matrix";
          };
          Matrix.prototype.clone = function () {
              return Matrix.clone(this);
          };
          Matrix.identity = function () {
              return new Matrix();
          };
          Matrix.translation = function (v0) {
              return new Matrix([
                  1, 0, 0, 0,
                  0, 1, 0, 0,
                  0, 0, 1, 0,
                  v0.v[v3i.x], v0.v[v3i.y], v0.v[v3i.z], 1
              ]);
          };
          Matrix.scale = function (v0) {
              return new Matrix([
                  v0.v[v3i.x], 0, 0, 0,
                  0, v0.v[v3i.y], 0, 0,
                  0, 0, v0.v[v3i.z], 0,
                  0, 0, 0, 1
              ]);
          };
          Matrix.rotationX = function (radians) {
              var cos = Math.cos(radians);
              var sin = Math.sin(radians);
              return new Matrix([
                  1, 0, 0, 0,
                  0, cos, sin, 0,
                  0, -sin, cos, 0,
                  0, 0, 0, 1
              ]);
          };
          Matrix.rotationY = function (radians) {
              var cos = Math.cos(radians);
              var sin = Math.sin(radians);
              return new Matrix([
                  cos, 0, -sin, 0,
                  0, 1, 0, 0,
                  sin, 0, cos, 0,
                  0, 0, 0, 1
              ]);
          };
          Matrix.rotationZ = function (radians) {
              var cos = Math.cos(radians);
              var sin = Math.sin(radians);
              return new Matrix([
                  cos, sin, 0, 0,
                  -sin, cos, 0, 0,
                  0, 0, 1, 0,
                  0, 0, 0, 1
              ]);
          };
          Matrix.fromAxisAngle = function (axis, radians) {
              var x = axis.v[v3i.x];
              var y = axis.v[v3i.y];
              var z = axis.v[v3i.z];
              var n0 = Math.sin(radians);
              var n1 = Math.cos(radians);
              var n2 = x * x;
              var n3 = y * y;
              var n4 = z * z;
              var n5 = x * y;
              var n6 = x * z;
              var n7 = y * z;
              return new Matrix([
                  n2 + (n1 * (1.0 - n2)),
                  (n5 - (n1 * n5)) + (n0 * z),
                  (n6 - (n1 * n6)) - (n0 * y),
                  0.0,
                  (n5 - (n1 * n5)) - (n0 * z),
                  n3 + (n1 * (1.0 - n3)),
                  (n7 - (n1 * n7)) + (n0 * x),
                  0.0,
                  (n6 - (n1 * n6)) + (n0 * y),
                  (n7 - (n1 * n7)) - (n0 * x),
                  n4 + (n1 * (1.0 - n4)),
                  0.0,
                  0.0, 0.0, 0.0, 1.0
              ]);
          };
          Matrix.perspectiveFov = function (fov, aspect, near, far) {
              var n0 = 1.0 / Math.tan(fov * 0.5);
              var n1 = n0 / aspect;
              var m0 = new Matrix();
              m0.v[mi.m11] = n1;
              m0.v[mi.m12] = m0.v[mi.m13] = m0.v[mi.m14] = 0;
              m0.v[mi.m22] = n0;
              m0.v[mi.m21] = m0.v[mi.m23] = m0.v[mi.m24] = 0;
              m0.v[mi.m31] = m0.v[mi.m32] = 0;
              m0.v[mi.m33] = far / (near - far);
              m0.v[mi.m34] = -1;
              m0.v[mi.m41] = m0.v[mi.m42] = m0.v[mi.m44] = 0;
              m0.v[mi.m43] = (near * far) / (near - far);
              return m0;
          };
          Matrix.perspective = function (width, height, near, far) {
              var m0 = new Matrix();
              m0.v[mi.m11] = (2.0 * near) / width;
              m0.v[mi.m12] = m0.v[mi.m13] = m0.v[mi.m14] = 0.0;
              m0.v[mi.m22] = (2.0 * near) / height;
              m0.v[mi.m21] = m0.v[mi.m23] = m0.v[mi.m24] = 0.0;
              m0.v[mi.m33] = far / (near - far);
              m0.v[mi.m31] = m0.v[mi.m32] = 0.0;
              m0.v[mi.m34] = -1.0;
              m0.v[mi.m41] = m0.v[mi.m42] = m0.v[mi.m44] = 0.0;
              m0.v[mi.m43] = (near * far) / (near - far);
              return m0;
          };
          Matrix.perspectiveOffset = function (left, right, bottom, top, near, far) {
              var m0 = new Matrix();
              m0.v[mi.m11] = (2.0 * near) / (right - left);
              m0.v[mi.m12] = m0.v[mi.m13] = m0.v[mi.m14] = 0.0;
              m0.v[mi.m22] = (2.0 * near) / (top - bottom);
              m0.v[mi.m21] = m0.v[mi.m23] = m0.v[mi.m24] = 0.0;
              m0.v[mi.m31] = (left + right) / (right - left);
              m0.v[mi.m32] = (top + bottom) / (top - bottom);
              m0.v[mi.m33] = far / (near - far);
              m0.v[mi.m34] = -1.0;
              m0.v[mi.m43] = (near * far) / (near - far);
              m0.v[mi.m41] = m0.v[mi.m42] = m0.v[mi.m44] = 0.0;
              return m0;
          };
          Matrix.orthographic = function (width, height, near, far) {
              var m0 = new Matrix();
              m0.v[mi.m11] = 2.0 / width;
              m0.v[mi.m12] = m0.v[mi.m13] = m0.v[mi.m14] = 0.0;
              m0.v[mi.m22] = 2.0 / height;
              m0.v[mi.m21] = m0.v[mi.m23] = m0.v[mi.m24] = 0.0;
              m0.v[mi.m33] = 1.0 / (near - far);
              m0.v[mi.m31] = m0.v[mi.m32] = m0.v[mi.m34] = 0.0;
              m0.v[mi.m41] = m0.v[mi.m42] = 0.0;
              m0.v[mi.m43] = near / (near - far);
              m0.v[mi.m44] = 1.0;
              return m0;
          };
          Matrix.orthographicOffset = function (left, right, bottom, top, near, far) {
              var m0 = new Matrix();
              m0.v[mi.m11] = 2.0 / (right - left);
              m0.v[mi.m12] = m0.v[mi.m13] = m0.v[mi.m14] = 0.0;
              m0.v[mi.m22] = 2.0 / (top - bottom);
              m0.v[mi.m21] = m0.v[mi.m23] = m0.v[mi.m24] = 0.0;
              m0.v[mi.m33] = 1.0 / (near - far);
              m0.v[mi.m31] = m0.v[mi.m32] = m0.v[mi.m34] = 0.0;
              m0.v[mi.m41] = (left + right) / (left - right);
              m0.v[mi.m42] = (top + bottom) / (bottom - top);
              m0.v[mi.m43] = near / (near - far);
              m0.v[mi.m44] = 1.0;
              return m0;
          };
          Matrix.lookAt = function (position, target, up) {
              var m0 = new Matrix();
              var v0 = vector3_7.Vector3.normalize(vector3_7.Vector3.sub(position, target));
              var v1 = vector3_7.Vector3.normalize(vector3_7.Vector3.cross(up, v0));
              var v2 = vector3_7.Vector3.cross(v0, v1);
              m0.v[mi.m11] = v1.v[v3i.x];
              m0.v[mi.m12] = v2.v[v3i.x];
              m0.v[mi.m13] = v0.v[v3i.x];
              m0.v[mi.m14] = 0.0;
              m0.v[mi.m21] = v1.v[v3i.y];
              m0.v[mi.m22] = v2.v[v3i.y];
              m0.v[mi.m23] = v0.v[v3i.y];
              m0.v[mi.m24] = 0.0;
              m0.v[mi.m31] = v1.v[v3i.z];
              m0.v[mi.m32] = v2.v[v3i.z];
              m0.v[mi.m33] = v0.v[v3i.z];
              m0.v[mi.m34] = 0.0;
              m0.v[mi.m41] = -vector3_7.Vector3.dot(v1, position);
              m0.v[mi.m42] = -vector3_7.Vector3.dot(v2, position);
              m0.v[mi.m43] = -vector3_7.Vector3.dot(v0, position);
              m0.v[mi.m44] = 1.0;
              return m0;
          };
          Matrix.world = function (position, forward, up) {
              var m0 = new Matrix();
              var v0 = vector3_7.Vector3.normalize(vector3_7.Vector3.sub(position, forward));
              var v1 = vector3_7.Vector3.normalize(vector3_7.Vector3.cross(up, v0));
              var v2 = vector3_7.Vector3.cross(v0, v1);
              m0.v[mi.m11] = v1.v[v3i.x];
              m0.v[mi.m12] = v1.v[v3i.y];
              m0.v[mi.m13] = v1.v[v3i.z];
              m0.v[mi.m21] = v2.v[v3i.x];
              m0.v[mi.m22] = v2.v[v3i.y];
              m0.v[mi.m23] = v2.v[v3i.z];
              m0.v[mi.m31] = v0.v[v3i.x];
              m0.v[mi.m32] = v0.v[v3i.y];
              m0.v[mi.m33] = v0.v[v3i.z];
              m0.v[mi.m41] = 0.0;
              m0.v[mi.m42] = 0.0;
              m0.v[mi.m43] = 0.0;
              m0.v[mi.m44] = 1.0;
              m0.v[mi.m14] = -vector3_7.Vector3.dot(v1, position);
              m0.v[mi.m24] = -vector3_7.Vector3.dot(v2, position);
              m0.v[mi.m34] = -vector3_7.Vector3.dot(v0, position);
              return m0;
          };
          Matrix.fromQuaternion = function (q0) {
              var m0 = new Matrix();
              var n0 = q0.v[qui.x] * q0.v[qui.x];
              var n1 = q0.v[qui.y] * q0.v[qui.y];
              var n2 = q0.v[qui.z] * q0.v[qui.z];
              var n3 = q0.v[qui.x] * q0.v[qui.y];
              var n4 = q0.v[qui.z] * q0.v[qui.w];
              var n5 = q0.v[qui.z] * q0.v[qui.x];
              var n6 = q0.v[qui.y] * q0.v[qui.w];
              var n7 = q0.v[qui.y] * q0.v[qui.z];
              var n8 = q0.v[qui.x] * q0.v[qui.w];
              m0.v[mi.m11] = 1.0 - (2.0 * (n1 + n2));
              m0.v[mi.m12] = 2.0 * (n3 + n4);
              m0.v[mi.m13] = 2.0 * (n5 - n6);
              m0.v[mi.m14] = 0.0;
              m0.v[mi.m21] = 2.0 * (n3 - n4);
              m0.v[mi.m22] = 1.0 - (2.0 * (n2 + n0));
              m0.v[mi.m23] = 2.0 * (n7 + n8);
              m0.v[mi.m24] = 0.0;
              m0.v[mi.m31] = 2.0 * (n5 + n6);
              m0.v[mi.m32] = 2.0 * (n7 - n8);
              m0.v[mi.m33] = 1.0 - (2.0 * (n1 + n0));
              m0.v[mi.m34] = 0.0;
              m0.v[mi.m41] = 0.0;
              m0.v[mi.m42] = 0.0;
              m0.v[mi.m43] = 0.0;
              m0.v[mi.m44] = 1.0;
              return m0;
          };
          Matrix.reflection = function (p0) {
              var m0 = new Matrix();
              var p1 = plane_3.Plane.normalize(p0);
              var x = p1.v[pli.x];
              var y = p1.v[pli.y];
              var z = p1.v[pli.z];
              var n0 = -2.0 * x;
              var n1 = -2.0 * y;
              var n2 = -2.0 * z;
              m0.v[mi.m11] = (n0 * x) + 1.0;
              m0.v[mi.m12] = n1 * x;
              m0.v[mi.m13] = n2 * x;
              m0.v[mi.m14] = 0.0;
              m0.v[mi.m21] = n0 * y;
              m0.v[mi.m22] = (n1 * y) + 1.0;
              m0.v[mi.m23] = n2 * y;
              m0.v[mi.m24] = 0.0;
              m0.v[mi.m31] = n0 * z;
              m0.v[mi.m32] = n1 * z;
              m0.v[mi.m33] = (n2 * z) + 1.0;
              m0.v[mi.m34] = 0.0;
              m0.v[mi.m41] = n0 * p1.v[pli.w];
              m0.v[mi.m42] = n1 * p1.v[pli.w];
              m0.v[mi.m43] = n2 * p1.v[pli.w];
              m0.v[mi.m44] = 1.0;
              return m0;
          };
          Matrix.invert = function (m0) {
              var m1 = new Matrix();
              var n0 = m0.v[mi.m11];
              var n1 = m0.v[mi.m12];
              var n2 = m0.v[mi.m13];
              var n3 = m0.v[mi.m14];
              var n4 = m0.v[mi.m21];
              var n5 = m0.v[mi.m22];
              var n6 = m0.v[mi.m23];
              var n7 = m0.v[mi.m24];
              var n8 = m0.v[mi.m31];
              var n9 = m0.v[mi.m32];
              var n10 = m0.v[mi.m33];
              var n11 = m0.v[mi.m34];
              var n12 = m0.v[mi.m41];
              var n13 = m0.v[mi.m42];
              var n14 = m0.v[mi.m43];
              var n15 = m0.v[mi.m44];
              var n16 = (n10 * n15) - (n11 * n14);
              var n17 = (n9 * n15) - (n11 * n13);
              var n18 = (n9 * n14) - (n10 * n13);
              var n19 = (n8 * n15) - (n11 * n12);
              var n20 = (n8 * n14) - (n10 * n12);
              var n21 = (n8 * n13) - (n9 * n12);
              var n22 = ((n5 * n16) - (n6 * n17)) + (n7 * n18);
              var n23 = -(((n4 * n16) - (n6 * n19)) + (n7 * n20));
              var n24 = ((n4 * n17) - (n5 * n19)) + (n7 * n21);
              var n25 = -(((n4 * n18) - (n5 * n20)) + (n6 * n21));
              var n26 = 1.0 / ((((n0 * n22) + (n1 * n23)) + (n2 * n24)) + (n3 * n25));
              m1.v[mi.m11] = n22 * n26;
              m1.v[mi.m21] = n23 * n26;
              m1.v[mi.m31] = n24 * n26;
              m1.v[mi.m41] = n25 * n26;
              m1.v[mi.m12] = -(((n1 * n16) - (n2 * n17)) + (n3 * n18)) * n26;
              m1.v[mi.m22] = (((n0 * n16) - (n2 * n19)) + (n3 * n20)) * n26;
              m1.v[mi.m32] = -(((n0 * n17) - (n1 * n19)) + (n3 * n21)) * n26;
              m1.v[mi.m42] = (((n0 * n18) - (n1 * n20)) + (n2 * n21)) * n26;
              var n27 = (n6 * n15) - (n7 * n14);
              var n28 = (n5 * n15) - (n7 * n13);
              var n29 = (n5 * n14) - (n6 * n13);
              var n30 = (n4 * n15) - (n7 * n12);
              var n32 = (n4 * n14) - (n6 * n12);
              var n33 = (n4 * n13) - (n5 * n12);
              m1.v[mi.m13] = (((n1 * n27) - (n2 * n28)) + (n3 * n29)) * n26;
              m1.v[mi.m23] = -(((n0 * n27) - (n2 * n30)) + (n3 * n32)) * n26;
              m1.v[mi.m33] = (((n0 * n28) - (n1 * n30)) + (n3 * n33)) * n26;
              m1.v[mi.m43] = -(((n0 * n29) - (n1 * n32)) + (n2 * n33)) * n26;
              var n34 = (n6 * n11) - (n7 * n10);
              var n35 = (n5 * n11) - (n7 * n9);
              var n36 = (n5 * n10) - (n6 * n9);
              var n37 = (n4 * n11) - (n7 * n8);
              var n38 = (n4 * n10) - (n6 * n8);
              var n39 = (n4 * n9) - (n5 * n8);
              m1.v[mi.m14] = -(((n1 * n34) - (n2 * n35)) + (n3 * n36)) * n26;
              m1.v[mi.m24] = (((n0 * n34) - (n2 * n37)) + (n3 * n38)) * n26;
              m1.v[mi.m34] = -(((n0 * n35) - (n1 * n37)) + (n3 * n39)) * n26;
              m1.v[mi.m44] = (((n0 * n36) - (n1 * n38)) + (n2 * n39)) * n26;
              return m1;
          };
          Matrix.transpose = function (m0) {
              var m1 = new Matrix();
              m1.v[mi.m11] = m0.v[mi.m11];
              m1.v[mi.m12] = m0.v[mi.m21];
              m1.v[mi.m13] = m0.v[mi.m31];
              m1.v[mi.m14] = m0.v[mi.m41];
              m1.v[mi.m21] = m0.v[mi.m12];
              m1.v[mi.m22] = m0.v[mi.m22];
              m1.v[mi.m23] = m0.v[mi.m32];
              m1.v[mi.m24] = m0.v[mi.m42];
              m1.v[mi.m31] = m0.v[mi.m13];
              m1.v[mi.m32] = m0.v[mi.m23];
              m1.v[mi.m33] = m0.v[mi.m33];
              m1.v[mi.m34] = m0.v[mi.m43];
              m1.v[mi.m41] = m0.v[mi.m14];
              m1.v[mi.m42] = m0.v[mi.m24];
              m1.v[mi.m43] = m0.v[mi.m34];
              m1.v[mi.m44] = m0.v[mi.m44];
              return m1;
          };
          Matrix.determinant = function (m0) {
              var n0 = m0.v[mi.m11];
              var n1 = m0.v[mi.m12];
              var n2 = m0.v[mi.m13];
              var n3 = m0.v[mi.m14];
              var n4 = m0.v[mi.m21];
              var n5 = m0.v[mi.m22];
              var n6 = m0.v[mi.m23];
              var n7 = m0.v[mi.m24];
              var n8 = m0.v[mi.m31];
              var n9 = m0.v[mi.m32];
              var n10 = m0.v[mi.m33];
              var n11 = m0.v[mi.m34];
              var n12 = m0.v[mi.m41];
              var n13 = m0.v[mi.m42];
              var n14 = m0.v[mi.m43];
              var n15 = m0.v[mi.m44];
              var n16 = (n10 * n15) - (n11 * n14);
              var n17 = (n9 * n15) - (n11 * n13);
              var n18 = (n9 * n14) - (n10 * n13);
              var n19 = (n8 * n15) - (n11 * n12);
              var n20 = (n8 * n14) - (n10 * n12);
              var n21 = (n8 * n13) - (n9 * n12);
              return ((((n0 * (((n5 * n16) - (n6 * n17)) + (n7 * n18))) -
                  (n1 * (((n4 * n16) - (n6 * n19)) + (n7 * n20)))) + (n2 * (((n4 * n17) -
                  (n5 * n19)) + (n7 * n21)))) - (n3 * (((n4 * n18) - (n5 * n20)) + (n6 * n21))));
          };
          Matrix.lerp = function (m0, m1, amount) {
              var m2 = new Matrix();
              m2.v[mi.m11] = m0.v[mi.m11] + ((m1.v[mi.m11] - m0.v[mi.m11]) * amount);
              m2.v[mi.m12] = m0.v[mi.m12] + ((m1.v[mi.m12] - m0.v[mi.m12]) * amount);
              m2.v[mi.m13] = m0.v[mi.m13] + ((m1.v[mi.m13] - m0.v[mi.m13]) * amount);
              m2.v[mi.m14] = m0.v[mi.m14] + ((m1.v[mi.m14] - m0.v[mi.m14]) * amount);
              m2.v[mi.m21] = m0.v[mi.m21] + ((m1.v[mi.m21] - m0.v[mi.m21]) * amount);
              m2.v[mi.m22] = m0.v[mi.m22] + ((m1.v[mi.m22] - m0.v[mi.m22]) * amount);
              m2.v[mi.m23] = m0.v[mi.m23] + ((m1.v[mi.m23] - m0.v[mi.m23]) * amount);
              m2.v[mi.m24] = m0.v[mi.m24] + ((m1.v[mi.m24] - m0.v[mi.m24]) * amount);
              m2.v[mi.m31] = m0.v[mi.m31] + ((m1.v[mi.m31] - m0.v[mi.m31]) * amount);
              m2.v[mi.m32] = m0.v[mi.m32] + ((m1.v[mi.m32] - m0.v[mi.m32]) * amount);
              m2.v[mi.m33] = m0.v[mi.m33] + ((m1.v[mi.m33] - m0.v[mi.m33]) * amount);
              m2.v[mi.m34] = m0.v[mi.m34] + ((m1.v[mi.m34] - m0.v[mi.m34]) * amount);
              m2.v[mi.m41] = m0.v[mi.m41] + ((m1.v[mi.m41] - m0.v[mi.m41]) * amount);
              m2.v[mi.m42] = m0.v[mi.m42] + ((m1.v[mi.m42] - m0.v[mi.m42]) * amount);
              m2.v[mi.m43] = m0.v[mi.m43] + ((m1.v[mi.m43] - m0.v[mi.m43]) * amount);
              m2.v[mi.m44] = m0.v[mi.m44] + ((m1.v[mi.m44] - m0.v[mi.m44]) * amount);
              return m2;
          };
          Matrix.negate = function (m0) {
              var m1 = new Matrix();
              m1.v[mi.m11] = -m0.v[mi.m11];
              m1.v[mi.m12] = -m0.v[mi.m12];
              m1.v[mi.m13] = -m0.v[mi.m13];
              m1.v[mi.m14] = -m0.v[mi.m14];
              m1.v[mi.m21] = -m0.v[mi.m21];
              m1.v[mi.m22] = -m0.v[mi.m22];
              m1.v[mi.m23] = -m0.v[mi.m23];
              m1.v[mi.m24] = -m0.v[mi.m24];
              m1.v[mi.m31] = -m0.v[mi.m31];
              m1.v[mi.m32] = -m0.v[mi.m32];
              m1.v[mi.m33] = -m0.v[mi.m33];
              m1.v[mi.m34] = -m0.v[mi.m34];
              m1.v[mi.m41] = -m0.v[mi.m41];
              m1.v[mi.m42] = -m0.v[mi.m42];
              m1.v[mi.m43] = -m0.v[mi.m43];
              m1.v[mi.m44] = -m0.v[mi.m44];
              return m1;
          };
          Matrix.add = function (m0, m1) {
              var m2 = new Matrix();
              m2.v[mi.m11] = m0.v[mi.m11] + m1.v[mi.m11];
              m2.v[mi.m12] = m0.v[mi.m12] + m1.v[mi.m12];
              m2.v[mi.m13] = m0.v[mi.m13] + m1.v[mi.m13];
              m2.v[mi.m14] = m0.v[mi.m14] + m1.v[mi.m14];
              m2.v[mi.m21] = m0.v[mi.m21] + m1.v[mi.m21];
              m2.v[mi.m22] = m0.v[mi.m22] + m1.v[mi.m22];
              m2.v[mi.m23] = m0.v[mi.m23] + m1.v[mi.m23];
              m2.v[mi.m24] = m0.v[mi.m24] + m1.v[mi.m24];
              m2.v[mi.m31] = m0.v[mi.m31] + m1.v[mi.m31];
              m2.v[mi.m32] = m0.v[mi.m32] + m1.v[mi.m32];
              m2.v[mi.m33] = m0.v[mi.m33] + m1.v[mi.m33];
              m2.v[mi.m34] = m0.v[mi.m34] + m1.v[mi.m34];
              m2.v[mi.m41] = m0.v[mi.m41] + m1.v[mi.m41];
              m2.v[mi.m42] = m0.v[mi.m42] + m1.v[mi.m42];
              m2.v[mi.m43] = m0.v[mi.m43] + m1.v[mi.m43];
              m2.v[mi.m44] = m0.v[mi.m44] + m1.v[mi.m44];
              return m2;
          };
          Matrix.sub = function (m0, m1) {
              var m2 = new Matrix();
              m2.v[mi.m11] = m0.v[mi.m11] - m1.v[mi.m11];
              m2.v[mi.m12] = m0.v[mi.m12] - m1.v[mi.m12];
              m2.v[mi.m13] = m0.v[mi.m13] - m1.v[mi.m13];
              m2.v[mi.m14] = m0.v[mi.m14] - m1.v[mi.m14];
              m2.v[mi.m21] = m0.v[mi.m21] - m1.v[mi.m21];
              m2.v[mi.m22] = m0.v[mi.m22] - m1.v[mi.m22];
              m2.v[mi.m23] = m0.v[mi.m23] - m1.v[mi.m23];
              m2.v[mi.m24] = m0.v[mi.m24] - m1.v[mi.m24];
              m2.v[mi.m31] = m0.v[mi.m31] - m1.v[mi.m31];
              m2.v[mi.m32] = m0.v[mi.m32] - m1.v[mi.m32];
              m2.v[mi.m33] = m0.v[mi.m33] - m1.v[mi.m33];
              m2.v[mi.m34] = m0.v[mi.m34] - m1.v[mi.m34];
              m2.v[mi.m41] = m0.v[mi.m41] - m1.v[mi.m41];
              m2.v[mi.m42] = m0.v[mi.m42] - m1.v[mi.m42];
              m2.v[mi.m43] = m0.v[mi.m43] - m1.v[mi.m43];
              m2.v[mi.m44] = m0.v[mi.m44] - m1.v[mi.m44];
              return m2;
          };
          Matrix.mul = function (m0, m1) {
              var m2 = new Matrix();
              m2.v[mi.m11] = (((m0.v[mi.m11] * m1.v[mi.m11]) + (m0.v[mi.m12] * m1.v[mi.m21])) + (m0.v[mi.m13] * m1.v[mi.m31])) + (m0.v[mi.m14] * m1.v[mi.m41]);
              m2.v[mi.m12] = (((m0.v[mi.m11] * m1.v[mi.m12]) + (m0.v[mi.m12] * m1.v[mi.m22])) + (m0.v[mi.m13] * m1.v[mi.m32])) + (m0.v[mi.m14] * m1.v[mi.m42]);
              m2.v[mi.m13] = (((m0.v[mi.m11] * m1.v[mi.m13]) + (m0.v[mi.m12] * m1.v[mi.m23])) + (m0.v[mi.m13] * m1.v[mi.m33])) + (m0.v[mi.m14] * m1.v[mi.m43]);
              m2.v[mi.m14] = (((m0.v[mi.m11] * m1.v[mi.m14]) + (m0.v[mi.m12] * m1.v[mi.m24])) + (m0.v[mi.m13] * m1.v[mi.m34])) + (m0.v[mi.m14] * m1.v[mi.m44]);
              m2.v[mi.m21] = (((m0.v[mi.m21] * m1.v[mi.m11]) + (m0.v[mi.m22] * m1.v[mi.m21])) + (m0.v[mi.m23] * m1.v[mi.m31])) + (m0.v[mi.m24] * m1.v[mi.m41]);
              m2.v[mi.m22] = (((m0.v[mi.m21] * m1.v[mi.m12]) + (m0.v[mi.m22] * m1.v[mi.m22])) + (m0.v[mi.m23] * m1.v[mi.m32])) + (m0.v[mi.m24] * m1.v[mi.m42]);
              m2.v[mi.m23] = (((m0.v[mi.m21] * m1.v[mi.m13]) + (m0.v[mi.m22] * m1.v[mi.m23])) + (m0.v[mi.m23] * m1.v[mi.m33])) + (m0.v[mi.m24] * m1.v[mi.m43]);
              m2.v[mi.m24] = (((m0.v[mi.m21] * m1.v[mi.m14]) + (m0.v[mi.m22] * m1.v[mi.m24])) + (m0.v[mi.m23] * m1.v[mi.m34])) + (m0.v[mi.m24] * m1.v[mi.m44]);
              m2.v[mi.m31] = (((m0.v[mi.m31] * m1.v[mi.m11]) + (m0.v[mi.m32] * m1.v[mi.m21])) + (m0.v[mi.m33] * m1.v[mi.m31])) + (m0.v[mi.m34] * m1.v[mi.m41]);
              m2.v[mi.m32] = (((m0.v[mi.m31] * m1.v[mi.m12]) + (m0.v[mi.m32] * m1.v[mi.m22])) + (m0.v[mi.m33] * m1.v[mi.m32])) + (m0.v[mi.m34] * m1.v[mi.m42]);
              m2.v[mi.m33] = (((m0.v[mi.m31] * m1.v[mi.m13]) + (m0.v[mi.m32] * m1.v[mi.m23])) + (m0.v[mi.m33] * m1.v[mi.m33])) + (m0.v[mi.m34] * m1.v[mi.m43]);
              m2.v[mi.m34] = (((m0.v[mi.m31] * m1.v[mi.m14]) + (m0.v[mi.m32] * m1.v[mi.m24])) + (m0.v[mi.m33] * m1.v[mi.m34])) + (m0.v[mi.m34] * m1.v[mi.m44]);
              m2.v[mi.m41] = (((m0.v[mi.m41] * m1.v[mi.m11]) + (m0.v[mi.m42] * m1.v[mi.m21])) + (m0.v[mi.m43] * m1.v[mi.m31])) + (m0.v[mi.m44] * m1.v[mi.m41]);
              m2.v[mi.m42] = (((m0.v[mi.m41] * m1.v[mi.m12]) + (m0.v[mi.m42] * m1.v[mi.m22])) + (m0.v[mi.m43] * m1.v[mi.m32])) + (m0.v[mi.m44] * m1.v[mi.m42]);
              m2.v[mi.m43] = (((m0.v[mi.m41] * m1.v[mi.m13]) + (m0.v[mi.m42] * m1.v[mi.m23])) + (m0.v[mi.m43] * m1.v[mi.m33])) + (m0.v[mi.m44] * m1.v[mi.m43]);
              m2.v[mi.m44] = (((m0.v[mi.m41] * m1.v[mi.m14]) + (m0.v[mi.m42] * m1.v[mi.m24])) + (m0.v[mi.m43] * m1.v[mi.m34])) + (m0.v[mi.m44] * m1.v[mi.m44]);
              return m2;
          };
          Matrix.div = function (m0, m1) {
              var m2 = new Matrix();
              m2.v[mi.m11] = m0.v[mi.m11] / m1.v[mi.m11];
              m2.v[mi.m12] = m0.v[mi.m12] / m1.v[mi.m12];
              m2.v[mi.m13] = m0.v[mi.m13] / m1.v[mi.m13];
              m2.v[mi.m14] = m0.v[mi.m14] / m1.v[mi.m14];
              m2.v[mi.m21] = m0.v[mi.m21] / m1.v[mi.m21];
              m2.v[mi.m22] = m0.v[mi.m22] / m1.v[mi.m22];
              m2.v[mi.m23] = m0.v[mi.m23] / m1.v[mi.m23];
              m2.v[mi.m24] = m0.v[mi.m24] / m1.v[mi.m24];
              m2.v[mi.m31] = m0.v[mi.m31] / m1.v[mi.m31];
              m2.v[mi.m32] = m0.v[mi.m32] / m1.v[mi.m32];
              m2.v[mi.m33] = m0.v[mi.m33] / m1.v[mi.m33];
              m2.v[mi.m34] = m0.v[mi.m34] / m1.v[mi.m34];
              m2.v[mi.m41] = m0.v[mi.m41] / m1.v[mi.m41];
              m2.v[mi.m42] = m0.v[mi.m42] / m1.v[mi.m42];
              m2.v[mi.m43] = m0.v[mi.m43] / m1.v[mi.m43];
              m2.v[mi.m44] = m0.v[mi.m44] / m1.v[mi.m44];
              return m2;
          };
          Matrix.clone = function (m0) {
              return new Matrix([
                  m0.v[mi.m11], m0.v[mi.m12], m0.v[mi.m13], m0.v[mi.m14],
                  m0.v[mi.m21], m0.v[mi.m22], m0.v[mi.m23], m0.v[mi.m24],
                  m0.v[mi.m31], m0.v[mi.m32], m0.v[mi.m33], m0.v[mi.m34],
                  m0.v[mi.m41], m0.v[mi.m42], m0.v[mi.m43], m0.v[mi.m44]
              ]);
          };
          Matrix.create = function (array) {
              return new Matrix(array);
          };
          return Matrix;
      }());
      exports.Matrix = Matrix;
  });
  define("math/vector2", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var f32 = { max: 2147483647, min: -2147483647 };
      var v2i = { x: 0, y: 1 };
      var qi = { x: 0, y: 1, z: 2, w: 3 };
      var mi = {
          m11: 0, m12: 1, m13: 2, m14: 3,
          m21: 4, m22: 5, m23: 6, m24: 7,
          m31: 8, m32: 9, m33: 10, m34: 11,
          m41: 12, m42: 13, m43: 14, m44: 15
      };
      var Vector2 = (function () {
          function Vector2(x, y) {
              this.v = new Float32Array(2);
              this.v[v2i.x] = x === undefined ? 0.0 : x;
              this.v[v2i.y] = y === undefined ? 0.0 : y;
          }
          Vector2.prototype.toString = function () {
              return "[" + this.v[v2i.x] + ", " + this.v[v2i.y] + "]";
          };
          Vector2.prototype.typeName = function () {
              return "Vector2";
          };
          Vector2.prototype.clone = function () {
              return Vector2.clone(this);
          };
          Vector2.prototype.x = function (value) {
              if (value !== undefined) {
                  this.v[v2i.x] = value;
              }
              return this.v[v2i.x];
          };
          Vector2.prototype.y = function (value) {
              if (value !== undefined) {
                  this.v[v2i.y] = value;
              }
              return this.v[v2i.y];
          };
          Vector2.prototype.length = function () {
              return Vector2.getLength(this);
          };
          Vector2.prototype.lengthSq = function () {
              return Vector2.getLengthSq(this);
          };
          Vector2.prototype.normalize = function () {
              return Vector2.normalize(this);
          };
          Vector2.prototype.dot = function (v0) {
              return Vector2.dot(this, v0);
          };
          Vector2.prototype.add = function (v0) {
              return Vector2.add(this, v0);
          };
          Vector2.prototype.sub = function (v0) {
              return Vector2.sub(this, v0);
          };
          Vector2.prototype.mul = function (v0) {
              return Vector2.mul(this, v0);
          };
          Vector2.prototype.div = function (v0) {
              return Vector2.div(this, v0);
          };
          Vector2.prototype.scale = function (s0) {
              return Vector2.scale(this, s0);
          };
          Vector2.prototype.negate = function () {
              return Vector2.negate(this);
          };
          Vector2.zero = function () {
              return new Vector2(0.0, 0.0);
          };
          Vector2.one = function () {
              return new Vector2(1.0, 1.0);
          };
          Vector2.unitX = function () {
              return new Vector2(1.0, 0.0);
          };
          Vector2.unitY = function () {
              return new Vector2(0.0, 1.0);
          };
          Vector2.left = function () {
              return new Vector2(-1.0, 0.0);
          };
          Vector2.right = function () {
              return new Vector2(1.0, 0.0);
          };
          Vector2.up = function () {
              return new Vector2(0.0, 1.0);
          };
          Vector2.down = function () {
              return new Vector2(0.0, -1.0);
          };
          Vector2.equals = function (v0, v1) {
              return (v0.v[v2i.x] === v1.v[v2i.x] &&
                  v0.v[v2i.y] === v1.v[v2i.y]);
          };
          Vector2.getLength = function (v0) {
              return Math.sqrt((v0.v[v2i.x] * v0.v[v2i.x]) +
                  (v0.v[v2i.y] * v0.v[v2i.y]));
          };
          Vector2.getLengthSq = function (v0) {
              return ((v0.v[v2i.x] * v0.v[v2i.x]) +
                  (v0.v[v2i.y] * v0.v[v2i.y]));
          };
          Vector2.distance = function (v0, v1) {
              var x = v0.v[v2i.x] - v1.v[v2i.x];
              var y = v0.v[v2i.y] - v1.v[v2i.y];
              return Math.sqrt((x * x) + (y * y));
          };
          Vector2.distanceSq = function (v0, v1) {
              var x = v0.v[v2i.x] - v1.v[v2i.x];
              var y = v0.v[v2i.y] - v1.v[v2i.y];
              return ((x * x) + (y * y));
          };
          Vector2.dot = function (v0, v1) {
              return ((v0.v[v2i.x] * v1.v[v2i.x]) +
                  (v0.v[v2i.y] * v1.v[v2i.y]));
          };
          Vector2.normalize = function (v0) {
              var len = 1.0 / Math.sqrt((v0.v[v2i.x] * v0.v[v2i.x]) +
                  (v0.v[v2i.y] * v0.v[v2i.y]));
              return new Vector2(v0.v[v2i.x] * len, v0.v[v2i.y] * len);
          };
          Vector2.reflect = function (v0, n0) {
              var dot = ((v0.v[v2i.x] * n0.v[v2i.x]) +
                  (v0.v[v2i.y] * n0.v[v2i.y]));
              return new Vector2(v0.v[v2i.x] - ((2.0 * dot) * n0.v[v2i.x]), v0.v[v2i.y] - ((2.0 * dot) * n0.v[v2i.y]));
          };
          Vector2.abs = function (v0) {
              return new Vector2(Math.abs(v0.v[v2i.x]), Math.abs(v0.v[v2i.y]));
          };
          Vector2.min = function (v0, v1) {
              return new Vector2((v0.v[v2i.x] < v1.v[v2i.x]) ? v0.v[v2i.x] : v1.v[v2i.x], (v0.v[v2i.y] < v1.v[v2i.y]) ? v0.v[v2i.y] : v1.v[v2i.y]);
          };
          Vector2.max = function (v0, v1) {
              return new Vector2((v0.v[v2i.x] > v1.v[v2i.x]) ? v0.v[v2i.x] : v1.v[v2i.x], (v0.v[v2i.y] > v1.v[v2i.y]) ? v0.v[v2i.y] : v1.v[v2i.y]);
          };
          Vector2.clamp = function (v0, min, max) {
              var x = v0.v[v2i.x];
              var y = v0.v[v2i.y];
              x = (x > max.v[v2i.x]) ? max.v[v2i.x] : x;
              x = (x < min.v[v2i.x]) ? min.v[v2i.x] : x;
              y = (y > max.v[v2i.y]) ? max.v[v2i.y] : y;
              y = (y < min.v[v2i.y]) ? min.v[v2i.y] : y;
              return new Vector2(x, y);
          };
          Vector2.lerp = function (v0, v1, amount) {
              return new Vector2(v0.v[v2i.x] + ((v1.v[v2i.x] - v0.v[v2i.x]) * amount), v0.v[v2i.y] + ((v1.v[v2i.y] - v0.v[v2i.y]) * amount));
          };
          Vector2.barycentric = function (v0, v1, v2, amount0, amount1) {
              return new Vector2((v0.v[v2i.x] + (amount0 * (v1.v[v2i.x] - v0.v[v2i.x]))) + (amount1 * (v2.v[v2i.x] - v0.v[v2i.x])), (v0.v[v2i.y] + (amount0 * (v1.v[v2i.y] - v0.v[v2i.y]))) + (amount1 * (v2.v[v2i.y] - v0.v[v2i.y])));
          };
          Vector2.smoothstep = function (v0, v1, amount) {
              amount = (amount > 1.0) ? 1.0 : ((amount < 0.0) ? 0.0 : amount);
              amount = (amount * amount) * (3.0 - (2.0 * amount));
              return new Vector2(v0.v[v2i.x] + ((v1.v[v2i.x] - v0.v[v2i.x]) * amount), v0.v[v2i.y] + ((v1.v[v2i.y] - v0.v[v2i.y]) * amount));
          };
          Vector2.catmullrom = function (v0, v1, v2, v3, amount) {
              var n0 = amount * amount;
              var n1 = amount * n0;
              return new Vector2(0.5 * ((((2.0 * v1.v[v2i.x])
                  + ((-v0.v[v2i.x] + v2.v[v2i.x]) * amount))
                  + (((((2.0 * v0.v[v2i.x]) - (5.0 * v1.v[v2i.x]))
                      + (4.0 * v2.v[v2i.x])) - v3.v[v2i.x]) * n0))
                  + ((((-v0.v[v2i.x] + (3.0 * v1.v[v2i.x]))
                      - (3.0 * v2.v[v2i.x])) + v3.v[v2i.x]) * n1)), 0.5 * ((((2.0 * v1.v[v2i.y])
                  + ((-v0.v[v2i.y] + v2.v[v2i.y]) * amount))
                  + (((((2.0 * v0.v[v2i.y]) - (5.0 * v1.v[v2i.y]))
                      + (4.0 * v2.v[v2i.y])) - v3.v[v2i.y]) * n0))
                  + ((((-v0.v[v2i.y] + (3.0 * v1.v[v2i.y]))
                      - (3.0 * v2.v[v2i.y])) + v3.v[v2i.y]) * n1)));
          };
          Vector2.hermite = function (v0, t0, v1, t1, amount) {
              var n0 = amount * amount;
              var n1 = amount * n0;
              var n2 = ((2.0 * n1) - (3.0 * n0)) + 1.0;
              var n3 = (-2.0 * n1) + (3.0 * n0);
              var n4 = (n1 - (2.0 * n0)) + amount;
              var n5 = n1 - n0;
              return new Vector2((((v0.v[v2i.x] * n2) + (v1.v[v2i.x] * n3)) + (t0.v[v2i.x] * n4)) + (t1.v[v2i.x] * n5), (((v0.v[v2i.y] * n2) + (v1.v[v2i.y] * n3)) + (t0.v[v2i.y] * n4)) + (t1.v[v2i.y] * n5));
          };
          Vector2.transform = function (v0, m0) {
              return new Vector2(((v0.v[v2i.x] * m0.v[mi.m11]) + (v0.v[v2i.y] * m0.v[mi.m21])) + m0.v[mi.m41], ((v0.v[v2i.x] * m0.v[mi.m12]) + (v0.v[v2i.y] * m0.v[mi.m22])) + m0.v[mi.m42]);
          };
          Vector2.transformNormal = function (n0, m0) {
              return new Vector2((n0.v[v2i.x] * m0.v[mi.m11]) + (n0.v[v2i.y] * m0.v[mi.m21]), (n0.v[v2i.x] * m0.v[mi.m12]) + (n0.v[v2i.y] * m0.v[mi.m22]));
          };
          Vector2.transformQuaternion = function (v0, q0) {
              var n0 = q0.v[qi.x] + q0.v[qi.x];
              var n1 = q0.v[qi.y] + q0.v[qi.y];
              var n2 = q0.v[qi.z] + q0.v[qi.z];
              var n3 = q0.v[qi.w] * n2;
              var n4 = q0.v[qi.x] * n0;
              var n5 = q0.v[qi.x] * n1;
              var n6 = q0.v[qi.y] * n1;
              var n7 = q0.v[qi.z] * n2;
              return new Vector2((v0.v[v2i.x] * ((1.0 - n6) - n7)) + (v0.v[v2i.y] * (n5 - n3)), (v0.v[v2i.x] * (n5 + n3)) + (v0.v[v2i.y] * ((1.0 - n4) - n7)));
          };
          Vector2.add = function (v0, v1) {
              return new Vector2(v0.v[v2i.x] + v1.v[v2i.x], v0.v[v2i.y] + v1.v[v2i.y]);
          };
          Vector2.sub = function (v0, v1) {
              return new Vector2(v0.v[v2i.x] - v1.v[v2i.x], v0.v[v2i.y] - v1.v[v2i.y]);
          };
          Vector2.mul = function (v0, v1) {
              return new Vector2(v0.v[v2i.x] - v1.v[v2i.x], v0.v[v2i.y] - v1.v[v2i.y]);
          };
          Vector2.div = function (v0, v1) {
              return new Vector2(v0.v[v2i.x] / v1.v[v2i.x], v0.v[v2i.y] / v1.v[v2i.y]);
          };
          Vector2.scale = function (v0, scalar) {
              return new Vector2(v0.v[v2i.x] * scalar, v0.v[v2i.y] * scalar);
          };
          Vector2.negate = function (v0) {
              return new Vector2(-v0.v[v2i.x], -v0.v[v2i.y]);
          };
          Vector2.clone = function (v0) {
              return new Vector2(v0.v[v2i.x], v0.v[v2i.y]);
          };
          Vector2.create = function (x, y) {
              return new Vector2(x, y);
          };
          Vector2.MAX_VALUE = new Vector2(f32.max, f32.max);
          Vector2.MIN_VALUE = new Vector2(f32.min, f32.min);
          return Vector2;
      }());
      exports.Vector2 = Vector2;
  });
  define("math/vectorN", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var VectorN = (function () {
          function VectorN(array) {
              this.v = new Float32Array(array.length);
              for (var i = 0; i < array.length; i++) {
                  this.v[i] = array[i];
              }
          }
          VectorN.prototype.toString = function () {
              var buf = new Array();
              buf.push("[");
              for (var i = 0; i < this.v.length; i++) {
                  buf.push(i < (this.v.length - 1) ? this.v[i] + ", " : "" + this.v[i]);
              }
              buf.push(']');
              return buf.join("");
          };
          VectorN.prototype.typeName = function () {
              return "VectorN";
          };
          VectorN.prototype.clone = function () {
              return VectorN.clone(this);
          };
          VectorN.prototype.length = function () {
              return VectorN.getLength(this);
          };
          VectorN.prototype.lengthSq = function () {
              return VectorN.getLengthSq(this);
          };
          VectorN.prototype.normalize = function () {
              return VectorN.normalize(this);
          };
          VectorN.prototype.dot = function (v0) {
              return VectorN.dot(this, v0);
          };
          VectorN.prototype.add = function (v0) {
              return VectorN.add(this, v0);
          };
          VectorN.prototype.sub = function (v0) {
              return VectorN.sub(this, v0);
          };
          VectorN.prototype.mul = function (v0) {
              return VectorN.mul(this, v0);
          };
          VectorN.prototype.div = function (v0) {
              return VectorN.div(this, v0);
          };
          VectorN.prototype.scale = function (s0) {
              return VectorN.scale(this, s0);
          };
          VectorN.prototype.negate = function () {
              return VectorN.negate(this);
          };
          VectorN.add = function (v0, v1) {
              if (v0.v.length !== v1.v.length)
                  throw Error("dimension mismatch.");
              var result = new Float32Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = v0.v[i] + v1.v[i];
              }
              return new VectorN(result);
          };
          VectorN.sub = function (v0, v1) {
              if (v0.v.length !== v1.v.length)
                  throw Error("dimension mismatch.");
              var result = new Float32Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = v0.v[i] - v1.v[i];
              }
              return new VectorN(result);
          };
          VectorN.mul = function (v0, v1) {
              if (v0.v.length !== v1.v.length)
                  throw Error("dimension mismatch.");
              var result = new Float32Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = v0.v[i] * v1.v[i];
              }
              return new VectorN(result);
          };
          VectorN.div = function (v0, v1) {
              if (v0.v.length !== v1.v.length)
                  throw Error("dimension mismatch.");
              var result = new Float32Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = v0.v[i] / v1.v[i];
              }
              return new VectorN(result);
          };
          VectorN.scale = function (v0, scalar) {
              var result = new Float32Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = v0.v[i] * scalar;
              }
              return new VectorN(result);
          };
          VectorN.distance = function (left, right) {
              if (left.v.length !== right.v.length)
                  throw Error("dimension mismatch.");
              var _a = [0, 1], acc = _a[0], mul = _a[1];
              for (var i = 0; i < left.v.length; i++) {
                  var offset = right.v[i] - left.v[i];
                  acc += (offset * offset);
              }
              return Math.sqrt(acc);
          };
          VectorN.equals = function (left, right) {
              if (left.v.length !== right.v.length)
                  throw Error("dimension mismatch.");
              for (var i = 0; i < left.v.length; i++)
                  if (left.v[i] !== right.v[i])
                      return false;
              return true;
          };
          VectorN.clamp = function (v0, min, max) {
              var result = new Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = v0.v[i];
                  result[i] = (result[i] > max.v[i]) ? max.v[i] : result[i];
                  result[i] = (result[i] < min.v[i]) ? min.v[i] : result[i];
              }
              return new VectorN(result);
          };
          VectorN.lerp = function (v0, v1, amount) {
              if (v0.v.length !== v1.v.length)
                  throw Error("dimension mismatch.");
              var result = new Float32Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = v0.v[i] + ((v1.v[i] - v0.v[i]) * amount);
              }
              return new VectorN(result);
          };
          VectorN.getLength = function (v0) {
              var num = 0;
              for (var i = 0; i < v0.v.length; i++) {
                  num += (v0.v[i] * v0.v[i]);
              }
              return Math.sqrt(num);
          };
          VectorN.getLengthSq = function (v0) {
              var num = 0;
              for (var i = 0; i < v0.v.length; i++) {
                  num += (v0.v[i] * v0.v[i]);
              }
              return num;
          };
          VectorN.reflect = function (v0, n0) {
              if (v0.v.length !== n0.v.length)
                  throw Error("dimension mismatch.");
              var result = new Float32Array(v0.v.length);
              var n1 = 0;
              for (var i = 0; i < v0.v.length; i++)
                  n1 += (v0.v[i] * n0.v[i]);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = (v0.v[i] - ((2.0 * n1) * n0.v[i]));
              }
              return new VectorN(result);
          };
          VectorN.abs = function (v0) {
              var result = new Float32Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = Math.abs(v0.v[i]);
              }
              return new VectorN(result);
          };
          VectorN.min = function (v0, v1) {
              if (v0.v.length !== v1.v.length)
                  throw Error("dimension mismatch.");
              var result = new Float32Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = v0.v[i] < v1.v[i] ? v0.v[i] : v1.v[i];
              }
              return new VectorN(result);
          };
          VectorN.max = function (v0, v1) {
              if (v0.v.length !== v1.v.length)
                  throw Error("dimension mismatch.");
              var result = new Float32Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = v0.v[i] > v1.v[i] ? v0.v[i] : v1.v[i];
              }
              return new VectorN(result);
          };
          VectorN.negate = function (v0) {
              var result = new Float32Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = -v0.v[i];
              }
              return new VectorN(result);
          };
          VectorN.dot = function (v0, n0) {
              if (v0.v.length !== n0.v.length)
                  throw Error("dimension mismatch.");
              var num = 0;
              for (var i = 0; i < v0.v.length; i++) {
                  num += (v0.v[i] * n0.v[i]);
              }
              return num;
          };
          VectorN.normalize = function (v0) {
              var result = new Float32Array(v0.v.length);
              var n0 = 0;
              for (var i = 0; i < v0.v.length; i++)
                  n0 += (v0.v[i] * v0.v[i]);
              var n1 = 1.0 / Math.sqrt(n0);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = v0.v[i] * n1;
              }
              return new VectorN(result);
          };
          VectorN.clone = function (v0) {
              var result = new Float32Array(v0.v.length);
              for (var i = 0; i < v0.v.length; i++) {
                  result[i] = v0.v[i];
              }
              return new VectorN(result);
          };
          VectorN.create = function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              return new VectorN(args);
          };
          return VectorN;
      }());
      exports.VectorN = VectorN;
  });
  define("math/index", ["require", "exports", "math/radian", "math/matrix", "math/plane", "math/quaternion", "math/single", "math/vector2", "math/vector3", "math/vector4", "math/vectorN", "math/ray", "math/triangle", "math/box", "math/sphere", "math/frustum"], function (require, exports, radian_1, matrix_3, plane_4, quaternion_1, single_2, vector2_1, vector3_8, vector4_1, vectorN_1, ray_3, triangle_1, box_1, sphere_1, frustum_1) {
      "use strict";
      exports.__esModule = true;
      exports.Radian = radian_1.Radian;
      exports.Matrix = matrix_3.Matrix;
      exports.Plane = plane_4.Plane;
      exports.Quaternion = quaternion_1.Quaternion;
      exports.Single = single_2.Single;
      exports.Vector2 = vector2_1.Vector2;
      exports.Vector3 = vector3_8.Vector3;
      exports.Vector4 = vector4_1.Vector4;
      exports.VectorN = vectorN_1.VectorN;
      exports.Ray = ray_3.Ray;
      exports.Triangle = triangle_1.Triangle;
      exports.Box = box_1.Box;
      exports.Sphere = sphere_1.Sphere;
      exports.Frustum = frustum_1.Frustum;
  });
  define("graphics/device", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var Device = (function () {
          function Device(canvas) {
              this.canvas = canvas;
              this.context = this.canvas.getContext("2d");
              this.linecount = 0;
              this.linebuf = new Array(300000);
              for (var i = 0; i < this.linebuf.length; i++) {
                  this.linebuf[i] = {
                      from: [0, 0],
                      to: [0, 0],
                      color: "black",
                      width: 1
                  };
              }
          }
          Device.prototype.width = function () {
              return this.canvas.width;
          };
          Device.prototype.height = function () {
              return this.canvas.height;
          };
          Device.prototype.clear = function (color) {
              if (color === void 0) { color = "#FFFFFF"; }
              this.context.fillStyle = color;
              this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
          };
          Device.prototype.line = function (from, to, color, width) {
              if (color === void 0) { color = "#000000"; }
              if (width === void 0) { width = 1.0; }
              if (this.linecount === this.linebuf.length)
                  return;
              this.linebuf[this.linecount] = {
                  from: [from.v[0], from.v[1]],
                  to: [to.v[0], to.v[1]],
                  color: color,
                  width: width
              };
              this.linecount += 1;
          };
          Device.prototype.present = function () {
              this.context.beginPath();
              for (var i = 0; i < this.linecount; i++) {
                  var from = this.linebuf[i].from;
                  var to = this.linebuf[i].to;
                  this.context.moveTo(from[0], from[1]);
                  this.context.lineTo(to[0], to[1]);
              }
              this.context.strokeStyle = "#000";
              this.context.stroke();
              this.linecount = 0;
          };
          Device.prototype.discard = function () {
              this.linecount = 0;
          };
          return Device;
      }());
      exports.Device = Device;
  });
  define("graphics/camera", ["require", "exports", "math/index"], function (require, exports, index_1) {
      "use strict";
      exports.__esModule = true;
      var Camera = (function () {
          function Camera() {
              this.projection = index_1.Matrix.perspectiveFov(90, 1, 0.1, 1000);
              this.view = index_1.Matrix.lookAt(new index_1.Vector3(0, 0, -10), new index_1.Vector3(0, 0, 0), new index_1.Vector3(0, 1, 0));
          }
          return Camera;
      }());
      exports.Camera = Camera;
  });
  define("graphics/geom", ["require", "exports", "math/index"], function (require, exports, index_2) {
      "use strict";
      exports.__esModule = true;
      var CubeGeometry = (function () {
          function CubeGeometry(scale) {
              this.positions = [
                  new index_2.Vector4(-scale, -scale, scale, 1.0),
                  new index_2.Vector4(scale, -scale, scale, 1.0),
                  new index_2.Vector4(scale, scale, scale, 1.0),
                  new index_2.Vector4(-scale, scale, scale, 1.0),
                  new index_2.Vector4(-scale, -scale, -scale, 1.0),
                  new index_2.Vector4(-scale, scale, -scale, 1.0),
                  new index_2.Vector4(scale, scale, -scale, 1.0),
                  new index_2.Vector4(scale, -scale, -scale, 1.0),
                  new index_2.Vector4(-scale, scale, -scale, 1.0),
                  new index_2.Vector4(-scale, scale, scale, 1.0),
                  new index_2.Vector4(scale, scale, scale, 1.0),
                  new index_2.Vector4(scale, scale, -scale, 1.0),
                  new index_2.Vector4(-scale, -scale, -scale, 1.0),
                  new index_2.Vector4(scale, -scale, -scale, 1.0),
                  new index_2.Vector4(scale, -scale, scale, 1.0),
                  new index_2.Vector4(-scale, -scale, scale, 1.0),
                  new index_2.Vector4(scale, -scale, -scale, 1.0),
                  new index_2.Vector4(scale, scale, -scale, 1.0),
                  new index_2.Vector4(scale, scale, scale, 1.0),
                  new index_2.Vector4(scale, -scale, scale, 1.0),
                  new index_2.Vector4(-scale, -scale, -scale, 1.0),
                  new index_2.Vector4(-scale, -scale, scale, 1.0),
                  new index_2.Vector4(-scale, scale, scale, 1.0),
                  new index_2.Vector4(-scale, scale, -scale, 1.0)
              ];
              this.indices = [
                  0, 1, 2, 0, 2, 3,
                  4, 5, 6, 4, 6, 7,
                  8, 9, 10, 8, 10, 11,
                  12, 13, 14, 12, 14, 15,
                  16, 17, 18, 16, 18, 19,
                  20, 21, 22, 20, 22, 23
              ];
          }
          return CubeGeometry;
      }());
      exports.CubeGeometry = CubeGeometry;
  });
  define("graphics/mesh", ["require", "exports", "math/matrix"], function (require, exports, matrix_4) {
      "use strict";
      exports.__esModule = true;
      var Mesh = (function () {
          function Mesh(geometry) {
              this.geometry = geometry;
              this.model = matrix_4.Matrix.identity();
          }
          return Mesh;
      }());
      exports.Mesh = Mesh;
  });
  define("graphics/renderer", ["require", "exports", "math/index", "graphics/device"], function (require, exports, index_3, device_1) {
      "use strict";
      exports.__esModule = true;
      var visible = function (v0, v1, v2) {
          return (((v1.v[0] - v0.v[0]) *
              (v2.v[1] - v0.v[1])) -
              ((v1.v[1] - v0.v[1]) *
                  (v2.v[0] - v0.v[0])) >= 0) ? true : false;
      };
      var vertexshader = function (model, view, projection, vector) {
          var vp = index_3.Matrix.mul(view, projection);
          var vm = index_3.Vector4.transform(vector, model);
          var position = index_3.Vector4.transform(vm, vp);
          return position;
      };
      var clipspace = function (width, height, vector) {
          return new index_3.Vector2(((vector.v[0] / vector.v[3]) * width) + (width / 2), ((vector.v[1] / vector.v[3]) * height) + (height / 2));
      };
      var render = function (device, camera, mesh) {
          for (var i = 0; i < mesh.geometry.indices.length; i += 3) {
              var v0 = mesh.geometry.positions[mesh.geometry.indices[i + 0]];
              var v1 = mesh.geometry.positions[mesh.geometry.indices[i + 1]];
              var v2 = mesh.geometry.positions[mesh.geometry.indices[i + 2]];
              var vs0 = vertexshader(mesh.model, camera.view, camera.projection, v0);
              var vs1 = vertexshader(mesh.model, camera.view, camera.projection, v1);
              var vs2 = vertexshader(mesh.model, camera.view, camera.projection, v2);
              var cs0 = clipspace(device.width(), device.height(), vs0);
              var cs1 = clipspace(device.width(), device.height(), vs1);
              var cs2 = clipspace(device.width(), device.height(), vs2);
              device.line(cs0, cs1);
              device.line(cs1, cs2);
              device.line(cs2, cs0);
          }
      };
      var Renderer = (function () {
          function Renderer(canvas) {
              this.canvas = canvas;
              this.device = new device_1.Device(canvas);
              this.vertexshaderfunc = vertexshader;
              this.clipspacefunc = clipspace;
          }
          Renderer.prototype.vertexshader = function (func) {
              this.vertexshaderfunc = func;
          };
          Renderer.prototype.clipspace = function (func) {
              this.clipspacefunc = func;
          };
          Renderer.prototype.clear = function (color) {
              this.device.clear(color);
          };
          Renderer.prototype.render = function (camera, mesh) {
              for (var i = 0; i < mesh.geometry.indices.length; i += 3) {
                  var v0 = mesh.geometry.positions[mesh.geometry.indices[i + 0]];
                  var v1 = mesh.geometry.positions[mesh.geometry.indices[i + 1]];
                  var v2 = mesh.geometry.positions[mesh.geometry.indices[i + 2]];
                  var vs0 = vertexshader(mesh.model, camera.view, camera.projection, v0);
                  var vs1 = vertexshader(mesh.model, camera.view, camera.projection, v1);
                  var vs2 = vertexshader(mesh.model, camera.view, camera.projection, v2);
                  var cs0 = this.clipspacefunc(this.device.width(), this.device.height(), vs0);
                  var cs1 = this.clipspacefunc(this.device.width(), this.device.height(), vs1);
                  var cs2 = this.clipspacefunc(this.device.width(), this.device.height(), vs2);
                  if (visible(cs0, cs1, cs2)) {
                      this.device.line(cs0, cs1);
                      this.device.line(cs1, cs2);
                      this.device.line(cs2, cs0);
                  }
              }
          };
          Renderer.prototype.present = function () {
              this.device.present();
          };
          Renderer.prototype.discard = function () {
              this.device.discard();
          };
          return Renderer;
      }());
      exports.Renderer = Renderer;
  });
  define("graphics/index", ["require", "exports", "graphics/device", "graphics/camera", "graphics/geom", "graphics/mesh", "graphics/renderer"], function (require, exports, device_2, camera_1, geom_1, mesh_1, renderer_1) {
      "use strict";
      exports.__esModule = true;
      exports.Device = device_2.Device;
      exports.Camera = camera_1.Camera;
      exports.CubeGeometry = geom_1.CubeGeometry;
      exports.Mesh = mesh_1.Mesh;
      exports.Renderer = renderer_1.Renderer;
  });
  define("network/matrix", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var Matrix = (function () {
          function Matrix(inputs, outputs) {
              this.inputs = inputs;
              this.outputs = outputs;
              this.data = new Float64Array(this.inputs * this.outputs);
          }
          Matrix.prototype.get = function (i, o) {
              return this.data[i + (o * this.inputs)];
          };
          Matrix.prototype.set = function (i, o, value) {
              this.data[i + (o * this.inputs)] = value;
          };
          return Matrix;
      }());
      exports.Matrix = Matrix;
  });
  define("network/tensor", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var select = function (type) {
          switch (type) {
              case "identity": return {
                  activate: function (x) { return x; },
                  derive: function (x) { return 1; }
              };
              case "tanh": return {
                  activate: function (x) { return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x)); },
                  derive: function (x) { return (1 - (x * x)); }
              };
              case "binary-step": return {
                  activate: function (x) { return (x >= 0) ? 1 : 0; },
                  derive: function (x) { return (x >= 0) ? 1 : 0; }
              };
              case "relu": return {
                  activate: function (x) { return (x >= 0) ? x : 0; },
                  derive: function (x) { return (x >= 0) ? 1 : 0; }
              };
              default: throw Error("unknown activation");
          }
      };
      var Tensor = (function () {
          function Tensor(units, activation, bias) {
              if (activation === void 0) { activation = "identity"; }
              if (bias === void 0) { bias = 1.0; }
              this.data = new Float64Array(units + 1);
              this.data[this.data.length - 1] = bias;
              this.activation = select(activation);
          }
          return Tensor;
      }());
      exports.Tensor = Tensor;
  });
  define("network/network", ["require", "exports", "network/matrix"], function (require, exports, matrix_5) {
      "use strict";
      exports.__esModule = true;
      var Network = (function () {
          function Network(tensors) {
              this.tensors = tensors;
              this.output = new Array(this.tensors[this.tensors.length - 1].data.length - 1);
              this.matrices = new Array(this.tensors.length - 1);
              for (var i = 0; i < this.tensors.length - 1; i++) {
                  this.matrices[i] = new matrix_5.Matrix(this.tensors[i + 0].data.length, this.tensors[i + 1].data.length - 1);
              }
              this.kernels = new Array(this.matrices.length);
              for (var i = 0; i < this.kernels.length; i++) {
                  this.kernels[i] = {
                      input: this.tensors[i + 0],
                      output: this.tensors[i + 1],
                      matrix: this.matrices[i]
                  };
              }
          }
          Network.prototype.memory = function () {
              var tensors = this.tensors.reduce(function (acc, t) { return acc + (t.data.byteLength); }, 0);
              var matrices = this.matrices.reduce(function (acc, m) { return acc + (m.data.byteLength); }, 0);
              return tensors + matrices;
          };
          Network.prototype.inputs = function () {
              return (this.tensors[0].data.length - 1);
          };
          Network.prototype.outputs = function () {
              return (this.tensors[this.tensors.length - 1].data.length - 1);
          };
          Network.prototype.forward = function (input) {
              for (var i = 0; i < input.length; i++) {
                  this.kernels[0].input.data[i] = input[i];
              }
              for (var k = 0; k < this.kernels.length; k++) {
                  var kernel = this.kernels[k];
                  for (var o = 0; o < kernel.matrix.outputs; o++) {
                      var sum = 0;
                      for (var i = 0; i < kernel.matrix.inputs; i++) {
                          sum += kernel.matrix.get(i, o) * kernel.input.data[i];
                      }
                      kernel.output.data[o] = kernel.output.activation.activate(sum);
                  }
              }
              for (var o = 0; o < this.output.length; o++) {
                  this.output[o] = this.kernels[this.kernels.length - 1].output.data[o];
              }
              return this.output;
          };
          return Network;
      }());
      exports.Network = Network;
  });
  define("network/random", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var Random = (function () {
          function Random(seed) {
              this.seed = seed;
              this.seed = this.seed === undefined ? 1 : this.seed;
              this.a = 1103515245;
              this.c = 12345;
              this.m = Math.pow(2, 31);
          }
          Random.prototype.next = function () {
              this.seed = (this.a * this.seed + this.c) % this.m;
              return this.seed / this.m;
          };
          return Random;
      }());
      exports.Random = Random;
  });
  define("network/trainer", ["require", "exports", "network/matrix", "network/random"], function (require, exports, matrix_6, random_1) {
      "use strict";
      exports.__esModule = true;
      var Trainer = (function () {
          function Trainer(network, options) {
              this.network = network;
              this.options = options;
              this.options = this.options || {};
              this.options.seed = this.options.seed || 0;
              this.options.step = this.options.step || 0.15;
              this.options.momentum = this.options.momentum || 0.5;
              this.random = new random_1.Random(this.options.seed);
              this.deltas = new Array(this.network.matrices.length);
              for (var i = 0; i < this.network.matrices.length; i++) {
                  this.deltas[i] = new matrix_6.Matrix(this.network.matrices[i].inputs, this.network.matrices[i].outputs);
              }
              this.gradients = new Array(this.network.tensors.length);
              for (var i = 0; i < this.network.tensors.length; i++) {
                  this.gradients[i] = new Float64Array(this.network.tensors[i].data.length);
              }
              for (var m = 0; m < this.network.matrices.length; m++) {
                  for (var o = 0; o < this.network.matrices[m].outputs; o++) {
                      for (var i = 0; i < this.network.matrices[m].inputs; i++) {
                          var rand = (this.random.next() - 0.5) * (1 / Math.sqrt(this.network.matrices[m].inputs));
                          this.network.matrices[m].set(i, o, rand);
                      }
                  }
              }
              this.kernels = new Array(this.network.kernels.length);
              for (var i = 0; i < this.network.kernels.length; i++) {
                  this.kernels[i] = {
                      matrix: {
                          matrix: this.network.matrices[i],
                          deltas: this.deltas[i]
                      },
                      input: {
                          tensor: this.network.tensors[i + 0],
                          grads: this.gradients[i + 0]
                      },
                      output: {
                          tensor: this.network.tensors[i + 1],
                          grads: this.gradients[i + 1]
                      }
                  };
              }
          }
          Trainer.prototype.forward = function (input) {
              return this.network.forward(input);
          };
          Trainer.prototype.error = function (input, expect) {
              var actual = this.network.forward(input);
              return Math.sqrt(actual.reduce(function (acc, value, index) {
                  var delta = (expect[index] - value);
                  return (acc + (delta * delta));
              }, 0) / actual.length);
          };
          Trainer.prototype.backward = function (input, expect) {
              var actual = this.network.forward(input);
              var kernel = this.kernels[this.kernels.length - 1];
              for (var o = 0; o < kernel.matrix.matrix.outputs; o++) {
                  var delta = (expect[o] - kernel.output.tensor.data[o]);
                  kernel.output.grads[o] = (delta * kernel.output.tensor.activation.derive(kernel.output.tensor.data[o]));
              }
              for (var k = this.kernels.length - 1; k > -1; k--) {
                  var kernel_1 = this.kernels[k];
                  for (var i = 0; i < kernel_1.matrix.matrix.inputs; i++) {
                      var delta = 0;
                      for (var o = 0; o < kernel_1.matrix.matrix.outputs; o++) {
                          delta += kernel_1.matrix.matrix.get(i, o) * kernel_1.output.grads[o];
                      }
                      kernel_1.input.grads[i] = (delta * kernel_1.input.tensor.activation.derive(kernel_1.input.tensor.data[i]));
                  }
              }
              for (var k = this.kernels.length - 1; k > -1; k--) {
                  var kernel_2 = this.kernels[k];
                  for (var i = 0; i < kernel_2.matrix.matrix.inputs; i++) {
                      for (var o = 0; o < kernel_2.matrix.matrix.outputs; o++) {
                          var old_delta = kernel_2.matrix.deltas.get(i, o);
                          var new_delta = (this.options.step * kernel_2.input.tensor.data[i] * kernel_2.output.grads[o]) + (this.options.momentum * old_delta);
                          var new_weight = kernel_2.matrix.matrix.get(i, o) + new_delta;
                          kernel_2.matrix.matrix.set(i, o, new_weight);
                          kernel_2.matrix.deltas.set(i, o, new_delta);
                      }
                  }
              }
              return Math.sqrt(actual.reduce(function (acc, value, index) {
                  var delta = (expect[index] - value);
                  return (acc + (delta * delta));
              }, 0) / actual.length);
          };
          return Trainer;
      }());
      exports.Trainer = Trainer;
  });
  define("network/index", ["require", "exports", "network/network", "network/tensor", "network/trainer"], function (require, exports, network_1, tensor_1, trainer_1) {
      "use strict";
      exports.__esModule = true;
      exports.Network = network_1.Network;
      exports.Tensor = tensor_1.Tensor;
      exports.Trainer = trainer_1.Trainer;
  });
  define("loader/index", ["require", "exports", "math/vector4"], function (require, exports, vector4_2) {
      "use strict";
      exports.__esModule = true;
      exports.loadObj = function (filename) { return fetch(filename).then(function (response) { return response.text(); }).then(function (text) {
          var lines = text.split("\n").map(function (line) {
              return line.split(" ").filter(function (n) { return n.length > 0; });
          });
          var vertexCount = 0;
          var faceCount = 0;
          var faceMode = "tri";
          var firstFace = true;
          for (var i = 0; i < lines.length; i++) {
              var line = lines[i];
              switch (line[0]) {
                  case "v":
                      vertexCount += 1;
                      break;
                  case "f": {
                      if (firstFace) {
                          firstFace = false;
                          if (line.length === 4) {
                              faceMode = "tri";
                          }
                          else if (line.length === 5) {
                              faceMode = "quad";
                          }
                      }
                      faceCount += 1;
                      break;
                  }
              }
          }
          var indexCount = (faceMode === "quad")
              ? faceCount * 6
              : faceCount * 3;
          var positions = new Array(vertexCount);
          var indices = new Array(indexCount);
          var positionIndex = 0;
          var indicesIndex = 0;
          for (var i = 0; i < lines.length; i++) {
              var line = lines[i];
              switch (line[0]) {
                  case "v":
                      positions[positionIndex] = new vector4_2.Vector4(parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3]), 1.0);
                      positionIndex += 1;
                      break;
                  case "f":
                      {
                          if (faceMode === "tri") {
                              var a = parseInt(line[1].split("/")[0]) - 1;
                              var b = parseInt(line[2].split("/")[0]) - 1;
                              var c = parseInt(line[3].split("/")[0]) - 1;
                              indices[indicesIndex + 0] = a;
                              indices[indicesIndex + 1] = b;
                              indices[indicesIndex + 2] = c;
                              indicesIndex += 3;
                          }
                          else if (faceMode === "quad") {
                              var a = parseInt(line[1].split("/")[0]) - 1;
                              var b = parseInt(line[2].split("/")[0]) - 1;
                              var c = parseInt(line[3].split("/")[0]) - 1;
                              var d = parseInt(line[4].split("/")[0]) - 1;
                              indices[indicesIndex + 0] = a;
                              indices[indicesIndex + 1] = b;
                              indices[indicesIndex + 2] = c;
                              indices[indicesIndex + 3] = c;
                              indices[indicesIndex + 4] = d;
                              indices[indicesIndex + 5] = a;
                              indicesIndex += 6;
                          }
                      }
                      break;
              }
          }
          return {
              positions: positions,
              indices: indices
          };
      }); };
  });
  define("index", ["require", "exports", "math/index", "graphics/index", "network/index", "loader/index"], function (require, exports, index_4, index_5, index_6, index_7) {
      "use strict";
      var _this = this;
      exports.__esModule = true;
      var training = false;
      var meshmode = "cube";
      var toggle = document.getElementById("toggle");
      var cube = document.getElementById("cube");
      var bunny = document.getElementById("bunny");
      cube.onclick = function () { meshmode = "cube"; };
      bunny.onclick = function () { meshmode = "bunny"; };
      toggle.onclick = function () {
          training = !training;
          toggle.value = training
              ? "training projection network"
              : "projecting with network";
      };
      var network = new index_6.Trainer(new index_6.Network([
          new index_6.Tensor(4, "tanh"),
          new index_6.Tensor(4, "tanh"),
          new index_6.Tensor(4, "tanh"),
          new index_6.Tensor(2, "tanh")
      ]), {
          momentum: 0.01,
          step: 0.0015
      });
      var renderer = new index_5.Renderer(document.getElementById("canvas"));
      var training_function = function (width, height, vector) {
          var input = [
              (vector.v[0]),
              (vector.v[1]),
              (vector.v[2]),
              (vector.v[3])
          ];
          network.backward(input, [
              (vector.v[0] / vector.v[3]),
              (vector.v[1] / vector.v[3])
          ]);
          return new index_4.Vector2(0, 0);
      };
      var approximation_function = function (width, height, vector) {
          var input = [
              (vector.v[0]),
              (vector.v[1]),
              (vector.v[2]),
              (vector.v[3])
          ];
          var actual = network.forward(input);
          return new index_4.Vector2((actual[0] * width) + (width / 2), (actual[1] * height) + (height / 2));
      };
      var start = function () { return __awaiter(_this, void 0, void 0, function () {
          var bunny, _a, cube, _b, camera;
          return __generator(this, function (_c) {
              switch (_c.label) {
                  case 0:
                      _a = index_5.Mesh.bind;
                      return [4, index_7.loadObj("./assets/bunny.obj")];
                  case 1:
                      bunny = new (_a.apply(index_5.Mesh, [void 0, _c.sent()]))();
                      _b = index_5.Mesh.bind;
                      return [4, index_7.loadObj("./assets/cube.obj")];
                  case 2:
                      cube = new (_b.apply(index_5.Mesh, [void 0, _c.sent()]))();
                      bunny.model = bunny.model.rotateZ(180 * (Math.PI / 180));
                      cube.model = cube.model.rotateZ(180 * (Math.PI / 180));
                      camera = new index_5.Camera();
                      camera.view = index_4.Matrix.lookAt(new index_4.Vector3(0, 0, -2.5), new index_4.Vector3(0, 0, 0), new index_4.Vector3(0, 1, 0));
                      setInterval(function () {
                          var mesh = meshmode === "cube" ? cube : bunny;
                          mesh.model = mesh.model
                              .rotateX(0.01)
                              .rotateY(0.01)
                              .rotateZ(0.01);
                          if (training) {
                              renderer.clipspace(training_function);
                              renderer.render(camera, mesh);
                              renderer.discard();
                          }
                          renderer.clipspace(approximation_function);
                          renderer.clear("#FFF");
                          renderer.render(camera, mesh);
                          renderer.present();
                      }, 1);
                      return [2];
              }
          });
      }); };
      start()["catch"](console.log);
  });
  
  return collect(); 
})();