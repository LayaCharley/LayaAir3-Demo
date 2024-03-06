{
  "version": "LAYASCENE3D:01",
  "data": {
    "type": "Scene3D",
    "props": {
      "name": "XunLongShi",
      "skyboxMaterial": {
        "type": "Laya.SkyBoxMaterial",
        "path": "Assets/Realistic Terrain Collection/Other/Skybox_Textures/DawnDusk/Skybox.lmat"
      },
      "ambientColor": [
        0.1,
        0.1,
        0.1
      ],
      "lightmaps": [
        {
          "constructParams": [
            2048,
            2048,
            1,
            false
          ],
          "propertyParams": {
            "filterMode": 1,
            "wrapModeU": 1,
            "wrapModeV": 1,
            "anisoLevel": 3
          },
          "path": "Assets/Scenes/Level/XunLongShi/Lightmap-0_comp_light.png"
        }
      ],
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
        "type": "Sprite3D",
        "props": {
          "isStatic": false,
          "name": "Scenes",
          "layer": 0,
          "position": [
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
        "components": [],
        "child": [
          {
            "type": "Sprite3D",
            "props": {
              "isStatic": false,
              "name": "Light",
              "layer": 0,
              "position": [
                0,
                1.4,
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
            "components": [],
            "child": [
              {
                "type": "DirectionLight",
                "props": {
                  "isStatic": false,
                  "name": "Directional light",
                  "layer": 0,
                  "position": [
                    1.57,
                    9.87,
                    -0.8
                  ],
                  "rotation": [
                    -0.3014401,
                    0.684218,
                    0.6578541,
                    -0.09059557
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "intensity": 0.6,
                  "lightmapBakedType": 2,
                  "color": [
                    0.1757137,
                    0.734664,
                    0.9191176
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "PointLight",
                "props": {
                  "isStatic": false,
                  "name": "Point light",
                  "layer": 0,
                  "position": [
                    16.2,
                    6.4,
                    -15.22
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
                  ],
                  "intensity": 2,
                  "lightmapBakedType": 2,
                  "range": 5.996433,
                  "color": [
                    0.9338235,
                    0.869422,
                    0
                  ]
                },
                "components": [],
                "child": []
              }
            ]
          },
          {
            "type": "MeshSprite3D",
            "props": {
              "isStatic": false,
              "name": "HeightMap",
              "layer": 0,
              "position": [
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
              ],
              "meshPath": "Assets/Model/Scenes/New-Part-Test-HeightMap-default.lm",
              "materials": [
                {
                  "type": "Laya.BlinnPhongMaterial",
                  "path": "Assets/Model/Scenes/Materials/21 - Default.lmat"
                }
              ]
            },
            "components": [],
            "child": []
          },
          {
            "type": "Sprite3D",
            "props": {
              "isStatic": false,
              "name": "Area",
              "layer": 0,
              "position": [
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
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": false,
                  "name": "path0",
                  "layer": 0,
                  "position": [
                    12.2,
                    10.379,
                    9.710001
                  ],
                  "rotation": [
                    0.7071068,
                    6.181725e-8,
                    -6.181723e-8,
                    -0.7071067
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/Model/Scenes/shuaguai-Box004.lm",
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/21 - Default.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": false,
                  "name": "path1",
                  "layer": 0,
                  "position": [
                    4.34,
                    10.379,
                    13.68
                  ],
                  "rotation": [
                    0.7071068,
                    6.181725e-8,
                    -6.181723e-8,
                    -0.7071067
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/Model/Scenes/shuaguai-Box004.lm",
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/21 - Default.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": false,
                  "name": "path2",
                  "layer": 0,
                  "position": [
                    2.92,
                    10.379,
                    6.719999
                  ],
                  "rotation": [
                    0.7071068,
                    6.181725e-8,
                    -6.181723e-8,
                    -0.7071067
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/Model/Scenes/shuaguai-Box004.lm",
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/21 - Default.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": false,
                  "name": "path3",
                  "layer": 0,
                  "position": [
                    -6.320001,
                    8.674,
                    8.620001
                  ],
                  "rotation": [
                    0.7071068,
                    6.181725e-8,
                    -6.181723e-8,
                    -0.7071067
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/Model/Scenes/shuaguai-Box004.lm",
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/21 - Default.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": false,
                  "name": "path4",
                  "layer": 0,
                  "position": [
                    -12.54,
                    8.674,
                    7.879999
                  ],
                  "rotation": [
                    0.7071068,
                    6.181725e-8,
                    -6.181723e-8,
                    -0.7071067
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/Model/Scenes/shuaguai-Box004.lm",
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/21 - Default.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": false,
                  "name": "path5",
                  "layer": 0,
                  "position": [
                    -13.5,
                    6.934,
                    -12.19
                  ],
                  "rotation": [
                    0.7071068,
                    6.181725e-8,
                    -6.181723e-8,
                    -0.7071067
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/Model/Scenes/shuaguai-Box004.lm",
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/21 - Default.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": false,
                  "name": "path6",
                  "layer": 0,
                  "position": [
                    -21.44,
                    6.934,
                    -19.26
                  ],
                  "rotation": [
                    0.7071068,
                    6.181725e-8,
                    -6.181723e-8,
                    -0.7071067
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/Model/Scenes/shuaguai-Box004.lm",
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/21 - Default.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": false,
                  "name": "path7",
                  "layer": 0,
                  "position": [
                    -11.99,
                    6.934,
                    -20.96
                  ],
                  "rotation": [
                    0.7071068,
                    6.181725e-8,
                    -6.181723e-8,
                    -0.7071067
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/Model/Scenes/shuaguai-Box004.lm",
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/21 - Default.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": false,
                  "name": "path8",
                  "layer": 0,
                  "position": [
                    15.03,
                    6.939,
                    -13.82
                  ],
                  "rotation": [
                    0.7071068,
                    6.181725e-8,
                    -6.181723e-8,
                    -0.7071067
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/Model/Scenes/shuaguai-Box004.lm",
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/21 - Default.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": false,
                  "name": "path9",
                  "layer": 0,
                  "position": [
                    5.82,
                    6.939,
                    -21.09
                  ],
                  "rotation": [
                    0.7071068,
                    6.181725e-8,
                    -6.181723e-8,
                    -0.7071067
                  ],
                  "scale": [
                    1,
                    1,
                    1
                  ],
                  "meshPath": "Assets/Model/Scenes/shuaguai-Box004.lm",
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/21 - Default.lmat"
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
            "props": {
              "isStatic": true,
              "name": "New-Part-01",
              "layer": 0,
              "position": [
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
            "components": [],
            "child": [
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "1111",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01- .lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.09431724,
                    0.09431724,
                    0.5402582,
                    0.2837384
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Plants1.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": " 003",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01- 003.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.09136958,
                    0.09136958,
                    0.1494925,
                    0.8515109
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Plants1.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Bridge_01",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Bridge_01.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.08938755,
                    0.08938755,
                    0.3684025,
                    0.7324877
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Bridge2.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Bridge_02",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Bridge_02.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1095294,
                    0.1095294,
                    0.7250831,
                    0.2836789
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Bridge2.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Bridge_04",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Bridge_04.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.09827082,
                    0.09827082,
                    0.1494655,
                    0.4538298
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Bridge2.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Door_01",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Door_01.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.07810798,
                    0.07810798,
                    0.3482673,
                    0.1142422
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/props.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Door_02",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Door_02.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.078334,
                    0.078334,
                    0.36927,
                    0.1984245
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/props.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Door_03",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Door_03.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.08695064,
                    0.08695064,
                    0.1495098,
                    0.5524201
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/props.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Godbox_01",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Godbox_01.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1164132,
                    0.1164132,
                    0.3682969,
                    0.615689
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/chests.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Godbox_02",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Godbox_02.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.01978666,
                    0.01978666,
                    0.09890671,
                    0.3641678
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/chests.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Godbox_03",
                  "layer": 0,
                  "position": [
                    0.18,
                    1.47,
                    -0.18
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Godbox_03.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1159024,
                    0.1159024,
                    -0.0004527437,
                    0.6681489
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/chests.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Godbox_04",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Godbox_04.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.08054454,
                    0.08054454,
                    0.1495348,
                    0.6398475
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/chests.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Godbox_005",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Godbox_005.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1163941,
                    0.1163941,
                    -0.0004546645,
                    0.8734092
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/chests.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Mushrooms_01",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Mushrooms_01.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.07861106,
                    0.07861106,
                    -0.0003070745,
                    0.3854351
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/mushrooms.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Mushrooms_02",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Mushrooms_02.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.09037051,
                    0.09037051,
                    0.5738053,
                    0.1043855
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/mushrooms.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Mushrooms_03",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Mushrooms_03.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.05799334,
                    0.05799334,
                    0.7370177,
                    0.140161
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/mushrooms.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Mushrooms_04",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Mushrooms_04.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.06384482,
                    0.06384482,
                    0.5914941,
                    0.1984811
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/mushrooms.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object001",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object001.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1105162,
                    0.1105162,
                    0.4628868,
                    -0.000431704
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/trees_03_autumn.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object002",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object002.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1090539,
                    0.1090539,
                    0.8349482,
                    0.2836808
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Plants1.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object007",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object007.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.04425928,
                    0.04425928,
                    0.09881111,
                    0.3279521
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/trees_03.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object008",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object008.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.03083229,
                    0.03083229,
                    0.1160905,
                    0.6684812
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/trees_03_autumn.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object009",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object009.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.03459896,
                    0.03459896,
                    0.4270505,
                    0.1144122
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/trees_03_autumn.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object012",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
                    -0.12
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object012.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1989037,
                    0.1989037,
                    0.1490725,
                    -0.0007769677
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Trees_01.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object020",
                  "layer": 0,
                  "position": [
                    0,
                    1.411,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object020.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1144451,
                    0.1144451,
                    0.3481253,
                    -0.0004470513
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Trees_01b.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object021",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object021.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1046104,
                    0.1046104,
                    0.5737497,
                    -0.0004086343
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Trees_01.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object027",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object027.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1341873,
                    0.1341873,
                    0.1493253,
                    0.1982063
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Trees_01b.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object030",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object030.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1370337,
                    0.1370337,
                    0.8192285,
                    -0.000535288
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Trees_01.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object032",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
                    -0.12
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object032.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1719111,
                    0.1719111,
                    0.3680801,
                    0.2834353
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Trees_01b.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object033",
                  "layer": 0,
                  "position": [
                    0.35,
                    1.39,
                    -0.49
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object033.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.08987717,
                    0.08987717,
                    0.6348278,
                    0.2837557
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Bridge2.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object034",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object034.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1307306,
                    0.1307306,
                    0.1493388,
                    0.7207053
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Bridge2.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object035",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object035.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1404613,
                    0.1404613,
                    0.6785901,
                    -0.0005486768
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Bridge2.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object037",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object037.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.05718806,
                    0.05718806,
                    0.08913208,
                    0.7845535
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Stones_01.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object038",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object038.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.08889535,
                    0.08889535,
                    -0.0003472475,
                    0.7844297
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Magic_Pillars.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object039",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object039.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1216142,
                    0.1216142,
                    0.1493744,
                    0.3321566
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/trees_03_autumn.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Object040",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Object040.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1286723,
                    0.1286723,
                    -0.000502626,
                    0.539245
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Bridge2.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "polySurface2878",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-polySurface2878.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.08512652,
                    0.08512652,
                    0.8623881,
                    0.1983979
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/trees_03.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "polySurface2886",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-polySurface2886.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.09875556,
                    0.09875556,
                    -0.0003857639,
                    0.2862353
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Plants1.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "polySurface2890",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-polySurface2890.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1365365,
                    0.1365365,
                    -0.0005333457,
                    0.149369
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Trees_01b.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "polySurface2902",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-polySurface2902.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1497987,
                    0.1497987,
                    -0.0005851512,
                    -0.0005851512
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Trees_01.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "polySurface2903",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-polySurface2903.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.1606316,
                    0.1606316,
                    0.3681242,
                    0.4550201
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/trees_03_autumn.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "polySurface2904",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-polySurface2904.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.08597806,
                    0.08597806,
                    0.2837909,
                    0.2837709
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/trees_03.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Props_01",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Props_01.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.06679523,
                    0.06679523,
                    0.7950959,
                    0.1984695
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Fence_01.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Props_03",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Props_03.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.06089806,
                    0.06089806,
                    0.07886368,
                    0.3855043
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Fence_01.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Props_04",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Props_04.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.07612256,
                    0.07612256,
                    0.4478919,
                    0.1984331
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Fence_01.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Stone_01_02",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Stone_01_02.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.06259023,
                    0.06259023,
                    0.8195193,
                    0.1365844
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Bridge1.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Stone_01_04",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Stone_01_04.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.0669253,
                    0.0669253,
                    0.524588,
                    0.198469
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Bridge1.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Stone_02_01",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Stone_02_01.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.07466238,
                    0.07466238,
                    -0.0002916499,
                    0.4644954
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Stairs.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Stone_02_02",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Stone_02_02.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.06974173,
                    0.06974173,
                    0.7247719,
                    0.198458
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Stairs.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Stone_02_03",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Stone_02_03.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.06834363,
                    0.06834363,
                    0.6559297,
                    0.1984635
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Stairs.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Stone_02_04",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Stone_02_04.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.08500285,
                    0.08500285,
                    0.2837947,
                    0.1983984
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Stairs.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Stone_03_01",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Stone_03_01.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.07048783,
                    0.07048783,
                    0.2838514,
                    0.3697689
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Stones_01.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Stone_03_02",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Stone_03_02.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.06494367,
                    0.06494367,
                    0.4630648,
                    0.1102295
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Stones_01.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Stone_04_01",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Stone_04_01.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.04141212,
                    0.04141212,
                    0.09882224,
                    0.2864593
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Magic_Pillars.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Stone_04_02",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Stone_04_02.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.05609582,
                    0.05609582,
                    0.882533,
                    0.1366098
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Magic_Pillars.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Stone_04_04",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Stone_04_04.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.05746675,
                    0.05746675,
                    0.6789143,
                    0.140163
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/Magic_Pillars.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Trees-01",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Trees-01.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.06973977,
                    0.06973977,
                    0.2838543,
                    0.4404751
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/trees_04.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              },
              {
                "type": "MeshSprite3D",
                "props": {
                  "isStatic": true,
                  "name": "Trees_02",
                  "layer": 0,
                  "position": [
                    0,
                    1.47,
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
                  ],
                  "meshPath": "Assets/Model/Scenes/New-Part-01-Trees_02.lm",
                  "lightmapIndex": 0,
                  "lightmapScaleOffset": [
                    0.07170251,
                    0.07170251,
                    0.07491522,
                    0.464507
                  ],
                  "materials": [
                    {
                      "type": "Laya.BlinnPhongMaterial",
                      "path": "Assets/Model/Scenes/Materials/trees_04.lmat"
                    }
                  ]
                },
                "components": [],
                "child": []
              }
            ]
          }
        ]
      },
      {
        "type": "MeshSprite3D",
        "props": {
          "isStatic": true,
          "name": "New-Part-01",
          "layer": 0,
          "position": [
            27.42,
            0,
            -27.42
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
          ],
          "meshPath": "terrain/terrain_New-Part-01.lm",
          "materials": [
            {
              "type": "Laya.ExtendTerrainMaterial",
              "path": "terrain/terrain_New-Part-01.lmat"
            }
          ],
          "lightmapIndex": 0,
          "lightmapScaleOffset": [
            0.418457,
            0.418457,
            0.5293962,
            0.4556476
          ]
        },
        "components": [],
        "child": []
      }
    ]
  }
}