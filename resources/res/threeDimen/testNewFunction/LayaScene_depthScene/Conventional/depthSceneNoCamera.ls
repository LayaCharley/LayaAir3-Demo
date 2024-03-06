{
  "_$ver": 1,
  "_$id": "qneakgqa",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "g0b89o1m",
      "_$type": "Scene3D",
      "name": "Scene3D",
      "skyRenderer": {
        "meshType": "dome"
      },
      "ambientMode": 1,
      "ambientColor": {
        "_$type": "Color",
        "r": 0.212,
        "g": 0.227,
        "b": 0.259,
        "a": null
      },
      "_reflectionsIblSamples": 128,
      "fogStart": 0,
      "fogRange": 300,
      "fogColor": {
        "_$type": "Color",
        "r": 0.5,
        "g": 0.5,
        "b": 0.5,
        "a": null
      },
      "lightmaps": [],
      "_$child": [
        {
          "_$id": "hl6f1vq4",
          "_$type": "Sprite3D",
          "name": "Plane",
          "layer": 0,
          "transform": {
            "localRotation": {
              "_$type": "Quaternion",
              "w": -1
            },
            "localScale": {
              "_$type": "Vector3",
              "x": 4.6466,
              "y": 4.6466,
              "z": 4.6466
            }
          },
          "_$comp": [
            {
              "_$type": "MeshFilter",
              "sharedMesh": {
                "_$uuid": "Library/unity default resources-Plane.lm",
                "_$type": "Mesh"
              }
            },
            {
              "_$type": "MeshRenderer",
              "_scaleInLightmap": 1,
              "sharedMaterials": [
                {
                  "_$uuid": "Assets/depthshader/yellow.lmat",
                  "_$type": "Material"
                }
              ]
            }
          ]
        },
        {
          "_$id": "bf9uhhk9",
          "_$type": "Sprite3D",
          "name": "Plane (1)",
          "layer": 0,
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "y": 5,
              "z": 5
            },
            "localRotation": {
              "_$type": "Quaternion",
              "x": 0.7071067811865476,
              "w": -0.7071067811865476
            },
            "localScale": {
              "_$type": "Vector3",
              "x": 5.1721,
              "y": 5.1721,
              "z": 5.1721
            }
          },
          "_$comp": [
            {
              "_$type": "MeshFilter",
              "sharedMesh": {
                "_$uuid": "Library/unity default resources-Plane.lm",
                "_$type": "Mesh"
              }
            },
            {
              "_$type": "MeshRenderer",
              "_scaleInLightmap": 1,
              "sharedMaterials": [
                {
                  "_$uuid": "Assets/depthshader/red.lmat",
                  "_$type": "Material"
                }
              ]
            }
          ]
        },
        {
          "_$id": "fdv0wgak",
          "_$type": "Sprite3D",
          "name": "Plane (2)",
          "layer": 0,
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": -5,
              "y": 5
            },
            "localRotation": {
              "_$type": "Quaternion",
              "x": 0.5,
              "y": 0.5,
              "z": 0.5,
              "w": -0.5
            },
            "localScale": {
              "_$type": "Vector3",
              "x": 5.4077,
              "y": 5.4077,
              "z": 5.4077
            }
          },
          "_$comp": [
            {
              "_$type": "MeshFilter",
              "sharedMesh": {
                "_$uuid": "Library/unity default resources-Plane.lm",
                "_$type": "Mesh"
              }
            },
            {
              "_$type": "MeshRenderer",
              "_scaleInLightmap": 1,
              "sharedMaterials": [
                {
                  "_$uuid": "Assets/depthshader/blue.lmat",
                  "_$type": "Material"
                }
              ]
            }
          ]
        },
        {
          "_$id": "hx63qw8m",
          "_$type": "Sprite3D",
          "name": "Sphere (2)",
          "layer": 0,
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": 1.14,
              "y": 0.9,
              "z": -1.69
            },
            "localRotation": {
              "_$type": "Quaternion",
              "w": -1
            },
            "localScale": {
              "_$type": "Vector3",
              "x": 1.5,
              "y": 1.5,
              "z": 1.5
            }
          },
          "_$comp": [
            {
              "_$type": "MeshFilter",
              "sharedMesh": {
                "_$uuid": "Library/unity default resources-Sphere.lm",
                "_$type": "Mesh"
              }
            },
            {
              "_$type": "MeshRenderer",
              "_scaleInLightmap": 1,
              "sharedMaterials": [
                {
                  "_$uuid": "Assets/depthshader/blue.lmat",
                  "_$type": "Material"
                }
              ]
            },
            {
              "_$type": "Rigidbody3D",
              "colliderShape": {
                "_$type": "CompoundColliderShape",
                "localOffset": {
                  "_$type": "Vector3"
                },
                "shapes": []
              },
              "gravity": {
                "_$type": "Vector3",
                "y": -10
              },
              "linearFactor": {
                "_$type": "Vector3",
                "x": 1,
                "y": 1,
                "z": 1
              },
              "linearVelocity": {
                "_$type": "Vector3"
              },
              "angularFactor": {
                "_$type": "Vector3",
                "x": 1,
                "y": 1,
                "z": 1
              },
              "angularVelocity": {
                "_$type": "Vector3"
              }
            },
            {
              "_$type": "Animator",
              "cullingMode": 0,
              "controllerLayers": [
                {
                  "_$type": "AnimatorControllerLayer",
                  "name": "Base Layer",
                  "states": [
                    {
                      "_$type": "AnimatorState",
                      "name": "sphereColor",
                      "clipStart": 0,
                      "clip": {
                        "_$uuid": "Assets/depthshader/sphereColor-sphereColor.lani",
                        "_$type": "AnimationClip"
                      },
                      "soloTransitions": []
                    }
                  ],
                  "defaultStateName": "sphereColor"
                }
              ]
            }
          ]
        },
        {
          "_$id": "jq7cfvys",
          "_$type": "SpotLight",
          "name": "Spot Light",
          "layer": 0,
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": -0.13,
              "y": 7.86,
              "z": 0.23
            },
            "localRotation": {
              "_$type": "Quaternion",
              "y": 0.7071067811865476,
              "z": 0.7071067811865476,
              "w": 0
            }
          },
          "_$comp": [
            {
              "_$type": "SpotLightCom",
              "intensity": 1,
              "lightmapBakedType": 0,
              "shadowMode": 0,
              "shadowStrength": 1,
              "shadowDistance": 50,
              "shadowDepthBias": 1,
              "shadowNormalBias": 1,
              "shadowNearPlane": 0.1,
              "range": 10,
              "spotAngle": 53.2
            }
          ]
        },
        {
          "_$id": "finxws14",
          "_$type": "Sprite3D",
          "name": "Cube",
          "layer": 0,
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": 1.08,
              "y": 1.142519,
              "z": 0.38
            },
            "localRotation": {
              "_$type": "Quaternion",
              "w": -1
            },
            "localScale": {
              "_$type": "Vector3",
              "x": 1.5713,
              "y": 1.5713,
              "z": 1.5713
            }
          },
          "_$comp": [
            {
              "_$type": "MeshFilter",
              "sharedMesh": {
                "_$uuid": "Library/unity default resources-Cube.lm",
                "_$type": "Mesh"
              }
            },
            {
              "_$type": "MeshRenderer",
              "_scaleInLightmap": 1,
              "sharedMaterials": [
                {
                  "_$uuid": "Assets/depthshader/red.lmat",
                  "_$type": "Material"
                }
              ]
            },
            {
              "_$type": "PhysicsCollider",
              "colliderShape": {
                "_$type": "BoxColliderShape",
                "localOffset": {
                  "_$type": "Vector3"
                }
              }
            }
          ]
        },
        {
          "_$id": "dd5hcjcu",
          "_$type": "Sprite3D",
          "name": "Sphere (1)",
          "layer": 0,
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": 1.08,
              "y": 2.764,
              "z": 0.38
            },
            "localRotation": {
              "_$type": "Quaternion",
              "w": -1
            },
            "localScale": {
              "_$type": "Vector3",
              "x": 1.5713,
              "y": 1.5713,
              "z": 1.5713
            }
          },
          "_$comp": [
            {
              "_$type": "MeshFilter",
              "sharedMesh": {
                "_$uuid": "Library/unity default resources-Sphere.lm",
                "_$type": "Mesh"
              }
            },
            {
              "_$type": "MeshRenderer",
              "_scaleInLightmap": 1,
              "sharedMaterials": [
                {
                  "_$uuid": "Assets/depthshader/green.lmat",
                  "_$type": "Material"
                }
              ]
            }
          ]
        },
        {
          "_$id": "smat4x66",
          "_$type": "Sprite3D",
          "name": "Cube (1)",
          "layer": 0,
          "transform": {
            "localPosition": {
              "_$type": "Vector3",
              "x": -1.55,
              "y": 1.72,
              "z": 0.02
            },
            "localRotation": {
              "_$type": "Quaternion",
              "x": 0.09085091432509858,
              "y": 0.03397338161735548,
              "z": -0.3486066165959582,
              "w": -0.932236744380575
            },
            "localScale": {
              "_$type": "Vector3",
              "x": 1.5713,
              "y": 1.5713,
              "z": 1.5713
            }
          },
          "_$comp": [
            {
              "_$type": "MeshFilter",
              "sharedMesh": {
                "_$uuid": "Library/unity default resources-Cube.lm",
                "_$type": "Mesh"
              }
            },
            {
              "_$type": "MeshRenderer",
              "_scaleInLightmap": 1,
              "sharedMaterials": [
                {
                  "_$uuid": "Assets/depthshader/origan.lmat",
                  "_$type": "Material"
                }
              ]
            },
            {
              "_$type": "PhysicsCollider",
              "colliderShape": {
                "_$type": "BoxColliderShape",
                "localOffset": {
                  "_$type": "Vector3"
                }
              }
            },
            {
              "_$type": "Animator",
              "cullingMode": 0,
              "controllerLayers": [
                {
                  "_$type": "AnimatorControllerLayer",
                  "name": "Base Layer",
                  "states": [
                    {
                      "_$type": "AnimatorState",
                      "name": "CubeRotate",
                      "clipStart": 0,
                      "clip": {
                        "_$uuid": "Assets/depthshader/CubeRotate-CubeRotate.lani",
                        "_$type": "AnimationClip"
                      },
                      "soloTransitions": []
                    }
                  ],
                  "defaultStateName": "CubeRotate"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}