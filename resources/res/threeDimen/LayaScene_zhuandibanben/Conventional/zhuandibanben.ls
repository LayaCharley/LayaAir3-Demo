{
  "version": "LAYASCENE3D:02",
  "data": {
    "type": "Scene3D",
    "props": {
      "name": "zhuandibanben",
      "sky": {
        "material": {
          "type": "Laya.SkyBoxMaterial",
          "path": "Assets/mizi/xzkbn/sky/sky.lmat"
        },
        "mesh": "SkyBox"
      },
      "ambientColor": [
        0.4339623,
        0.4339623,
        0.4339623
      ],
      "reflectionDecodingFormat": 1,
      "reflection": "Assets/zhuandibanbenGIReflection.ltcb",
      "reflectionIntensity": 1,
      "ambientMode": 0,
      "ambientSphericalHarmonicsIntensity": 1,
      "lightmaps": [],
      "enableFog": false,
      "fogStart": 0,
      "fogRange": 300,
      "fogColor": [
        0.5,
        0.5,
        0.5
      ]
    },
    "child": [
      {
        "type": "Camera",
        "instanceID": 0,
        "props": {
          "name": "MainCamera",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0.6973915,
            0.784188,
            1.035858
          ],
          "rotation": [
            0.0368205,
            -0.7500362,
            -0.04190233,
            -0.6590404
          ],
          "scale": [
            1,
            1,
            1
          ],
          "clearFlag": 1,
          "orthographic": false,
          "orthographicVerticalSize": 10,
          "fieldOfView": 26.99147,
          "enableHDR": true,
          "nearPlane": 0.3,
          "farPlane": 1000,
          "viewport": [
            0,
            0,
            1,
            1
          ],
          "clearColor": [
            0.1921569,
            0.3019608,
            0.4745098,
            0
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "Camera",
        "instanceID": 1,
        "props": {
          "name": "BlurCamera",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0.6973915,
            0.784188,
            1.035858
          ],
          "rotation": [
            0.0368205,
            -0.7500362,
            -0.04190233,
            -0.6590404
          ],
          "scale": [
            1,
            1,
            1
          ],
          "clearFlag": 3,
          "orthographic": false,
          "orthographicVerticalSize": 10,
          "fieldOfView": 60,
          "enableHDR": true,
          "nearPlane": 0.3,
          "farPlane": 1000,
          "viewport": [
            0,
            0,
            1,
            1
          ],
          "clearColor": [
            0.1921569,
            0.3019608,
            0.4745098,
            0
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "DirectionLight",
        "instanceID": 2,
        "props": {
          "name": "Directional Light",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0.172,
            2.017,
            -1.796
          ],
          "rotation": [
            0.05143377,
            0.8717292,
            0.396815,
            0.2828087
          ],
          "scale": [
            1,
            1,
            1
          ],
          "intensity": 0.9,
          "lightmapBakedType": 0,
          "color": [
            1,
            1,
            1
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "Sprite3D",
        "instanceID": 3,
        "props": {
          "name": "远山背景",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            -4.04,
            0.57,
            -3.86
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
        "components": [],
        "child": [
          {
            "type": "MeshSprite3D",
            "instanceID": 4,
            "props": {
              "name": "beijingshan",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -3.15,
                -0.9849701,
                -2.702744
              ],
              "rotation": [
                0,
                1,
                0,
                0
              ],
              "scale": [
                1.6192,
                1.6192,
                1.6192
              ],
              "meshPath": "Assets/mizi/xzkbn/beijingshan-Plane007.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/New Material.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 5,
            "props": {
              "name": "beijingshan (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -3.15,
                -0.9849701,
                7.387257
              ],
              "rotation": [
                0,
                1,
                0,
                0
              ],
              "scale": [
                1.6192,
                1.6192,
                1.6192
              ],
              "meshPath": "Assets/mizi/xzkbn/beijingshan-Plane007.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/New Material.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 6,
            "props": {
              "name": "beijingshan (2)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -3.904001,
                -0.9849701,
                -3.812743
              ],
              "rotation": [
                0,
                1,
                0,
                0
              ],
              "scale": [
                1.6192,
                1.6192,
                1.6192
              ],
              "meshPath": "Assets/mizi/xzkbn/beijingshan-Plane007.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/New Material.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 7,
            "props": {
              "name": "beijingshan (3)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -3.904001,
                -0.9849701,
                6.277257
              ],
              "rotation": [
                0,
                1,
                0,
                0
              ],
              "scale": [
                1.6192,
                1.6192,
                1.6192
              ],
              "meshPath": "Assets/mizi/xzkbn/beijingshan-Plane007.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/New Material.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          }
        ]
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 8,
        "props": {
          "name": "Plane005 (1)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0,
            -0.067,
            0.03
          ],
          "rotation": [
            -9.378829e-22,
            -1.509958e-7,
            1.230017e-14,
            1
          ],
          "scale": [
            1,
            1,
            3.023529
          ],
          "meshPath": "Assets/mizi/xzkbn/最终模型/kabicaodi-Plane005.lm",
          "enableRender": true,
          "receiveShadows": true,
          "castShadow": true,
          "materials": [
            {
              "path": "Assets/mizi/xzkbn/最终模型/Materials/xincaodi 2.lmat"
            }
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 9,
        "props": {
          "name": "Plane005 (2)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            -3.74,
            -0.067,
            0.03
          ],
          "rotation": [
            -9.378829e-22,
            -1.509958e-7,
            1.230017e-14,
            1
          ],
          "scale": [
            1,
            1,
            3.023529
          ],
          "meshPath": "Assets/mizi/xzkbn/最终模型/kabicaodi-Plane005.lm",
          "enableRender": true,
          "receiveShadows": true,
          "castShadow": true,
          "materials": [
            {
              "path": "Assets/mizi/xzkbn/最终模型/Materials/lashen.lmat"
            }
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 10,
        "props": {
          "name": "Plane005 (3)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0,
            -0.067,
            10.09
          ],
          "rotation": [
            -9.378829e-22,
            -1.509958e-7,
            1.230017e-14,
            1
          ],
          "scale": [
            1,
            1,
            3.023529
          ],
          "meshPath": "Assets/mizi/xzkbn/最终模型/kabicaodi-Plane005.lm",
          "enableRender": true,
          "receiveShadows": true,
          "castShadow": true,
          "materials": [
            {
              "path": "Assets/mizi/xzkbn/最终模型/Materials/xincaodi 2.lmat"
            }
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 11,
        "props": {
          "name": "Plane005 (4)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            -3.74,
            -0.067,
            10.09
          ],
          "rotation": [
            -9.378829e-22,
            -1.509958e-7,
            1.230017e-14,
            1
          ],
          "scale": [
            1,
            1,
            3.023529
          ],
          "meshPath": "Assets/mizi/xzkbn/最终模型/kabicaodi-Plane005.lm",
          "enableRender": true,
          "receiveShadows": true,
          "castShadow": true,
          "materials": [
            {
              "path": "Assets/mizi/xzkbn/最终模型/Materials/lashen.lmat"
            }
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 12,
        "props": {
          "name": "Plane005 (5)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0,
            -0.067,
            -10
          ],
          "rotation": [
            -9.378829e-22,
            -1.509958e-7,
            1.230017e-14,
            1
          ],
          "scale": [
            1,
            1,
            3.023529
          ],
          "meshPath": "Assets/mizi/xzkbn/最终模型/kabicaodi-Plane005.lm",
          "enableRender": true,
          "receiveShadows": true,
          "castShadow": true,
          "materials": [
            {
              "path": "Assets/mizi/xzkbn/最终模型/Materials/xincaodi 2.lmat"
            }
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 13,
        "props": {
          "name": "Plane005 (6)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            -3.74,
            -0.067,
            -10
          ],
          "rotation": [
            -9.378829e-22,
            -1.509958e-7,
            1.230017e-14,
            1
          ],
          "scale": [
            1,
            1,
            3.023529
          ],
          "meshPath": "Assets/mizi/xzkbn/最终模型/kabicaodi-Plane005.lm",
          "enableRender": true,
          "receiveShadows": true,
          "castShadow": true,
          "materials": [
            {
              "path": "Assets/mizi/xzkbn/最终模型/Materials/lashen.lmat"
            }
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "Sprite3D",
        "instanceID": 14,
        "props": {
          "name": "cao",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            -1.79732,
            -0.1868816,
            0.2699648
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
        "components": [],
        "child": [
          {
            "type": "MeshSprite3D",
            "instanceID": 15,
            "props": {
              "name": "cao",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.9643198,
                0.2198816,
                0.7056352
              ],
              "rotation": [
                0,
                1,
                0,
                0
              ],
              "scale": [
                0.00726636,
                0.00726636,
                0.00726636
              ],
              "meshPath": "Assets/mizi/xzkbn/最终模型/cao-Plane001.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/最终模型/Materials/cao.lmat"
                }
              ]
            },
            "components": [],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 16,
            "props": {
              "name": "cao (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.9386597,
                0.2061816,
                0.7242053
              ],
              "rotation": [
                0,
                1,
                0,
                0
              ],
              "scale": [
                0.00726636,
                0.00726636,
                0.00726636
              ],
              "meshPath": "Assets/mizi/xzkbn/最终模型/cao-Plane001.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/最终模型/Materials/cao.lmat"
                }
              ]
            },
            "components": [],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 17,
            "props": {
              "name": "cao (2)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.9643198,
                0.1987816,
                0.7682352
              ],
              "rotation": [
                0,
                1,
                0,
                0
              ],
              "scale": [
                0.00726636,
                0.00726636,
                0.00726636
              ],
              "meshPath": "Assets/mizi/xzkbn/最终模型/cao-Plane001.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/最终模型/Materials/cao.lmat"
                }
              ]
            },
            "components": [],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 18,
            "props": {
              "name": "cao (3)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.9386597,
                0.2101816,
                0.7759352
              ],
              "rotation": [
                0,
                1,
                0,
                0
              ],
              "scale": [
                0.00726636,
                0.00726636,
                0.00726636
              ],
              "meshPath": "Assets/mizi/xzkbn/最终模型/cao-Plane001.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/最终模型/Materials/cao.lmat"
                }
              ]
            },
            "components": [],
            "child": []
          }
        ]
      },
      {
        "type": "Sprite3D",
        "instanceID": 19,
        "props": {
          "name": "changjing",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            -1.79732,
            -0.1868816,
            0.2699648
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
        "components": [],
        "child": [
          {
            "type": "MeshSprite3D",
            "instanceID": 20,
            "props": {
              "name": "ttangguo",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.8393198,
                0.1578816,
                0.2230352
              ],
              "rotation": [
                -0.07784419,
                -0.1108617,
                -0.1850439,
                -0.9733493
              ],
              "scale": [
                0.5193601,
                0.5193599,
                0.51936
              ],
              "meshPath": "Assets/mizi/xzkbn/ttangguo-Tube002.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/最终模型/Materials/２tanggggguo.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 21,
            "props": {
              "name": "huacong",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.9773198,
                0.2463816,
                0.07803521
              ],
              "rotation": [
                -1.405749e-8,
                -0.7657018,
                -1.673495e-8,
                -0.6431957
              ],
              "scale": [
                0.2117201,
                0.21172,
                0.2117201
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 22,
            "props": {
              "name": "huacong (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.9723198,
                0.2269816,
                0.3490352
              ],
              "rotation": [
                -1.405749e-8,
                -0.7657018,
                -1.673495e-8,
                -0.6431957
              ],
              "scale": [
                0.2117201,
                0.21172,
                0.2117201
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 23,
            "props": {
              "name": "caoduo",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                1.00932,
                0.2475816,
                0.1566352
              ],
              "rotation": [
                -8.146034e-8,
                0,
                0,
                -1
              ],
              "scale": [
                1,
                1,
                1
              ],
              "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 24,
            "props": {
              "name": "shu2",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.8573198,
                0.2898816,
                -0.1669648
              ],
              "rotation": [
                -0.0223688,
                -0.002546635,
                0.1130882,
                -0.9933299
              ],
              "scale": [
                0.506184,
                0.506184,
                0.506184
              ],
              "meshPath": "Assets/mizi/xzkbn/shu2-Box004.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 25,
            "props": {
              "name": "shushu",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.64168,
                0.3678816,
                -1.262965
              ],
              "rotation": [
                -2.185569e-8,
                0,
                0,
                -1
              ],
              "scale": [
                0.43582,
                0.43582,
                0.43582
              ],
              "meshPath": "Assets/mizi/xzkbn/shushu-Box003.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-7.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 26,
            "props": {
              "name": "gaochu",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.3373197,
                0.3178816,
                -0.8569648
              ],
              "rotation": [
                -2.185569e-8,
                0,
                0,
                -1
              ],
              "scale": [
                1,
                1,
                1
              ],
              "meshPath": "Assets/mizi/xzkbn/gaochu-Sphere007.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/No Name.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 27,
            "props": {
              "name": "ttangguo (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.77611,
                0.25754,
                -1.061965
              ],
              "rotation": [
                0.095241,
                -0.2267651,
                -0.3753362,
                -0.8936607
              ],
              "scale": [
                0.3447269,
                0.3447269,
                0.3447269
              ],
              "meshPath": "Assets/mizi/xzkbn/ttangguo-Tube002.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/最终模型/Materials/２tanggggguo.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "Sprite3D",
            "instanceID": 28,
            "props": {
              "name": "huashu",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.18863,
                -1.713641,
                -1.320399
              ],
              "rotation": [
                0.03218433,
                0.1496699,
                -0.004874542,
                -0.9882001
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 29,
                "props": {
                  "name": "huacong (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.907459,
                    1.760724,
                    1.684426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 30,
                "props": {
                  "name": "huacong (3)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.940159,
                    1.760724,
                    1.573826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 31,
                "props": {
                  "name": "huacong (4)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.833459,
                    1.760724,
                    1.591426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 32,
                "props": {
                  "name": "huacong (5)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.866159,
                    1.760724,
                    1.480826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 33,
                "props": {
                  "name": "huacong (6)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.825573,
                    1.76974,
                    1.409779
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 34,
                "props": {
                  "name": "huacong (7)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.858101,
                    1.781528,
                    1.299758
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 35,
                "props": {
                  "name": "huacong (8)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.751471,
                    1.776713,
                    1.317121
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 36,
                "props": {
                  "name": "huacong (9)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.784,
                    1.7885,
                    1.2071
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 37,
            "props": {
              "name": "danshu",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.6743197,
                0.3478816,
                0.6610352
              ],
              "rotation": [
                -2.185569e-8,
                0,
                0,
                -1
              ],
              "scale": [
                0.2880753,
                0.2880753,
                0.2880753
              ],
              "meshPath": "Assets/mizi/xzkbn/danshu-Box006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/shu2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 38,
            "props": {
              "name": "caoduo (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.7283198,
                0.3378816,
                0.6240352
              ],
              "rotation": [
                -8.146034e-8,
                0,
                0,
                -1
              ],
              "scale": [
                1,
                1,
                1
              ],
              "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 39,
            "props": {
              "name": "mao",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.14668,
                0.109,
                1.611
              ],
              "rotation": [
                0.07228518,
                0,
                0,
                -0.9973841
              ],
              "scale": [
                1,
                1,
                1
              ],
              "meshPath": "Assets/mizi/xzkbn/mao-Sphere006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/Q2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 40,
            "props": {
              "name": "shushu (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                1.00232,
                0.2228816,
                1.088035
              ],
              "rotation": [
                -2.185569e-8,
                0,
                0,
                -1
              ],
              "scale": [
                0.43582,
                0.43582,
                0.43582
              ],
              "meshPath": "Assets/mizi/xzkbn/shushu-Box003.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-7.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "Sprite3D",
            "instanceID": 41,
            "props": {
              "name": "huashu (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -0.8476802,
                -1.515118,
                -3.418965
              ],
              "rotation": [
                0.1397916,
                0.3883994,
                0.1018206,
                -0.9051171
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 42,
            "props": {
              "name": "huacong (2)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.5016621,
                0.4795837,
                -0.4878905
              ],
              "rotation": [
                0.05103428,
                -0.2306513,
                0.165241,
                -0.9575441
              ],
              "scale": [
                0.1700001,
                0.17,
                0.17
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 43,
            "props": {
              "name": "huacong (3)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.5984319,
                0.4403715,
                -0.5368772
              ],
              "rotation": [
                0.05103428,
                -0.2306513,
                0.165241,
                -0.9575441
              ],
              "scale": [
                0.1700001,
                0.17,
                0.17
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 44,
            "props": {
              "name": "huacong (4)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.5142633,
                0.4542978,
                -0.6033325
              ],
              "rotation": [
                0.05103428,
                -0.2306513,
                0.165241,
                -0.9575441
              ],
              "scale": [
                0.1700001,
                0.17,
                0.17
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 45,
            "props": {
              "name": "huacong (5)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.6629585,
                0.4006095,
                -0.6447155
              ],
              "rotation": [
                0.05103428,
                -0.2306513,
                0.165241,
                -0.9575441
              ],
              "scale": [
                0.1700001,
                0.17,
                0.17
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 46,
            "props": {
              "name": "huacong (6)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.6341053,
                0.4030383,
                -0.7304139
              ],
              "rotation": [
                0.03916513,
                -0.2329606,
                0.1160276,
                -0.9647452
              ],
              "scale": [
                0.17,
                0.17,
                0.17
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 47,
            "props": {
              "name": "huacong (7)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.7338207,
                0.3751142,
                -0.7811949
              ],
              "rotation": [
                0.03916513,
                -0.2329606,
                0.1160276,
                -0.9647452
              ],
              "scale": [
                0.17,
                0.17,
                0.17
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 48,
            "props": {
              "name": "huacong (9)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.7418352,
                0.3266702,
                -0.8936937
              ],
              "rotation": [
                0.03916513,
                -0.2329606,
                0.1160276,
                -0.9647452
              ],
              "scale": [
                0.17,
                0.17,
                0.17
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 49,
            "props": {
              "name": "danshu (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                1.832,
                0.385,
                -0.779
              ],
              "rotation": [
                -2.185569e-8,
                0,
                0,
                -1
              ],
              "scale": [
                0.4311624,
                0.4311624,
                0.4311624
              ],
              "meshPath": "Assets/mizi/xzkbn/danshu-Box006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/shu2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 50,
            "props": {
              "name": "huacong (8)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                1.8943,
                0.351,
                -0.515
              ],
              "rotation": [
                -0.04695735,
                -0.7642606,
                -0.03944456,
                -0.6419851
              ],
              "scale": [
                0.2117201,
                0.21172,
                0.2117201
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 51,
            "props": {
              "name": "caoduo (2)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                1.921,
                0.38,
                -0.802
              ],
              "rotation": [
                -8.146034e-8,
                0,
                0,
                -1
              ],
              "scale": [
                1,
                1,
                1
              ],
              "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          }
        ]
      },
      {
        "type": "Sprite3D",
        "instanceID": 52,
        "props": {
          "name": "changjing (1)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            -2.15,
            -0.1868816,
            -2.64
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
        "components": [],
        "child": [
          {
            "type": "MeshSprite3D",
            "instanceID": 53,
            "props": {
              "name": "ttangguo",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.8393198,
                0.1578816,
                0.2230352
              ],
              "rotation": [
                -0.07784419,
                -0.1108617,
                -0.1850439,
                -0.9733493
              ],
              "scale": [
                0.5193601,
                0.5193599,
                0.51936
              ],
              "meshPath": "Assets/mizi/xzkbn/ttangguo-Tube002.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/最终模型/Materials/２tanggggguo.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 54,
            "props": {
              "name": "huacong",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.9773198,
                0.2463816,
                0.07803521
              ],
              "rotation": [
                -1.405749e-8,
                -0.7657018,
                -1.673495e-8,
                -0.6431957
              ],
              "scale": [
                0.2117201,
                0.21172,
                0.2117201
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 55,
            "props": {
              "name": "huacong (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.9723198,
                0.2269816,
                0.3490352
              ],
              "rotation": [
                -1.405749e-8,
                -0.7657018,
                -1.673495e-8,
                -0.6431957
              ],
              "scale": [
                0.2117201,
                0.21172,
                0.2117201
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 56,
            "props": {
              "name": "caoduo",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                1.00932,
                0.2475816,
                0.1566352
              ],
              "rotation": [
                -8.146034e-8,
                0,
                0,
                -1
              ],
              "scale": [
                1,
                1,
                1
              ],
              "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 57,
            "props": {
              "name": "shu2",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.8573198,
                0.2898816,
                -0.1669648
              ],
              "rotation": [
                -0.0223688,
                -0.002546635,
                0.1130882,
                -0.9933299
              ],
              "scale": [
                0.506184,
                0.506184,
                0.506184
              ],
              "meshPath": "Assets/mizi/xzkbn/shu2-Box004.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 58,
            "props": {
              "name": "shushu",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.257,
                0.408,
                -1.2178
              ],
              "rotation": [
                -2.175042e-8,
                -2.142602e-9,
                0.09803402,
                -0.9951831
              ],
              "scale": [
                0.6333773,
                0.6333773,
                0.6333773
              ],
              "meshPath": "Assets/mizi/xzkbn/shushu-Box003.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-7.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "Sprite3D",
            "instanceID": 59,
            "props": {
              "name": "huashu",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.18863,
                -1.713641,
                -1.320399
              ],
              "rotation": [
                0.03218433,
                0.1496699,
                -0.004874542,
                -0.9882001
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 60,
                "props": {
                  "name": "huacong (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.907459,
                    1.760724,
                    1.684426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 61,
                "props": {
                  "name": "huacong (3)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.940159,
                    1.760724,
                    1.573826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 62,
                "props": {
                  "name": "huacong (4)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.833459,
                    1.760724,
                    1.591426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 63,
                "props": {
                  "name": "huacong (5)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.866159,
                    1.760724,
                    1.480826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 64,
                "props": {
                  "name": "huacong (6)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.825573,
                    1.76974,
                    1.409779
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 65,
                "props": {
                  "name": "huacong (7)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.858101,
                    1.781528,
                    1.299758
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 66,
                "props": {
                  "name": "huacong (8)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.751471,
                    1.776713,
                    1.317121
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 67,
                "props": {
                  "name": "huacong (9)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.784,
                    1.7885,
                    1.2071
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 68,
            "props": {
              "name": "huashu (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -0.8476802,
                -1.515118,
                -3.418965
              ],
              "rotation": [
                0.1397916,
                0.3883994,
                0.1018206,
                -0.9051171
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 69,
            "props": {
              "name": "danshu",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.6743197,
                0.3478816,
                0.6610352
              ],
              "rotation": [
                -2.185569e-8,
                0,
                0,
                -1
              ],
              "scale": [
                0.2880753,
                0.2880753,
                0.2880753
              ],
              "meshPath": "Assets/mizi/xzkbn/danshu-Box006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/shu2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 70,
            "props": {
              "name": "shushu (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.9729297,
                0.2907674,
                1.088035
              ],
              "rotation": [
                -2.167831e-8,
                -2.778881e-9,
                0.1271468,
                -0.991884
              ],
              "scale": [
                0.43582,
                0.43582,
                0.43582
              ],
              "meshPath": "Assets/mizi/xzkbn/shushu-Box003.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-7.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 71,
            "props": {
              "name": "caoduo (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.7283198,
                0.3378816,
                0.6240352
              ],
              "rotation": [
                -8.146034e-8,
                0,
                0,
                -1
              ],
              "scale": [
                1,
                1,
                1
              ],
              "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 72,
            "props": {
              "name": "mao",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.14668,
                0.1208816,
                1.195035
              ],
              "rotation": [
                0.07228518,
                0,
                0,
                -0.9973841
              ],
              "scale": [
                1,
                1,
                1
              ],
              "meshPath": "Assets/mizi/xzkbn/mao-Sphere006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/Q2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 73,
            "props": {
              "name": "shushu (2)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.36,
                0.389,
                -1.4539
              ],
              "rotation": [
                -2.185077e-8,
                4.641179e-10,
                -0.02123556,
                -0.9997745
              ],
              "scale": [
                0.943352,
                0.943352,
                0.943352
              ],
              "meshPath": "Assets/mizi/xzkbn/shushu-Box003.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-7.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 74,
            "props": {
              "name": "danshu (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                1.909,
                0.551,
                0.321
              ],
              "rotation": [
                -2.185569e-8,
                0,
                0,
                -1
              ],
              "scale": [
                0.2880753,
                0.2880753,
                0.2880753
              ],
              "meshPath": "Assets/mizi/xzkbn/danshu-Box006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/shu2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          }
        ]
      },
      {
        "type": "Sprite3D",
        "instanceID": 75,
        "props": {
          "name": "changjing (2)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            -1.814,
            -0.1868816,
            3.03
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
        "components": [],
        "child": [
          {
            "type": "MeshSprite3D",
            "instanceID": 76,
            "props": {
              "name": "ttangguo",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.242806,
                0.1214288,
                0.9119003
              ],
              "rotation": [
                -0.01755004,
                0.2623033,
                -0.5685126,
                -0.7795399
              ],
              "scale": [
                0.5193601,
                0.5193599,
                0.51936
              ],
              "meshPath": "Assets/mizi/xzkbn/ttangguo-Tube002.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/最终模型/Materials/２tanggggguo.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 77,
            "props": {
              "name": "huacong",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.9773198,
                0.2463816,
                0.07803521
              ],
              "rotation": [
                -1.405749e-8,
                -0.7657018,
                -1.673495e-8,
                -0.6431957
              ],
              "scale": [
                0.2117201,
                0.21172,
                0.2117201
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 78,
            "props": {
              "name": "huacong (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.9723198,
                0.2269816,
                0.3490352
              ],
              "rotation": [
                -1.405749e-8,
                -0.7657018,
                -1.673495e-8,
                -0.6431957
              ],
              "scale": [
                0.2117201,
                0.21172,
                0.2117201
              ],
              "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 79,
            "props": {
              "name": "caoduo",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                1.00932,
                0.2475816,
                0.1566352
              ],
              "rotation": [
                -8.146034e-8,
                0,
                0,
                -1
              ],
              "scale": [
                1,
                1,
                1
              ],
              "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 80,
            "props": {
              "name": "shu2",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.8573198,
                0.2898816,
                -0.1669648
              ],
              "rotation": [
                -0.0223688,
                -0.002546635,
                0.1130882,
                -0.9933299
              ],
              "scale": [
                0.506184,
                0.506184,
                0.506184
              ],
              "meshPath": "Assets/mizi/xzkbn/shu2-Box004.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 81,
            "props": {
              "name": "shushu",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -2.543,
                0.219,
                -1.849
              ],
              "rotation": [
                -2.185569e-8,
                0,
                0,
                -1
              ],
              "scale": [
                0.43582,
                0.43582,
                0.43582
              ],
              "meshPath": "Assets/mizi/xzkbn/shushu-Box003.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-7.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 82,
            "props": {
              "name": "gaochu",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.333,
                -0.055,
                -0.599
              ],
              "rotation": [
                0.211131,
                0,
                0,
                -0.9774578
              ],
              "scale": [
                1,
                1,
                1
              ],
              "meshPath": "Assets/mizi/xzkbn/gaochu-Sphere007.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/No Name.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 83,
            "props": {
              "name": "ttangguo (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.7533197,
                0.2798816,
                -1.061965
              ],
              "rotation": [
                0.095241,
                -0.2267651,
                -0.3753362,
                -0.8936607
              ],
              "scale": [
                0.29059,
                0.29059,
                0.29059
              ],
              "meshPath": "Assets/mizi/xzkbn/ttangguo-Tube002.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/最终模型/Materials/２tanggggguo.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "Sprite3D",
            "instanceID": 84,
            "props": {
              "name": "huashu",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -0.7169484,
                -1.382906,
                -1.376349
              ],
              "rotation": [
                -0.01747398,
                0.1492363,
                -0.01238335,
                -0.9885696
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 85,
                "props": {
                  "name": "huacong (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.907459,
                    1.760724,
                    1.684426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 86,
                "props": {
                  "name": "huacong (3)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.940159,
                    1.760724,
                    1.573826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 87,
                "props": {
                  "name": "huacong (4)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.833459,
                    1.760724,
                    1.591426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 88,
                "props": {
                  "name": "huacong (5)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.866159,
                    1.760724,
                    1.480826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 89,
                "props": {
                  "name": "huacong (6)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.825573,
                    1.76974,
                    1.409779
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 90,
                "props": {
                  "name": "huacong (7)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.858101,
                    1.781528,
                    1.299758
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 91,
                "props": {
                  "name": "huacong (8)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.751471,
                    1.776713,
                    1.317121
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 92,
                "props": {
                  "name": "huacong (9)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.784,
                    1.775,
                    1.206
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 93,
            "props": {
              "name": "danshu",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -0.061,
                0.403,
                0.6610352
              ],
              "rotation": [
                -2.185569e-8,
                0,
                0,
                -1
              ],
              "scale": [
                0.2880753,
                0.2880753,
                0.2880753
              ],
              "meshPath": "Assets/mizi/xzkbn/danshu-Box006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/shu2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 94,
            "props": {
              "name": "caoduo (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.024,
                0.393,
                0.6240352
              ],
              "rotation": [
                -8.146034e-8,
                0,
                0,
                -1
              ],
              "scale": [
                1,
                1,
                1
              ],
              "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 95,
            "props": {
              "name": "mao",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -3.007,
                0.211,
                1.092
              ],
              "rotation": [
                -0.06250484,
                0,
                0,
                -0.9980447
              ],
              "scale": [
                2.234586,
                2.234586,
                2.234586
              ],
              "meshPath": "Assets/mizi/xzkbn/mao-Sphere006.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/Q2.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "MeshSprite3D",
            "instanceID": 96,
            "props": {
              "name": "shushu (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0.563,
                0.202,
                1.088035
              ],
              "rotation": [
                -2.185569e-8,
                0,
                0,
                -1
              ],
              "scale": [
                0.43582,
                0.43582,
                0.43582
              ],
              "meshPath": "Assets/mizi/xzkbn/shushu-Box003.lm",
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/mizi/xzkbn/Materials/未标题-7.lmat"
                }
              ]
            },
            "components": [
              {
                "type": "Animator",
                "layers": [],
                "cullingMode": 0
              }
            ],
            "child": []
          },
          {
            "type": "Sprite3D",
            "instanceID": 97,
            "props": {
              "name": "huashu (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -0.8476802,
                -1.515118,
                -3.418965
              ],
              "rotation": [
                0.1397916,
                0.3883994,
                0.1018206,
                -0.9051171
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 98,
                "props": {
                  "name": "huacong (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.919,
                    1.449,
                    1.643
                  ],
                  "rotation": [
                    -0.1298826,
                    -0.5843179,
                    -0.1738188,
                    -0.7819785
                  ],
                  "scale": [
                    0.1700001,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 99,
                "props": {
                  "name": "huacong (3)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.949,
                    1.498,
                    1.542
                  ],
                  "rotation": [
                    -0.1298826,
                    -0.5843179,
                    -0.1738188,
                    -0.7819785
                  ],
                  "scale": [
                    0.1700001,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 100,
                "props": {
                  "name": "huacong (4)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.842,
                    1.479,
                    1.555
                  ],
                  "rotation": [
                    -0.1298826,
                    -0.5843179,
                    -0.1738188,
                    -0.7819785
                  ],
                  "scale": [
                    0.1700001,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 101,
                "props": {
                  "name": "huacong (5)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.914,
                    1.546,
                    1.424
                  ],
                  "rotation": [
                    -0.1298826,
                    -0.5843179,
                    -0.1738188,
                    -0.7819785
                  ],
                  "scale": [
                    0.1700001,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 102,
                "props": {
                  "name": "huacong (6)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.829,
                    1.559,
                    1.393
                  ],
                  "rotation": [
                    -0.1596117,
                    -0.5769067,
                    -0.2136045,
                    -0.7720595
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 103,
                "props": {
                  "name": "huacong (7)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.858,
                    1.618,
                    1.298
                  ],
                  "rotation": [
                    -0.1596117,
                    -0.5769067,
                    -0.2136045,
                    -0.7720595
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 104,
                "props": {
                  "name": "huacong (9)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.786,
                    1.628,
                    1.199
                  ],
                  "rotation": [
                    -0.1596117,
                    -0.5769067,
                    -0.2136045,
                    -0.7720595
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 105,
            "props": {
              "name": "shucong",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -0.14,
                0.15,
                2.07
              ],
              "rotation": [
                -7.450581e-8,
                2.980232e-8,
                -0.04700055,
                -0.9988949
              ],
              "scale": [
                2.164401,
                2.1644,
                2.1644
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 106,
                "props": {
                  "name": "danshu (1)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    -0.08500093,
                    0.01,
                    0.0370078
                  ],
                  "rotation": [
                    5.960464e-8,
                    -2.980232e-8,
                    -7.450581e-9,
                    -1
                  ],
                  "scale": [
                    0.2880753,
                    0.2880754,
                    0.2880753
                  ],
                  "meshPath": "Assets/mizi/xzkbn/danshu-Box006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/shu2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 107,
                "props": {
                  "name": "caoduo (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    0,
                    0,
                    0
                  ],
                  "rotation": [
                    1.490116e-8,
                    0,
                    7.45058e-9,
                    -1
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 108,
            "props": {
              "name": "shucong1",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -0.848,
                0.207,
                3.172
              ],
              "rotation": [
                -7.450581e-8,
                2.980232e-8,
                -0.04700055,
                -0.9988949
              ],
              "scale": [
                2.1644,
                2.1644,
                2.1644
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 109,
                "props": {
                  "name": "danshu (1)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    -0.08500093,
                    0.01,
                    0.0370078
                  ],
                  "rotation": [
                    5.960464e-8,
                    -2.980232e-8,
                    -7.450581e-9,
                    -1
                  ],
                  "scale": [
                    0.2880753,
                    0.2880754,
                    0.2880753
                  ],
                  "meshPath": "Assets/mizi/xzkbn/danshu-Box006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/shu2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 110,
                "props": {
                  "name": "caoduo (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    0,
                    0,
                    0
                  ],
                  "rotation": [
                    1.490116e-8,
                    0,
                    7.45058e-9,
                    -1
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 111,
            "props": {
              "name": "huashu (2)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.543,
                -1.564,
                1.305
              ],
              "rotation": [
                -0.01747398,
                0.1492363,
                -0.01238335,
                -0.9885696
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 112,
                "props": {
                  "name": "huacong (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.907459,
                    1.760724,
                    1.684426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 113,
                "props": {
                  "name": "huacong (3)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.940159,
                    1.760724,
                    1.573826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 114,
                "props": {
                  "name": "huacong (4)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.833459,
                    1.760724,
                    1.591426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 115,
                "props": {
                  "name": "huacong (5)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.866159,
                    1.760724,
                    1.480826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 116,
                "props": {
                  "name": "huacong (6)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.825573,
                    1.76974,
                    1.409779
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 117,
                "props": {
                  "name": "huacong (7)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.858101,
                    1.781528,
                    1.299758
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 118,
                "props": {
                  "name": "huacong (8)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.751471,
                    1.776713,
                    1.317121
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 119,
                "props": {
                  "name": "huacong (9)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.784,
                    1.775,
                    1.206
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 120,
            "props": {
              "name": "huashu (3)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -0.937,
                -0.628,
                2.216
              ],
              "rotation": [
                0.008578816,
                0.1414307,
                0.1100871,
                -0.9837707
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 121,
                "props": {
                  "name": "huacong (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.907459,
                    1.760724,
                    1.684426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 122,
                "props": {
                  "name": "huacong (3)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.940159,
                    1.760724,
                    1.573826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 123,
                "props": {
                  "name": "huacong (4)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.833459,
                    1.760724,
                    1.591426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 124,
                "props": {
                  "name": "huacong (5)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.866159,
                    1.760724,
                    1.480826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 125,
                "props": {
                  "name": "huacong (6)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.825573,
                    1.76974,
                    1.409779
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 126,
                "props": {
                  "name": "huacong (7)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.858101,
                    1.781528,
                    1.299758
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 127,
                "props": {
                  "name": "huacong (8)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.751471,
                    1.776713,
                    1.317121
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 128,
                "props": {
                  "name": "huacong (9)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.784,
                    1.775,
                    1.206
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 129,
            "props": {
              "name": "shucong1 (1)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.11,
                0.19,
                -3.45
              ],
              "rotation": [
                -7.450581e-8,
                2.980232e-8,
                -0.04700055,
                -0.9988949
              ],
              "scale": [
                2.1644,
                2.1644,
                2.1644
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 130,
                "props": {
                  "name": "danshu (1)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    -0.08500093,
                    0.01,
                    0.0370078
                  ],
                  "rotation": [
                    5.960464e-8,
                    -2.980232e-8,
                    -7.450581e-9,
                    -1
                  ],
                  "scale": [
                    0.2880753,
                    0.2880754,
                    0.2880753
                  ],
                  "meshPath": "Assets/mizi/xzkbn/danshu-Box006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/shu2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 131,
                "props": {
                  "name": "caoduo (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    0,
                    0,
                    0
                  ],
                  "rotation": [
                    1.490116e-8,
                    0,
                    7.45058e-9,
                    -1
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 132,
            "props": {
              "name": "shucong1 (2)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -2.31,
                0.21,
                -2.67
              ],
              "rotation": [
                -7.450581e-8,
                2.980232e-8,
                -0.04700055,
                -0.9988949
              ],
              "scale": [
                2.1644,
                2.1644,
                2.1644
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 133,
                "props": {
                  "name": "danshu (1)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    -0.08500093,
                    0.01,
                    0.0370078
                  ],
                  "rotation": [
                    5.960464e-8,
                    -2.980232e-8,
                    -7.450581e-9,
                    -1
                  ],
                  "scale": [
                    0.2880753,
                    0.2880754,
                    0.2880753
                  ],
                  "meshPath": "Assets/mizi/xzkbn/danshu-Box006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/shu2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 134,
                "props": {
                  "name": "caoduo (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    0,
                    0,
                    0
                  ],
                  "rotation": [
                    1.490116e-8,
                    0,
                    7.45058e-9,
                    -1
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 135,
            "props": {
              "name": "shucong1 (3)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -3.14,
                0.24,
                -0.89
              ],
              "rotation": [
                -7.450581e-8,
                2.980232e-8,
                -0.04700055,
                -0.9988949
              ],
              "scale": [
                2.1644,
                2.1644,
                2.1644
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 136,
                "props": {
                  "name": "danshu (1)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    -0.08500093,
                    0.01,
                    0.0370078
                  ],
                  "rotation": [
                    5.960464e-8,
                    -2.980232e-8,
                    -7.450581e-9,
                    -1
                  ],
                  "scale": [
                    0.2880753,
                    0.2880754,
                    0.2880753
                  ],
                  "meshPath": "Assets/mizi/xzkbn/danshu-Box006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/shu2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 137,
                "props": {
                  "name": "caoduo (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    0,
                    0,
                    0
                  ],
                  "rotation": [
                    1.490116e-8,
                    0,
                    7.45058e-9,
                    -1
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/mizi/xzkbn/caoduo-对象001.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 138,
            "props": {
              "name": "huashu (4)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -4.035,
                -0.992,
                -5.239
              ],
              "rotation": [
                0.008578816,
                0.1414307,
                0.1100871,
                -0.9837707
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 139,
                "props": {
                  "name": "huacong (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.907459,
                    1.760724,
                    1.684426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 140,
                "props": {
                  "name": "huacong (3)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.940159,
                    1.760724,
                    1.573826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 141,
                "props": {
                  "name": "huacong (4)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.833459,
                    1.760724,
                    1.591426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 142,
                "props": {
                  "name": "huacong (5)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.866159,
                    1.760724,
                    1.480826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 143,
                "props": {
                  "name": "huacong (6)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.825573,
                    1.76974,
                    1.409779
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 144,
                "props": {
                  "name": "huacong (7)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.858101,
                    1.781528,
                    1.299758
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 145,
                "props": {
                  "name": "huacong (8)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.751471,
                    1.776713,
                    1.317121
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 146,
                "props": {
                  "name": "huacong (9)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.784,
                    1.775,
                    1.206
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 147,
            "props": {
              "name": "huashu (5)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -4.957,
                -1.732,
                -4.257
              ],
              "rotation": [
                0.02611002,
                0.1392641,
                -0.01317658,
                -0.9898233
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 148,
                "props": {
                  "name": "huacong (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.907459,
                    1.760724,
                    1.684426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 149,
                "props": {
                  "name": "huacong (3)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.940159,
                    1.760724,
                    1.573826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 150,
                "props": {
                  "name": "huacong (4)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.833459,
                    1.760724,
                    1.591426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 151,
                "props": {
                  "name": "huacong (5)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.866159,
                    1.760724,
                    1.480826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 152,
                "props": {
                  "name": "huacong (6)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.825573,
                    1.76974,
                    1.409779
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 153,
                "props": {
                  "name": "huacong (7)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.858101,
                    1.781528,
                    1.299758
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 154,
                "props": {
                  "name": "huacong (8)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.751471,
                    1.776713,
                    1.317121
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 155,
                "props": {
                  "name": "huacong (9)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.784,
                    1.775,
                    1.206
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 156,
            "props": {
              "name": "huashu (6)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -5.953,
                -0.953,
                -2.651
              ],
              "rotation": [
                0.008578816,
                0.1414307,
                0.1100871,
                -0.9837707
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 157,
                "props": {
                  "name": "huacong (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.907459,
                    1.760724,
                    1.684426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 158,
                "props": {
                  "name": "huacong (3)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.940159,
                    1.760724,
                    1.573826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 159,
                "props": {
                  "name": "huacong (4)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.833459,
                    1.760724,
                    1.591426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 160,
                "props": {
                  "name": "huacong (5)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.866159,
                    1.760724,
                    1.480826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 161,
                "props": {
                  "name": "huacong (6)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.825573,
                    1.76974,
                    1.409779
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 162,
                "props": {
                  "name": "huacong (7)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.858101,
                    1.781528,
                    1.299758
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 163,
                "props": {
                  "name": "huacong (8)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.751471,
                    1.776713,
                    1.317121
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 164,
                "props": {
                  "name": "huacong (9)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.784,
                    1.775,
                    1.206
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 165,
            "props": {
              "name": "huashu (7)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -4.009,
                -0.921,
                -9.115
              ],
              "rotation": [
                0.008578816,
                0.1414307,
                0.1100871,
                -0.9837707
              ],
              "scale": [
                1,
                1,
                1
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 166,
                "props": {
                  "name": "huacong (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.907459,
                    1.760724,
                    1.684426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 167,
                "props": {
                  "name": "huacong (3)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.940159,
                    1.760724,
                    1.573826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 168,
                "props": {
                  "name": "huacong (4)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.833459,
                    1.760724,
                    1.591426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 169,
                "props": {
                  "name": "huacong (5)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.866159,
                    1.760724,
                    1.480826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 170,
                "props": {
                  "name": "huacong (6)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.825573,
                    1.76974,
                    1.409779
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 171,
                "props": {
                  "name": "huacong (7)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.858101,
                    1.781528,
                    1.299758
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 172,
                "props": {
                  "name": "huacong (8)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.751471,
                    1.776713,
                    1.317121
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 173,
                "props": {
                  "name": "huacong (9)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.784,
                    1.775,
                    1.206
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "Sprite3D",
            "instanceID": 174,
            "props": {
              "name": "huashu (8)",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                -1.326,
                -2.727,
                -4.436
              ],
              "rotation": [
                -0.01747398,
                0.1492363,
                -0.01238335,
                -0.9885696
              ],
              "scale": [
                1.6419,
                1.6419,
                1.6419
              ]
            },
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "instanceID": 175,
                "props": {
                  "name": "huacong (2)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.907459,
                    1.760724,
                    1.684426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 176,
                "props": {
                  "name": "huacong (3)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.940159,
                    1.760724,
                    1.573826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 177,
                "props": {
                  "name": "huacong (4)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.833459,
                    1.760724,
                    1.591426
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 178,
                "props": {
                  "name": "huacong (5)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.866159,
                    1.760724,
                    1.480826
                  ],
                  "rotation": [
                    -1.750781e-8,
                    -0.5985789,
                    -1.308236e-8,
                    -0.8010638
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 179,
                "props": {
                  "name": "huacong (6)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.825573,
                    1.76974,
                    1.409779
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 180,
                "props": {
                  "name": "huacong (7)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.858101,
                    1.781528,
                    1.299758
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 181,
                "props": {
                  "name": "huacong (8)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.751471,
                    1.776713,
                    1.317121
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "instanceID": 182,
                "props": {
                  "name": "huacong (9)",
                  "active": true,
                  "isStatic": false,
                  "layer": 0,
                  "position": [
                    2.784,
                    1.775,
                    1.206
                  ],
                  "rotation": [
                    -0.03062898,
                    -0.5977948,
                    -0.04099003,
                    -0.8000144
                  ],
                  "scale": [
                    0.17,
                    0.17,
                    0.17
                  ],
                  "meshPath": "Assets/mizi/xzkbn/huacong-Plane006.lm",
                  "enableRender": true,
                  "receiveShadows": true,
                  "castShadow": true,
                  "materials": [
                    {
                      "path": "Assets/mizi/xzkbn/Materials/未标题-2.lmat"
                    }
                  ]
                },
                "components": [
                  {
                    "type": "Animator",
                    "layers": [],
                    "cullingMode": 0
                  }
                ],
                "child": []
              }
            ]
          }
        ]
      },
      {
        "type": "Sprite3D",
        "instanceID": 183,
        "props": {
          "name": "GameObject",
          "active": true,
          "isStatic": false,
          "layer": 8,
          "position": [
            -12.03562,
            -0.567804,
            4.278206
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
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 184,
        "props": {
          "name": "Cylinder",
          "active": true,
          "isStatic": false,
          "layer": 1,
          "position": [
            -0.162,
            0.45,
            1.09
          ],
          "rotation": [
            0,
            0,
            0,
            -1
          ],
          "scale": [
            0.5,
            0.055261,
            0.5
          ],
          "meshPath": "Library/unity default resources-Sphere.lm",
          "enableRender": true,
          "receiveShadows": true,
          "castShadow": true,
          "materials": [
            {
              "type": "Laya.BlinnPhongMaterial",
              "path": "Assets/mizi/xzkbn/New Material.lmat"
            }
          ]
        },
        "components": [
          {
            "type": "PhysicsCollider",
            "restitution": 0,
            "friction": 0.5,
            "rollingFriction": 0,
            "shapes": [
              {
                "type": "CapsuleColliderShape",
                "center": [
                  5.960464e-8,
                  0,
                  -8.940697e-8
                ],
                "radius": 0.5000001,
                "height": 2,
                "orientation": 1
              }
            ],
            "isTrigger": false
          }
        ],
        "child": []
      },
      {
        "type": "Sprite3D",
        "instanceID": 185,
        "props": {
          "name": "LayaMonkey",
          "active": true,
          "isStatic": false,
          "layer": 1,
          "position": [
            -0.162,
            0.45,
            1.09
          ],
          "rotation": [
            0,
            -0.769048,
            0,
            -0.639191
          ],
          "scale": [
            0.1,
            0.1,
            0.1
          ]
        },
        "components": [
          {
            "type": "Animator",
            "layers": [],
            "cullingMode": 0
          }
        ],
        "child": [
          {
            "type": "Sprite3D",
            "instanceID": 186,
            "props": {
              "name": "Bip001",
              "active": true,
              "isStatic": false,
              "layer": 1,
              "position": [
                0.04679767,
                0.574905,
                -0.2284267
              ],
              "rotation": [
                0.4948293,
                0.4948286,
                0.5051178,
                -0.5051185
              ],
              "scale": [
                0.9999999,
                0.9999999,
                1
              ]
            },
            "components": [],
            "child": [
              {
                "type": "Sprite3D",
                "instanceID": 187,
                "props": {
                  "name": "Bip001 Footsteps",
                  "active": true,
                  "isStatic": false,
                  "layer": 1,
                  "position": [
                    0.01304968,
                    0,
                    -0.634042
                  ],
                  "rotation": [
                    0.007275574,
                    0.007275586,
                    -0.7070689,
                    -0.7070698
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "Sprite3D",
                "instanceID": 188,
                "props": {
                  "name": "Bip001 Pelvis",
                  "active": true,
                  "isStatic": false,
                  "layer": 1,
                  "position": [
                    0,
                    0,
                    0
                  ],
                  "rotation": [
                    0.480195,
                    0.5190499,
                    0.4801943,
                    -0.5190505
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ]
                },
                "components": [],
                "child": [
                  {
                    "type": "Sprite3D",
                    "instanceID": 189,
                    "props": {
                      "name": "Bip001 Spine",
                      "active": true,
                      "isStatic": false,
                      "layer": 1,
                      "position": [
                        0.2355541,
                        -0.0005083084,
                        0.00006329536
                      ],
                      "rotation": [
                        0.06738502,
                        -0.002220058,
                        -0.06986419,
                        -0.9952756
                      ],
                      "scale": [
                        1,
                        0.9999999,
                        0.9999999
                      ]
                    },
                    "components": [],
                    "child": [
                      {
                        "type": "Sprite3D",
                        "instanceID": 190,
                        "props": {
                          "name": "Bip001 L Thigh",
                          "active": true,
                          "isStatic": false,
                          "layer": 1,
                          "position": [
                            -0.2413928,
                            -0.04609043,
                            0.5893101
                          ],
                          "rotation": [
                            0.2479054,
                            0.9611696,
                            0.03344211,
                            0.1165228
                          ],
                          "scale": [
                            1,
                            1,
                            1
                          ]
                        },
                        "components": [],
                        "child": [
                          {
                            "type": "Sprite3D",
                            "instanceID": 191,
                            "props": {
                              "name": "Bip001 L Calf",
                              "active": true,
                              "isStatic": false,
                              "layer": 1,
                              "position": [
                                0.2540975,
                                -1.907349e-8,
                                0
                              ],
                              "rotation": [
                                1.42529e-9,
                                -1.659892e-8,
                                0.3690543,
                                -0.9294078
                              ],
                              "scale": [
                                1,
                                1,
                                1
                              ]
                            },
                            "components": [],
                            "child": [
                              {
                                "type": "Sprite3D",
                                "instanceID": 192,
                                "props": {
                                  "name": "Bip001 L Foot",
                                  "active": true,
                                  "isStatic": false,
                                  "layer": 1,
                                  "position": [
                                    0.302004,
                                    3.814697e-8,
                                    0
                                  ],
                                  "rotation": [
                                    0.03174375,
                                    -0.1180525,
                                    -0.196251,
                                    -0.9729037
                                  ],
                                  "scale": [
                                    1,
                                    0.9999999,
                                    1
                                  ]
                                },
                                "components": [],
                                "child": [
                                  {
                                    "type": "Sprite3D",
                                    "instanceID": 193,
                                    "props": {
                                      "name": "Bip001 L Toe0",
                                      "active": true,
                                      "isStatic": false,
                                      "layer": 1,
                                      "position": [
                                        0.1310806,
                                        0.168695,
                                        0
                                      ],
                                      "rotation": [
                                        2.197287e-8,
                                        2.210665e-8,
                                        -0.7071068,
                                        -0.7071068
                                      ],
                                      "scale": [
                                        1,
                                        1,
                                        1
                                      ]
                                    },
                                    "components": [],
                                    "child": [
                                      {
                                        "type": "Sprite3D",
                                        "instanceID": 194,
                                        "props": {
                                          "name": "Bip001 L Toe0Nub",
                                          "active": true,
                                          "isStatic": false,
                                          "layer": 1,
                                          "position": [
                                            0.01709746,
                                            0,
                                            0
                                          ],
                                          "rotation": [
                                            -3.846923e-14,
                                            3.582726e-23,
                                            1,
                                            9.313227e-10
                                          ],
                                          "scale": [
                                            -1,
                                            -1,
                                            -1
                                          ]
                                        },
                                        "components": [],
                                        "child": []
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "Sprite3D",
                        "instanceID": 195,
                        "props": {
                          "name": "Bip001 R Thigh",
                          "active": true,
                          "isStatic": false,
                          "layer": 1,
                          "position": [
                            -0.2249689,
                            0.112762,
                            -0.586945
                          ],
                          "rotation": [
                            0.2842283,
                            0.9553826,
                            0.01455259,
                            -0.0790357
                          ],
                          "scale": [
                            1,
                            1,
                            1
                          ]
                        },
                        "components": [],
                        "child": [
                          {
                            "type": "Sprite3D",
                            "instanceID": 196,
                            "props": {
                              "name": "Bip001 R Calf",
                              "active": true,
                              "isStatic": false,
                              "layer": 1,
                              "position": [
                                0.2540974,
                                -9.536743e-9,
                                0
                              ],
                              "rotation": [
                                3.042986e-9,
                                6.800838e-9,
                                0.4084226,
                                -0.912793
                              ],
                              "scale": [
                                1,
                                0.9999999,
                                1
                              ]
                            },
                            "components": [],
                            "child": [
                              {
                                "type": "Sprite3D",
                                "instanceID": 197,
                                "props": {
                                  "name": "Bip001 R Foot",
                                  "active": true,
                                  "isStatic": false,
                                  "layer": 1,
                                  "position": [
                                    0.3020039,
                                    1.907349e-8,
                                    0
                                  ],
                                  "rotation": [
                                    -0.01241881,
                                    0.07245327,
                                    -0.1975793,
                                    -0.9775268
                                  ],
                                  "scale": [
                                    0.9999999,
                                    0.9999999,
                                    0.9999999
                                  ]
                                },
                                "components": [],
                                "child": [
                                  {
                                    "type": "Sprite3D",
                                    "instanceID": 198,
                                    "props": {
                                      "name": "Bip001 R Toe0",
                                      "active": true,
                                      "isStatic": false,
                                      "layer": 1,
                                      "position": [
                                        0.1310806,
                                        0.168695,
                                        3.814697e-8
                                      ],
                                      "rotation": [
                                        -1.187348e-8,
                                        -1.179115e-8,
                                        -0.7071068,
                                        -0.7071068
                                      ],
                                      "scale": [
                                        1,
                                        1,
                                        1
                                      ]
                                    },
                                    "components": [],
                                    "child": [
                                      {
                                        "type": "Sprite3D",
                                        "instanceID": 199,
                                        "props": {
                                          "name": "Bip001 R Toe0Nub",
                                          "active": true,
                                          "isStatic": false,
                                          "layer": 1,
                                          "position": [
                                            0.01709746,
                                            0,
                                            -3.814697e-8
                                          ],
                                          "rotation": [
                                            -1.776357e-15,
                                            -1.554312e-15,
                                            9.313226e-10,
                                            -1
                                          ],
                                          "scale": [
                                            1,
                                            1,
                                            1
                                          ]
                                        },
                                        "components": [],
                                        "child": []
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "Sprite3D",
                        "instanceID": 200,
                        "props": {
                          "name": "Bip001 Spine1",
                          "active": true,
                          "isStatic": false,
                          "layer": 1,
                          "position": [
                            0.5115815,
                            -0.0005630875,
                            -0.000006546974
                          ],
                          "rotation": [
                            -0.005887284,
                            0.01275356,
                            -0.005980901,
                            -0.9998835
                          ],
                          "scale": [
                            1,
                            1,
                            1
                          ]
                        },
                        "components": [],
                        "child": [
                          {
                            "type": "Sprite3D",
                            "instanceID": 201,
                            "props": {
                              "name": "Bip001 Neck",
                              "active": true,
                              "isStatic": false,
                              "layer": 1,
                              "position": [
                                0.7247889,
                                -0.009294013,
                                -1.192093e-8
                              ],
                              "rotation": [
                                5.364079e-8,
                                6.890805e-7,
                                -0.1822808,
                                -0.9832465
                              ],
                              "scale": [
                                0.9999999,
                                1,
                                1
                              ]
                            },
                            "components": [],
                            "child": [
                              {
                                "type": "Sprite3D",
                                "instanceID": 202,
                                "props": {
                                  "name": "Bip001 Head",
                                  "active": true,
                                  "isStatic": false,
                                  "layer": 1,
                                  "position": [
                                    0.2215482,
                                    0.0367466,
                                    -2.098083e-7
                                  ],
                                  "rotation": [
                                    -0.0247296,
                                    -0.005243696,
                                    0.1283307,
                                    -0.9914092
                                  ],
                                  "scale": [
                                    1,
                                    1,
                                    1
                                  ]
                                },
                                "components": [],
                                "child": [
                                  {
                                    "type": "Sprite3D",
                                    "instanceID": 203,
                                    "props": {
                                      "name": "Bip001 HeadNub",
                                      "active": true,
                                      "isStatic": false,
                                      "layer": 1,
                                      "position": [
                                        1.022001,
                                        0,
                                        0
                                      ],
                                      "rotation": [
                                        1.136868e-13,
                                        5.684342e-14,
                                        -1.490116e-8,
                                        -1
                                      ],
                                      "scale": [
                                        1,
                                        1,
                                        1
                                      ]
                                    },
                                    "components": [],
                                    "child": []
                                  }
                                ]
                              },
                              {
                                "type": "Sprite3D",
                                "instanceID": 204,
                                "props": {
                                  "name": "Bip001 L Clavicle",
                                  "active": true,
                                  "isStatic": false,
                                  "layer": 1,
                                  "position": [
                                    -0.1939534,
                                    0.08459198,
                                    0.4362656
                                  ],
                                  "rotation": [
                                    0.6073817,
                                    -0.05489684,
                                    0.770003,
                                    0.187535
                                  ],
                                  "scale": [
                                    1,
                                    1,
                                    1
                                  ]
                                },
                                "components": [],
                                "child": [
                                  {
                                    "type": "Sprite3D",
                                    "instanceID": 205,
                                    "props": {
                                      "name": "Bip001 L UpperArm",
                                      "active": true,
                                      "isStatic": false,
                                      "layer": 1,
                                      "position": [
                                        0.4320352,
                                        0,
                                        1.525879e-7
                                      ],
                                      "rotation": [
                                        0.07348462,
                                        -0.3933914,
                                        -0.1818617,
                                        -0.8982035
                                      ],
                                      "scale": [
                                        1,
                                        0.9999999,
                                        1
                                      ]
                                    },
                                    "components": [],
                                    "child": [
                                      {
                                        "type": "Sprite3D",
                                        "instanceID": 206,
                                        "props": {
                                          "name": "Bip001 L Forearm",
                                          "active": true,
                                          "isStatic": false,
                                          "layer": 1,
                                          "position": [
                                            0.9235265,
                                            0,
                                            -1.525879e-7
                                          ],
                                          "rotation": [
                                            -3.913084e-8,
                                            -8.175836e-8,
                                            0.5741315,
                                            -0.8187631
                                          ],
                                          "scale": [
                                            1,
                                            1,
                                            0.9999999
                                          ]
                                        },
                                        "components": [],
                                        "child": [
                                          {
                                            "type": "Sprite3D",
                                            "instanceID": 207,
                                            "props": {
                                              "name": "Bip001 L Hand",
                                              "active": true,
                                              "isStatic": false,
                                              "layer": 1,
                                              "position": [
                                                0.682883,
                                                3.814697e-8,
                                                1.525879e-7
                                              ],
                                              "rotation": [
                                                0.7068252,
                                                -2.108181e-8,
                                                -2.106503e-8,
                                                -0.7073883
                                              ],
                                              "scale": [
                                                1,
                                                0.9999999,
                                                1
                                              ]
                                            },
                                            "components": [],
                                            "child": []
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "type": "Sprite3D",
                                "instanceID": 208,
                                "props": {
                                  "name": "Bip001 R Clavicle",
                                  "active": true,
                                  "isStatic": false,
                                  "layer": 1,
                                  "position": [
                                    -0.1939539,
                                    0.0845945,
                                    -0.4362651
                                  ],
                                  "rotation": [
                                    -0.5768871,
                                    0.2037001,
                                    0.7877061,
                                    0.07229573
                                  ],
                                  "scale": [
                                    1,
                                    1,
                                    1
                                  ]
                                },
                                "components": [],
                                "child": [
                                  {
                                    "type": "Sprite3D",
                                    "instanceID": 209,
                                    "props": {
                                      "name": "Bip001 R UpperArm",
                                      "active": true,
                                      "isStatic": false,
                                      "layer": 1,
                                      "position": [
                                        0.4320352,
                                        -1.907349e-8,
                                        1.525879e-7
                                      ],
                                      "rotation": [
                                        0.1990413,
                                        0.4606956,
                                        -0.1252301,
                                        -0.8558385
                                      ],
                                      "scale": [
                                        1,
                                        1,
                                        1
                                      ]
                                    },
                                    "components": [],
                                    "child": [
                                      {
                                        "type": "Sprite3D",
                                        "instanceID": 210,
                                        "props": {
                                          "name": "Bip001 R Forearm",
                                          "active": true,
                                          "isStatic": false,
                                          "layer": 1,
                                          "position": [
                                            0.9235265,
                                            0,
                                            0
                                          ],
                                          "rotation": [
                                            -2.088098e-8,
                                            -8.1887e-9,
                                            0.3456319,
                                            -0.9383702
                                          ],
                                          "scale": [
                                            0.9999998,
                                            1,
                                            1
                                          ]
                                        },
                                        "components": [],
                                        "child": [
                                          {
                                            "type": "Sprite3D",
                                            "instanceID": 211,
                                            "props": {
                                              "name": "Bip001 R Hand",
                                              "active": true,
                                              "isStatic": false,
                                              "layer": 1,
                                              "position": [
                                                0.6828828,
                                                0,
                                                0
                                              ],
                                              "rotation": [
                                                -0.7041477,
                                                0.0614646,
                                                0.06151356,
                                                -0.7047086
                                              ],
                                              "scale": [
                                                0.9999999,
                                                0.9999999,
                                                1
                                              ]
                                            },
                                            "components": [],
                                            "child": []
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "SkinnedMeshSprite3D",
            "instanceID": 212,
            "props": {
              "name": "LayaMonkey",
              "active": true,
              "isStatic": false,
              "layer": 1,
              "position": [
                0,
                0,
                -0.1750933
              ],
              "rotation": [
                0.7071068,
                0,
                0,
                -0.7071068
              ],
              "scale": [
                1,
                1,
                1
              ],
              "rootBone": 186,
              "boundBox": {
                "min": [
                  -1.353806,
                  -1.779651,
                  -0.8496842
                ],
                "max": [
                  1.797849,
                  2.123889,
                  3.207856
                ]
              },
              "boundSphere": {
                "center": [
                  0.2220216,
                  0.1721191,
                  1.179086
                ],
                "radius": 3.226228
              },
              "bones": [
                186,
                189,
                200,
                188,
                205,
                206,
                190,
                191,
                192,
                202,
                204,
                207,
                195,
                196,
                197,
                209,
                208,
                210,
                211
              ],
              "enableRender": true,
              "receiveShadows": true,
              "castShadow": true,
              "materials": [
                {
                  "path": "Assets/LayaMonkey/Materials/T_Diffuse 1.lmat"
                }
              ],
              "meshPath": "Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm"
            },
            "components": [],
            "child": []
          }
        ]
      }
    ]
  }
}