{
  "type": "Scene",
  "props": {
    "name": "ColliderDemo",
    "enableFog": true,
    "fogStart": 0,
    "fogRange": 300
  },
  "customProps": {
    "skyBox": {},
    "lightmaps": [],
    "ambientColor": [
      0.2136678,
      0.2346499,
      0.2794118
    ],
    "fogColor": [
      0.4183607,
      0.4485742,
      0.5367647
    ]
  },
  "child": [
    {
      "type": "MeshSprite3D",
      "props": {
        "isStatic": false,
        "name": "Plane"
      },
      "customProps": {
        "layer": 0,
        "translate": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0,
          -1
        ],
        "scale": [
          3,
          3,
          3
        ],
        "meshPath": "Library/unity default resources-Plane.lm",
        "materials": [
          {
            "type": "Laya.BlinnPhongMaterial",
            "path": "Assets/Halloween/Materials/fabric.lmat"
          }
        ]
      },
      "components": {},
      "child": []
    },
    {
      "type": "MeshSprite3D",
      "props": {
        "isStatic": false,
        "name": "candlestick"
      },
      "customProps": {
        "layer": 0,
        "translate": [
          -5.18,
          0,
          1.83
        ],
        "rotation": [
          -0.318493,
          0.6314561,
          0.6312357,
          0.3183818
        ],
        "scale": [
          400,
          400,
          300
        ],
        "meshPath": "Assets/Halloween/Models/candlestick-Candlestick.lm",
        "materials": [
          {
            "type": "Laya.PBRStandardMaterial",
            "path": "Assets/Halloween/Materials/candlestick.lmat"
          }
        ]
      },
      "components": {
        "BoxCollider": {
          "isTrigger": false,
          "center": [
            -1.621232e-10,
            1.116342e-9,
            0.007879082
          ],
          "size": [
            0.00555,
            0.005279999,
            0.01871
          ]
        }
      },
      "child": [
        {
          "type": "MeshSprite3D",
          "props": {
            "isStatic": false,
            "name": "candle"
          },
          "customProps": {
            "layer": 0,
            "translate": [
              0,
              0,
              0.01426667
            ],
            "rotation": [
              -8.940697e-8,
              0,
              0,
              -1
            ],
            "scale": [
              0.25,
              0.2500001,
              0.3333334
            ],
            "meshPath": "Assets/Halloween/Models/candle-Cylinder.lm",
            "materials": [
              {
                "type": "Laya.BlinnPhongMaterial",
                "path": "Assets/Halloween/Materials/candle.lmat"
              }
            ]
          },
          "components": {},
          "child": []
        },
        {
          "type": "ShuriKenParticle3D",
          "props": {
            "isStatic": true,
            "name": "fire"
          },
          "customProps": {
            "layer": 0,
            "translate": [
              0,
              -0.0002,
              0.01862
            ],
            "rotation": [
              -5.960464e-8,
              -3.318447e-10,
              3.344168e-11,
              -1
            ],
            "scale": [
              0.00290698,
              0.002906983,
              0.003875977
            ],
            "isPerformanceMode": true,
            "duration": 3,
            "looping": true,
            "prewarm": false,
            "startDelayType": 0,
            "startDelay": 0,
            "startDelayMin": 0,
            "startDelayMax": 0,
            "startLifetimeType": 0,
            "startLifetimeConstant": 1,
            "startLifetimeConstantMin": 0,
            "startLifetimeConstantMax": 1,
            "startLifetimeGradient": {
              "startLifetimes": []
            },
            "startLifetimeGradientMin": {
              "startLifetimes": []
            },
            "startLifetimeGradientMax": {
              "startLifetimes": []
            },
            "startSpeedType": 0,
            "startSpeedConstant": 0.8,
            "startSpeedConstantMin": 0,
            "startSpeedConstantMax": 0.8,
            "threeDStartSize": false,
            "startSizeType": 0,
            "startSizeConstant": 1,
            "startSizeConstantMin": 0,
            "startSizeConstantMax": 1,
            "startSizeConstantSeparate": [
              1,
              1,
              1
            ],
            "startSizeConstantMinSeparate": [
              0,
              0,
              0
            ],
            "startSizeConstantMaxSeparate": [
              1,
              1,
              1
            ],
            "threeDStartRotation": false,
            "startRotationType": 0,
            "startRotationConstant": 0.01,
            "startRotationConstantMin": 0,
            "startRotationConstantMax": 0.01,
            "startRotationConstantSeparate": [
              0,
              0,
              -0.01
            ],
            "startRotationConstantMinSeparate": [
              0,
              0,
              0
            ],
            "startRotationConstantMaxSeparate": [
              0,
              0,
              -0.01
            ],
            "randomizeRotationDirection": 0,
            "startColorType": 0,
            "startColorConstant": [
              0.8235294,
              0.3882353,
              0.05490196,
              1
            ],
            "startColorConstantMin": [
              0,
              0,
              0,
              0
            ],
            "startColorConstantMax": [
              0.8235294,
              0.3882353,
              0.05490196,
              1
            ],
            "gravity": [
              0,
              -9.81,
              0
            ],
            "gravityModifier": 0,
            "simulationSpace": 0,
            "scaleMode": 2,
            "playOnAwake": true,
            "maxParticles": 1000,
            "autoRandomSeed": true,
            "randomSeed": 3586303649,
            "emission": {
              "enable": true,
              "emissionRate": 10,
              "emissionRateTip": "Time",
              "bursts": []
            },
            "shape": {
              "enable": true,
              "shapeType": 2,
              "sphereRadius": 0.05,
              "sphereEmitFromShell": false,
              "sphereRandomDirection": 0,
              "hemiSphereRadius": 0.05,
              "hemiSphereEmitFromShell": false,
              "hemiSphereRandomDirection": 0,
              "coneAngle": 0,
              "coneRadius": 0.05,
              "coneLength": 5,
              "coneEmitType": 0,
              "coneRandomDirection": 0,
              "boxX": 1,
              "boxY": 1,
              "boxZ": 1,
              "boxRandomDirection": 0,
              "circleRadius": 0.05,
              "circleArc": 360,
              "circleEmitFromEdge": false,
              "circleRandomDirection": 0
            },
            "colorOverLifetime": {
              "enable": true,
              "color": {
                "type": 1,
                "constant": [
                  0,
                  0,
                  0,
                  0
                ],
                "gradient": {
                  "alphas": [
                    {
                      "key": 0,
                      "value": 0
                    },
                    {
                      "key": 0.2088197,
                      "value": 0.9882353
                    },
                    {
                      "key": 0.6529488,
                      "value": 0.8980392
                    },
                    {
                      "key": 1,
                      "value": 0
                    }
                  ],
                  "rgbs": [
                    {
                      "key": 0,
                      "value": [
                        1,
                        0.7254902,
                        0
                      ]
                    },
                    {
                      "key": 0.4794079,
                      "value": [
                        1,
                        0.7254902,
                        0
                      ]
                    },
                    {
                      "key": 1,
                      "value": [
                        1,
                        0.9372549,
                        0.4470588
                      ]
                    }
                  ]
                },
                "constantMin": [
                  0,
                  0,
                  0,
                  0
                ],
                "constantMax": [
                  0,
                  0,
                  0,
                  0
                ],
                "gradientMax": {
                  "alphas": [
                    {
                      "key": 0,
                      "value": 0
                    },
                    {
                      "key": 0.2088197,
                      "value": 0.9882353
                    },
                    {
                      "key": 0.6529488,
                      "value": 0.8980392
                    },
                    {
                      "key": 1,
                      "value": 0
                    }
                  ],
                  "rgbs": [
                    {
                      "key": 0,
                      "value": [
                        1,
                        0.7254902,
                        0
                      ]
                    },
                    {
                      "key": 0.4794079,
                      "value": [
                        1,
                        0.7254902,
                        0
                      ]
                    },
                    {
                      "key": 1,
                      "value": [
                        1,
                        0.9372549,
                        0.4470588
                      ]
                    }
                  ]
                }
              }
            },
            "sizeOverLifetime": {
              "enable": true,
              "size": {
                "type": 0,
                "separateAxes": false,
                "gradient": {
                  "sizes": [
                    {
                      "key": 0,
                      "value": 1
                    },
                    {
                      "key": 1,
                      "value": 0.2173913
                    }
                  ]
                },
                "gradientX": {
                  "sizes": [
                    {
                      "key": 0,
                      "value": 1
                    },
                    {
                      "key": 1,
                      "value": 0.2173913
                    }
                  ]
                },
                "gradientY": {
                  "sizes": [
                    {
                      "key": 0,
                      "value": 1
                    },
                    {
                      "key": 1,
                      "value": 1
                    }
                  ]
                },
                "gradientZ": {
                  "sizes": [
                    {
                      "key": 0,
                      "value": 1
                    },
                    {
                      "key": 1,
                      "value": 1
                    }
                  ]
                },
                "constantMin": 0,
                "constantMax": 0,
                "constantMinSeparate": [
                  0,
                  0,
                  0
                ],
                "constantMaxSeparate": [
                  0,
                  0,
                  0
                ],
                "gradientMin": {
                  "sizes": []
                },
                "gradientMax": {
                  "sizes": [
                    {
                      "key": 0,
                      "value": 1
                    },
                    {
                      "key": 1,
                      "value": 0.2173913
                    }
                  ]
                },
                "gradientXMin": {
                  "sizes": []
                },
                "gradientXMax": {
                  "sizes": [
                    {
                      "key": 0,
                      "value": 1
                    },
                    {
                      "key": 1,
                      "value": 0.2173913
                    }
                  ]
                },
                "gradientYMin": {
                  "sizes": []
                },
                "gradientYMax": {
                  "sizes": [
                    {
                      "key": 0,
                      "value": 1
                    },
                    {
                      "key": 1,
                      "value": 1
                    }
                  ]
                },
                "gradientZMin": {
                  "sizes": []
                },
                "gradientZMax": {
                  "sizes": [
                    {
                      "key": 0,
                      "value": 1
                    },
                    {
                      "key": 1,
                      "value": 1
                    }
                  ]
                }
              }
            },
            "renderMode": 0,
            "stretchedBillboardCameraSpeedScale": 0,
            "stretchedBillboardSpeedScale": 0,
            "stretchedBillboardLengthScale": 2,
            "sortingFudge": 0,
            "material": {
              "type": "Laya.ShurikenParticleMaterial",
              "path": "Assets/Handpainted Forest Environment/Particles/flame.lmat"
            }
          },
          "components": {},
          "child": []
        }
      ]
    },
    {
      "type": "MeshSprite3D",
      "props": {
        "isStatic": false,
        "name": "pumpkinCut"
      },
      "customProps": {
        "layer": 0,
        "translate": [
          -2.75,
          -0.29,
          1.87
        ],
        "rotation": [
          0.6966513,
          -0.1211485,
          -0.1211484,
          -0.6966513
        ],
        "scale": [
          100,
          100,
          100
        ],
        "meshPath": "Assets/Halloween/Models/pumpkinCut-cut_pumpkin.lm",
        "materials": [
          {
            "type": "Laya.PBRStandardMaterial",
            "path": "Assets/Halloween/Materials/pumpkin.lmat"
          }
        ]
      },
      "components": {
        "SphereCollider": {
          "isTrigger": false,
          "center": [
            -1.030791e-8,
            0.000002050747,
            0.01025205
          ],
          "radius": 0.01024063
        }
      },
      "child": []
    },
    {
      "type": "MeshSprite3D",
      "props": {
        "isStatic": false,
        "name": "Soccer"
      },
      "customProps": {
        "layer": 0,
        "translate": [
          5.59,
          1,
          2.17
        ],
        "rotation": [
          0,
          -0.1206821,
          0,
          -0.9926912
        ],
        "scale": [
          6,
          6,
          6
        ],
        "meshPath": "Assets/Soccer Ball/Meshes/Soccer Ball Mesh-Ball-LP.lm",
        "materials": [
          {
            "type": "Laya.BlinnPhongMaterial",
            "path": "Assets/Soccer Ball/Materials/White-Ball-Material.lmat"
          },
          {
            "type": "Laya.BlinnPhongMaterial",
            "path": "Assets/Soccer Ball/Materials/Black-Ball-Material.lmat"
          }
        ]
      },
      "components": {
        "SphereCollider": {
          "isTrigger": false,
          "center": [
            0,
            0,
            0
          ],
          "radius": 0.11
        }
      },
      "child": []
    },
    {
      "type": "MeshSprite3D",
      "props": {
        "isStatic": false,
        "name": "Box"
      },
      "customProps": {
        "layer": 0,
        "translate": [
          5.59,
          0,
          2.17
        ],
        "rotation": [
          6.817449e-17,
          0.9926912,
          5.339517e-17,
          -0.1206821
        ],
        "scale": [
          1.5,
          1.5,
          1.5
        ],
        "meshPath": "Assets/PolyWorkshop/CardboardBoxesSet/Models/cardboardBox_02-cardboardBox_02.lm",
        "materials": [
          {
            "type": "Laya.BlinnPhongMaterial",
            "path": "Assets/PolyWorkshop/CardboardBoxesSet/Materials/cardboardBoxes_Material.lmat"
          }
        ]
      },
      "components": {
        "BoxCollider": {
          "isTrigger": false,
          "center": [
            -0.03437451,
            0.4704858,
            0.001113743
          ],
          "size": [
            1.590636,
            0.9525325,
            1.649849
          ]
        }
      },
      "child": []
    },
    {
      "type": "DirectionLight",
      "props": {
        "isStatic": false,
        "name": "Directional light",
        "intensity": 1,
        "lightmapBakedType": 0
      },
      "customProps": {
        "layer": 0,
        "translate": [
          0.647918,
          4.060365,
          -5.971442
        ],
        "rotation": [
          -0.7212632,
          0.1721544,
          0.1932619,
          0.642489
        ],
        "scale": [
          1,
          1,
          1
        ],
        "color": [
          1,
          0.6413794,
          0
        ]
      },
      "components": {},
      "child": []
    },
    {
      "type": "Sprite3D",
      "props": {
        "isStatic": false,
        "name": "Collider"
      },
      "customProps": {
        "layer": 0,
        "translate": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0,
          -1
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "components": {},
      "child": [
        {
          "type": "MeshSprite3D",
          "props": {
            "isStatic": false,
            "name": "cube1"
          },
          "customProps": {
            "layer": 0,
            "translate": [
              -5.18,
              2.46,
              1.83
            ],
            "rotation": [
              -0.2205226,
              0.6718406,
              -0.6718406,
              -0.2205226
            ],
            "scale": [
              2.22,
              2.112,
              5.613
            ],
            "meshPath": "Library/unity default resources-Cube.lm",
            "materials": [
              {
                "type": "Laya.BlinnPhongMaterial",
                "path": "Assets/Halloween/Materials/New Material.lmat"
              }
            ]
          },
          "child": []
        },
        {
          "type": "MeshSprite3D",
          "props": {
            "isStatic": false,
            "name": "Sphere1"
          },
          "customProps": {
            "layer": 0,
            "translate": [
              -2.75,
              0.66,
              1.87
            ],
            "rotation": [
              0,
              0,
              0,
              -1
            ],
            "scale": [
              2.2,
              2.2,
              2.2
            ],
            "meshPath": "Library/unity default resources-Sphere.lm",
            "materials": [
              {
                "type": "Laya.BlinnPhongMaterial",
                "path": "Assets/Halloween/Materials/New Material 1.lmat"
              }
            ]
          },
          "child": []
        },
        {
          "type": "MeshSprite3D",
          "props": {
            "isStatic": false,
            "name": "Cube2"
          },
          "customProps": {
            "layer": 0,
            "translate": [
              5.48,
              0.79,
              2.2
            ],
            "rotation": [
              0,
              -0.1168988,
              0,
              -0.9931439
            ],
            "scale": [
              2.3,
              1.4,
              2.475
            ],
            "meshPath": "Library/unity default resources-Cube.lm",
            "materials": [
              {
                "type": "Laya.BlinnPhongMaterial",
                "path": "Assets/Halloween/Materials/New Material.lmat"
              }
            ]
          },
          "child": []
        },
        {
          "type": "MeshSprite3D",
          "props": {
            "isStatic": false,
            "name": "Sphere2"
          },
          "customProps": {
            "layer": 0,
            "translate": [
              5.59,
              1,
              2.17
            ],
            "rotation": [
              0,
              0,
              0,
              -1
            ],
            "scale": [
              1.35,
              1.35,
              1.35
            ],
            "meshPath": "Library/unity default resources-Sphere.lm",
            "materials": [
              {
                "type": "Laya.BlinnPhongMaterial",
                "path": "Assets/Halloween/Materials/New Material 1.lmat"
              }
            ]
          },
          "child": []
        }
      ]
    }
  ]
}